import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { ProductSchema } from "./ProductSchema";
import { fields } from "./fields";
import * as React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function FormCreateProduct() {
  const [images, setImages] = React.useState([null, null, null]);
  const [activeImage, setActiveImage] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      image: null,
      name: "",
      price: "",
      category: "",
      description: "",
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      resetForm();
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
            marginBottom: 2,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          {image ? (
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={image}
                alt={`preview-${index}`}
                height={100}
                width={150}
                sx={{ marginRight: 2 }}
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
                >
                  <CachedOutlinedIcon />
                </IconButton>
                <IconButton component="span" onClick={() => removeImage(index)}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <InputLabel htmlFor={`file-input-${index}`}>
              <IconButton component="span">
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

  return (
    <Box>
      <Typography variant="h3">Новий товар №</Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {images.map((image, index) =>
                    renderImagePreview(image, index)
                  )}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Box
            component="img"
            src={activeImage}
            alt={activeImage?.name}
            height={348}
            width={572}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Button disabled={formik.isSubmitting} type="submit">
          Відправити
        </Button>
      </Box>
    </Box>
  );
}
