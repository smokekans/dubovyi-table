import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  MobileStepper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import useGetColor from "hook/useGetColor";

const keyMessages = {
  quantity: "В наявності",
  categoryId: "Категорія",
  materialId: "Матеріал",
  weight: "Вага",
  colorId: "Колір",
  wight: "Ширина",
  height: "Висота",
  warranty: "Гарантія",
};

const desiredOrder = [
  "quantity",
  "categoryId",
  "materialId",
  "weight",
  "colorId",
  "wight",
  "height",
  "warranty",
];

function DetailsModal({ openDetails, setOpenDetails, row }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const color = useGetColor(row.colorId);

  const containerRef = useRef(null);
  const theme = useTheme();
  const maxSteps = row.photos.length;

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      if (openDetails) {
        event.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openDetails]);

  const renderListItemText = (key, value) => {
    let text = "";
    switch (key) {
      case "quantity":
        text = "шт.";
        break;
      case "warranty":
        text = "міс.";
        break;
      case "weight":
        text = "кг.";
        break;
      case "wight":
        text = "см.";
        break;
      case "height":
        text = "см.";
        break;
      case "colorId":
        text = color;
        break;
    }

    return (
      <ListItemText
        primary={`${value} ${text}`}
        sx={{ flex: "none", "& > span": { color: "#FAF9FB" } }}
      ></ListItemText>
    );
  };

  const handleClose = () => {
    setOpenDetails(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Modal
      open={openDetails}
      disableScrollLock={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        position: "absolute",
        top: "13%",
        left: "60%",
        overflow: "scroll",
        overflowY: "hidden",
        overflowX: "hidden",
        // height: "100%",
        height: "1400px",
        display: "block",
      }}
    >
      <Box
        sx={{
          width: "538px",
          padding: "56px 48px",
          bgcolor: "#324EBD",
          borderRadius: "50px 0px 0px 50px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ position: "absolute", top: "2%", left: "93%" }}>
          <CloseIcon
            sx={{
              width: "24px",
              height: "24px",
              color: "white",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => handleClose()}
          />
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h3"
          sx={{
            fontWeight: "400",
            fontSize: "40px",
            lineHeight: "normal",
            color: "#FAF9FB",
          }}
        >
          № {row.id}
        </Typography>

        <Box sx={{ width: "538px", height: "302px" }}>
          <Box
            sx={{
              height: "273px",
              maxWidth: "410px",
              width: "100%",
              margin: "0 auto",
              borderRadius: "25px",
              background: `url(${row.photos[activeStep]})`,
            }}
          ></Box>
          <MobileStepper
            // variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              // activeStep === maxSteps - 1 ? null : (
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  width: "48px",
                  minWidth: 0,
                  height: "48px",
                  padding: "16px",
                  borderRadius: "25px",
                  border: "1px solid #FAF9FB",
                }}
              >
                {/* {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : ( */}
                <KeyboardArrowRight sx={{ color: "#FAF9FB" }} />
                {/* )} */}
              </Button>
              // )
            }
            backButton={
              // activeStep === 0 ? null : (
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                style={{
                  width: "48px",
                  minWidth: 0,
                  height: "48px",
                  padding: "16px",
                  borderRadius: "25px",
                  border: "1px solid #FAF9FB",
                }}
              >
                {/* {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : ( */}
                <KeyboardArrowLeft sx={{ color: "#FAF9FB" }} />
                {/* )} */}
              </Button>
              // )
            }
            sx={{ background: "none" }}
          />
        </Box>

        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h3"
          sx={{
            fontWeight: "400",
            fontSize: "40px",
            lineHeight: "normal",
            color: "#FAF9FB",
          }}
        >
          {row.name}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          sx={{
            fontWeight: "400",
            fontSize: "24px",
            lineHeight: "normal",
            color: "#FAF9FB",
          }}
        >
          {row.price} грн.
        </Typography>
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "450px",
          }}
        >
          <List>
            {desiredOrder.map((key) => {
              if (keyMessages[key] && row[key]) {
                return (
                  <ListItem
                    key={key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={keyMessages[key]}
                      sx={{
                        flex: "none",

                        "& > span": {
                          fontSize: "13px",
                          fontWeight: "600",
                          letterSpacing: "1.3px",
                          textTransform: "uppercase",
                          color: "#FAF9FB",
                        },
                      }}
                    />
                    <ListItemText
                      sx={{
                        borderBottom: "1px dashed white",
                        alignSelf: "end",
                      }}
                    />

                    {renderListItemText(key, row[key])}
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "16px",
            "& > p": {
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1.3px",
              textTransform: "uppercase",
              color: "#FAF9FB",
            },
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
            }}
          >
            Опис
          </Typography>
          <Box
            sx={{
              width: "490px",
              minHeight: "100px",
              padding: "16px 24px",
              borderRadius: "25px",
              background: "#FAF9FB",

              textAlign: "left",
              flexWrap: "wrap",
              overflowWrap: "break-word",
            }}
          >
            <Typography>{row.description}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "24px" }}>
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: "25px",
              border: "1px solid  #FAF9FB ",
              "&:hover": {
                border: "1px solid #AAA",
                "& > p": {
                  color: "#AAA",
                },
              },
            }}
            // onClick={() => handleClose()}
          >
            <Typography sx={{ color: "#FAF9FB" }}>Видалити</Typography>
          </Button>
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: "25px",
              border: "1px solid  #FAF9FB ",
              "&:hover": {
                border: "1px solid #AAA",
                "& > p": {
                  color: "#AAA",
                },
              },
            }}
            // onClick={() => handleDeleteItem()}
          >
            <Typography sx={{ color: "#FAF9FB" }}>Редагувати</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DetailsModal;
