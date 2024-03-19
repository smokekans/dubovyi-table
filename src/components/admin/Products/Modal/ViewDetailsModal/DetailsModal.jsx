import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  MobileStepper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useGetColor from "hook/useGetColor";
import useGetCategory from "hook/useGetCategory";
import useGetMaterial from "hook/useGetMaterial";
import { deleteProduct } from "services/fetchData";

const keyMessages = {
  quantity: "В наявності",
  categoryId: "Категорія",
  materialId: "Матеріал",
  weight: "Вага",
  colorId: "Колір",
  width: "Ширина",
  height: "Висота",
  length: "Довжина",
  updateDate: "Останнє оновлення",
  warranty: "Гарантія",
};

const desiredOrder = [
  "quantity",
  "categoryId",
  "materialId",
  "weight",
  "colorId",
  "width",
  "height",
  "length",
  "updateDate",
  "warranty",
];

function DetailsModal(props) {
  const { openDetails, setOpenDetails, handleDeleteItem, row } = props;

  const [setContainerWidth] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const color = useGetColor(row.colorId);
  const category = useGetCategory(row.categoryId);
  const material = useGetMaterial(row.materialId);

  const containerRef = useRef(null);
  const maxSteps = row.photos.length;

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      case "width":
        text = "см.";
        break;
      case "height":
        text = "см.";
        break;
      case "length":
        text = "см.";
        break;
      case "colorId":
        value = color;
        break;
      case "categoryId":
        value = category;
        break;
      case "materialId":
        value = material;
        break;
      default:
        break;
    }

    return (
      <ListItemText
        primary={`${value} ${text}`}
        sx={{
          flex: "none",
          "& > span": { color: (theme) => theme.palette.common.white },
        }}
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

  const handleDelete = async () => {
    const productToDelete = [{ id: row.id }];
    await handleDeleteItem(productToDelete, setOpenDetails);
  };

  return (
    <Modal
      open={openDetails}
      disableScrollLock={true}
      onClose={handleClose}
      style={{
        position: "absolute",
        top: "13%",
        left: "26%",
        overflow: "scroll",
        overflowY: "hidden",
        overflowX: "hidden",
        // height: "content-box",
        height: "719px",
        width: "1128px",
        display: "block",
        // padding: "28px 32px 56px 32px",
        // backgroundColor: "rgb(50, 78, 189)",
        // borderRadius: "50px 0px 0px 50px",
      }}
    >
      <Box
        sx={{
          width: "1064px",
          // height: "719px",
          // padding: "28px 32px 56px 32px",
          // bgcolor: "#324EBD",
          borderRadius: "50px 0px 0px 50px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(50, 78, 189)",
          padding: "28px 32px 56px 32px",

          // gap: "32px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ position: "absolute", top: "2%", left: "96%" }}>
          <CloseIcon
            sx={{
              width: "24px",
              height: "24px",
              color: (theme) => theme.palette.text.secondary,
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => handleClose()}
          />
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h3"
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          № {row.id}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "28px",
            marginTop: "17px",
            height: "567px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                width: "538px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                // id="modal-modal-title"
                variant="h3"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {row.name}
              </Typography>
              <Typography
                // id="modal-modal-title"
                variant="h4"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  marginTop: 3,
                }}
              >
                {row.price} грн.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "273px",
                  width: "538px",
                  // marginTop: 4,
                }}
              >
                <Button
                  size="small"
                  onClick={handleBack}
                  sx={{
                    width: "48px",
                    minWidth: 0,
                    height: "48px",
                    padding: 2,
                    borderRadius: 5,
                    border: (theme) =>
                      `1px solid ${theme.palette.common.white}`,
                    "&:hover": { border: "1px solid transparent" },
                    visibility: activeStep === 0 ? "hidden" : "visible",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <KeyboardArrowLeft
                    sx={{ color: (theme) => theme.palette.common.white }}
                  />
                </Button>

                <Box
                  sx={{
                    width: "410px",
                    height: "273px",
                    margin: "0 auto",
                    // marginTop: 4,
                    borderRadius: 5,
                    background: `url(${row.photos[activeStep]})`,
                    backgroundSize: "cover",
                  }}
                ></Box>

                <Button
                  size="small"
                  onClick={handleNext}
                  sx={{
                    width: "48px",
                    minWidth: 0,
                    height: "48px",
                    padding: 2,
                    borderRadius: 5,
                    border: (theme) =>
                      `1px solid ${theme.palette.common.white}`,
                    "&:hover": { border: "1px solid transparent" },
                    visibility:
                      activeStep === maxSteps - 1 ? "hidden" : "visible",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <KeyboardArrowRight
                    sx={{ color: (theme) => theme.palette.common.white }}
                  />
                </Button>
              </Box>
              <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={null}
                backButton={null}
                sx={{
                  background: "transparent",
                  marginTop: "24px",
                  "& .MuiMobileStepper-dot": {
                    width: "34px",
                    height: "5px",
                    borderRadius: "3px",
                    background: "#D9D9D9",
                  },
                  "& .MuiMobileStepper-dotActive": {
                    width: "94px",
                    height: "5px",
                    borderRadius: "3px",
                    background: "#D9D9D9",
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  margin: "0 auto",
                  marginTop: "70px",
                }}
              >
                <Button
                  sx={{
                    padding: "18px 40px",
                    borderRadius: 5,
                    border: (theme) =>
                      `1px solid  ${theme.palette.common.white}`,
                    "&:hover": {
                      background: (theme) => theme.palette.common.white,
                      "& > p": {
                        color: (theme) => theme.palette.primary.main,
                      },
                    },
                  }}
                  onClick={() => handleDelete()}
                >
                  <Typography
                    sx={{ color: (theme) => theme.palette.common.white }}
                  >
                    Видалити
                  </Typography>
                </Button>
                <Button
                  sx={{
                    padding: "18px 40px",
                    borderRadius: 5,
                    border: (theme) =>
                      `1px solid  ${theme.palette.common.white} `,
                    "&:hover": {
                      background: (theme) => theme.palette.common.white,
                      "& > p": {
                        color: (theme) => theme.palette.primary.main,
                      },
                    },
                  }}
                  // onClick={() => handleDeleteItem()}
                >
                  <Typography
                    sx={{ color: (theme) => theme.palette.text.secondary }}
                  >
                    Редагувати
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              border: (theme) => `2px solid ${theme.palette.common.white}`,
              borderRadius: 5,
              height: "100%",
            }}
          />
          <Box sx={{ height: "100%" }}>
            <Box
              ref={containerRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "450px",
              }}
            >
              <List
                sx={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {desiredOrder.map((key) => {
                  if (keyMessages[key] && row[key]) {
                    return (
                      <ListItem
                        key={key}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: 0,
                        }}
                      >
                        <ListItemText
                          primary={keyMessages[key]}
                          sx={{
                            flex: "none",
                            margin: 0,

                            "& > span": {
                              fontSize: "13px",
                              fontWeight: "600",
                              letterSpacing: "1.3px",
                              lineHeight: "normal",
                              textTransform: "uppercase",
                              color: (theme) => theme.palette.text.secondary,
                            },
                          }}
                        />
                        <ListItemText
                          sx={{
                            borderBottom: (theme) =>
                              `1px dashed ${theme.palette.common.white}`,
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                  marginTop: 4,
                  "& > p": {
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "1.3px",
                    textTransform: "uppercase",
                    color: (theme) => theme.palette.text.secondary,
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
                    width: "420px",
                    height: "154px",
                    padding: 2,
                    paddingLeft: 4,
                    borderRadius: 5,
                    background: (theme) => theme.palette.background.paper,
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      flexWrap: "wrap",
                      overflowWrap: "break-word",
                      overflowY: "auto",
                      paddingRight: 2,
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: (theme) =>
                          theme.palette.secondary.dark,
                        borderRadius: "5px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: (theme) =>
                          theme.palette.secondary.light,
                        borderRadius: "5px",
                      },
                    }}
                  >
                    // переробити на інпут //
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {row.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default DetailsModal;
