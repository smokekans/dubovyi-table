import * as React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ProductSchema } from "../ProductSchema";
import { fields } from "utils/fields";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getEnums } from "redux/enums/enumsSelectors";
import { useDispatch } from "react-redux";
import { createProduct } from "redux/products/productsOperations";
import { Link, useNavigate } from "react-router-dom";
import UniversalSelectAddProduct from "components/СreateProduct/Autocompete/UniversalSelectAddProduct";
import UniversalInputAddProduct from "components/СreateProduct/Input/UniversalIntupAddProduct";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function FormCreateProduct() {
  const [images, setImages] = React.useState([
    "https://content.rozetka.com.ua/goods/images/big/247962715.jpg",
    "https://content2.rozetka.com.ua/goods/images/big/247962723.jpg",
    "https://content.rozetka.com.ua/goods/images/big/247962730.jpg",
  ]);
  const [activeImage, setActiveImage] = React.useState(images[0]);
  const enums = useSelector(getEnums);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      categoryId: null,
      colorId: null,
      materialId: null,
      deleted: false,
      name: "",
      description: "",
      photos: images,
      height: null,
      length: null,
      price: null,
      quantity: null,
      weight: null,
      width: null,
      warranty: null,
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(createProduct(values));
      resetForm();
      navigate("/admin/products");
    },
  });

  const handleFileChange = (index) => (event) => {
    if (!event.target.files[0]) return;

    let reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = reader.result;
      setImages(updatedImages);

      if (index === 0) {
        setActiveImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
    setActiveImage(updatedImages[0]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = reorder(
      images,
      result.source.index,
      result.destination.index
    );
    setImages(reorderedImages);

    if (result.destination.index === 0) {
      setActiveImage(reorderedImages[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 3)
      .map((file) => URL.createObjectURL(file));
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      let newImageIndex = 0;
      for (let i = 0; i < updatedImages.length; i++) {
        if (updatedImages[i] === null && newImageIndex < newImages.length) {
          updatedImages[i] = newImages[newImageIndex++];
        }
      }
      return updatedImages;
    });
  };

  const handleCardDrop = (index) => (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = reader.result;
      setImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const renderImagePreview = (image, index) => (
    <Draggable key={index} draggableId={`image-${index}`} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleCardDrop(index)}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "150px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              borderRadius: 5,
            },
          }}
        >
          {image ? (
            <Box sx={{ display: "flex", cursor: "pointer" }}>
              <Box
                component="img"
                src={image}
                alt={`preview-${index}`}
                height={100}
                width={150}
                sx={{
                  marginRight: 2,
                  objectFit: "cover",
                  borderRadius: 5,
                  boxShadow: 3,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={() => handleFileChange(index)}>
                  <CachedOutlinedIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: (theme) => theme.palette.common.black,
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => removeImage(index)}>
                  <DeleteOutlinedIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: (theme) => theme.palette.common.black,
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <InputLabel
              htmlFor={`file-input-${index}`}
              sx={{
                width: "150px",
                height: "100px",
                bgcolor: (theme) => theme.palette.info.main,
                borderRadius: 5,
                cursor: "pointer",
                boxShadow: 3,
              }}
            >
              <IconButton
                component="span"
                sx={{
                  width: "150px",
                  height: "100px",
                  borderRadius: 5,
                  color: (theme) => theme.palette.common.black,
                }}
              >
                <AddOutlinedIcon />
              </IconButton>
            </InputLabel>
          )}
          <TextField
            id={`file-input-${index}`}
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange(index)}
          />
        </Box>
      )}
    </Draggable>
  );

  const DropZone = () => {
    return (
      <Box
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        sx={{
          width: "572px",
          height: "348px",
          bgcolor: (theme) => theme.palette.info.main,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
        }}
      >
        <AttachFileIcon />
        <Typography variant="h4">Завантажте фото</Typography>
        <Typography variant="h4">або</Typography>
        <Typography variant="h4">перетягніть з робочого стола</Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h3">Новий товар</Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "55px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    cursor: "pointer",
                  }}
                >
                  {images.map((image, index) =>
                    renderImagePreview(image, index)
                  )}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Box>
            {activeImage ? (
              <Box
                component="img"
                src={activeImage}
                alt="active img"
                sx={{
                  width: "572px",
                  height: "348px",
                  objectFit: "cover",
                  borderRadius: 5,
                  boxShadow: 3,
                }}
              />
            ) : (
              <DropZone />
            )}
            <Typography variant="body1" sx={{ width: "460px", mt: 3 }}>
              Перше фото це обкладинка для товару. Щоб змінити порядок -
              поретягніть зображення.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4, gap: 3, display: "flex", flexDirection: "column" }}>
          <UniversalInputAddProduct fields={fields.name} formik={formik} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: "100px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
                gap: 3,
              }}
            >
              <UniversalInputAddProduct fields={fields.price} formik={formik} />
              <UniversalInputAddProduct
                fields={fields.quantity}
                formik={formik}
              />
              <UniversalSelectAddProduct
                fields={fields.category}
                options={enums.ECategories}
                formik={formik}
              />
              <UniversalSelectAddProduct
                fields={fields.material}
                options={enums.EMaterials}
                formik={formik}
              />
              <UniversalSelectAddProduct
                fields={fields.color}
                options={enums.EColors}
                formik={formik}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
                gap: 3,
              }}
            >
              <UniversalInputAddProduct
                fields={fields.weight}
                formik={formik}
              />
              <UniversalInputAddProduct
                fields={fields.height}
                formik={formik}
              />
              <UniversalInputAddProduct
                fields={fields.length}
                formik={formik}
              />
              <UniversalInputAddProduct fields={fields.width} formik={formik} />
              <UniversalSelectAddProduct
                fields={fields.warranty}
                options={enums.EWarranties}
                formik={formik}
              />
            </Box>
          </Box>
          <UniversalInputAddProduct
            fields={fields.description}
            formik={formik}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3, mt: 5 }}>
          <Button
            component={Link}
            variant="outlined"
            to="/admin/products"
            sx={{
              p: "18px 40px",
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Скасувати
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              p: "18px 40px",
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Створити
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
