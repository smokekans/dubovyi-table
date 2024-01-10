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
import { ProductSchema } from "./ProductSchema";
import { fields } from "./UniversalIntup";
import UniversalInput from "./UniversalIntup";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getEnums } from "redux/enums/enumsSelectors";
import { getTotalItems } from "redux/products/productsSelectors";
import { useDispatch } from "react-redux";
import { getProductList } from "redux/products/productsOperations";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function FormCreateProduct() {
  const [images, setImages] = React.useState([null, null, null]);
  const [activeImage, setActiveImage] = React.useState(null);
  const totalItems = useSelector(getTotalItems) + 1;
  const enums = useSelector(getEnums);
  const dispatch = useDispatch();
  const page = 1;

  React.useEffect(() => {
    dispatch(getProductList({ page }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: totalItems,
      categoryId: null,
      colorId: null,
      materialId: null,
      deleted: true,
      name: "",
      description: "",
      photos: [null, null, null],
      height: null,
      length: null,
      price: null,
      quantity: null,
      warranty: null,
      weight: null,
      width: null,
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  const handleImageLoaded = (imageData) => {
    const updatedImages = [...images];
    if (updatedImages[0] === null) {
      updatedImages[0] = imageData;
    } else {
      updatedImages.push(imageData);
    }
    setImages(updatedImages);
    setActiveImage(imageData);
  };

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

  const renderImagePreview = (image, index) => (
    <Draggable key={index} draggableId={`image-${index}`} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "150px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
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
                  borderRadius: "5px",
                  boxShadow:
                    "0px 7px 15px 0px rgba(3, 12, 13, 0.1), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 171px 48px 0px rgba(3, 12, 13, 0);",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IconButton
                  component="span"
                  onClick={() => handleFileChange(index)}
                  sx={{}}
                >
                  <CachedOutlinedIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: (theme) => theme.palette.common.black,
                    }}
                  />
                </IconButton>
                <IconButton component="span" onClick={() => removeImage(index)}>
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
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow:
                  "0px 7px 15px 0px rgba(3, 12, 13, 0.1), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 171px 48px 0px rgba(3, 12, 13, 0);",
              }}
            >
              <IconButton
                component="span"
                sx={{
                  width: "150px",
                  height: "100px",
                  borderRadius: "5px",
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
            onChange={handleFileChange(index)}
          />
        </Box>
      )}
    </Draggable>
  );

  function DropZone({ onFileLoaded }) {
    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          onFileLoaded(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Box
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          width: "572px",
          height: "348px",
          bgcolor: (theme) => theme.palette.info.main,
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0px 7px 15px 0px rgba(3, 12, 13, 0.1), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 171px 48px 0px rgba(3, 12, 13, 0);",
        }}
      >
        <AttachFileIcon />
        <Typography variant="h4">Завантажте фото</Typography>
        <Typography variant="h4">або</Typography>
        <Typography variant="h4">перетягніть з робочого стола</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3">Новий товар №{totalItems}</Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "55px",
        }}
      >
        <Box sx={{ display: "flex" }}>
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
          <Box sx={{ ml: "108px" }}>
            {activeImage ? (
              <Box
                component="img"
                src={activeImage}
                alt="active img"
                sx={{
                  width: "572px",
                  height: "348px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  boxShadow:
                    "0px 7px 15px 0px rgba(3, 12, 13, 0.1), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 171px 48px 0px rgba(3, 12, 13, 0);",
                }}
              />
            ) : (
              <DropZone onFileLoaded={handleImageLoaded} />
            )}
            <Typography variant="body1" sx={{ width: "460px", mt: 4 }}>
              Перше фото це обкладинка для товару. Щоб змінити порядок -
              поретягніть зображення.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4, gap: 3, display: "flex", flexDirection: "column" }}>
          <UniversalInput fields={fields.name} formik={formik} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: "100px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
                gap: 3,
              }}
            >
              <UniversalInput fields={fields.price} formik={formik} />
              <UniversalInput fields={fields.quantity} formik={formik} />
              <UniversalInput
                fields={fields.category}
                options={enums.ECategories}
                formik={formik}
              />
              <UniversalInput
                fields={fields.material}
                options={enums.EMaterials}
                formik={formik}
              />
              <UniversalInput
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
              <UniversalInput fields={fields.weight} formik={formik} />
              <UniversalInput fields={fields.height} formik={formik} />
              <UniversalInput fields={fields.length} formik={formik} />
              <UniversalInput fields={fields.width} formik={formik} />
              <UniversalInput
                fields={fields.warranty}
                options={enums.EWarranties}
                formik={formik}
              />
            </Box>
          </Box>
          <UniversalInput fields={fields.description} formik={formik} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3, mt: 5 }}>
          <Button
            variant="outlined"
            sx={{
              p: "18px 40px",
            }}
          >
            Назад
          </Button>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
            sx={{
              p: "18px 40px",
            }}
          >
            Відправити
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
