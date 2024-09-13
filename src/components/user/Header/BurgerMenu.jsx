import React, { useState, useEffect } from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import CartIcon from "../../../img/header/cart.svg";

import bg from "../../../img/header/BurgerImage.png";
import SearchInput from "./SearchInput";
import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";

function BurgerMenu({ drawerOpen, setDrawerOpen }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [openCatalog, setOpenCatalog] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen]);

  const handleDrawerOpen = () => {
    setIconVisible(false);
    setTimeout(() => {
      setDrawerOpen(!drawerOpen);
      setIconVisible(true);
    }, 300);
  };

  const handleCatalogToggle = () => {
    setOpenCatalog(!openCatalog);
  };

  return (
    <>
      <Button
        sx={{
          order: 2,
          minWidth: "auto",
          background: "transparent",
          "&:hover": { background: "transparent" },
          padding: 16,
          transition: "opacity 0.3s ease",
          opacity: iconVisible ? 1 : 0,
        }}
        onClick={handleDrawerOpen}
      >
        {drawerOpen ? (
          <CloseIcon style={{ width: 28, height: 28 }} />
        ) : (
          <MenuIcon style={{ width: 28, height: 28 }} />
        )}
      </Button>

      {drawerOpen && (
        <Box
          sx={{
            position: "fixed",
            top: "92px",
            left: 0,
            width: "100%",
            height: "calc(100% - 92px)",
            backgroundColor: "#fff",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: "29px",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
                <SearchInput />
              </ListItem>

              <ListItem
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  zIndex: 10,
                  marginTop: "72px",
                }}
              >
                <Button
                  endIcon={
                    openCatalog ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  onClick={handleCatalogToggle}
                  sx={{
                    color: "black",
                    padding: 0,
                    width: "24px",
                    height: "24px",
                    "&:hover": {
                      background: "transparent",
                      color: "#BBC252",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      textTransform: "none",
                      fontSize: "32px",
                      "&:hover": {
                        color: "#BBC252",
                      },
                    }}
                  >
                    Каталог
                  </Typography>
                </Button>

                {openCatalog && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                      marginTop: "10px",
                      paddingLeft: "16px",
                    }}
                  >
                    <Typography variant="h4">Столи</Typography>
                    <Typography variant="h4">Стільці</Typography>
                    <Typography variant="h4">Шафи</Typography>
                    <Typography variant="h4">Ліжка</Typography>
                    <Typography variant="h4">Тумбочки</Typography>
                    <Typography variant="h4">Столики</Typography>
                    <Typography variant="h4">Табуретки</Typography>
                    <Typography variant="h4">Дивани</Typography>
                    <Typography variant="h4">Інше</Typography>
                  </Box>
                )}
              </ListItem>

              <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
                <NavLink
                  to=""
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      textTransform: "none",
                      fontSize: "32px",
                      "&:hover": {
                        color: "#BBC252",
                      },
                    }}
                  >
                    Кошик
                  </Typography>
                </NavLink>
              </ListItem>

              <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
                <NavLink
                  to=""
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      textTransform: "none",
                      fontSize: "32px",
                      "&:hover": {
                        color: "#BBC252",
                      },
                    }}
                  >
                    FAQ
                  </Typography>
                </NavLink>
              </ListItem>

              <ListItem
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  marginBottom: "101px",
                }}
              >
                <NavLink
                  to=""
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      fontSize: "32px",
                      "&:hover": {
                        color: "#BBC252",
                      },
                    }}
                  >
                    Про нас
                  </Typography>
                </NavLink>
              </ListItem>
            </List>
          </Box>

          <Box
            sx={{
              padding: "16px",
              textAlign: "center",
              position: "relative",
              zIndex: 10,
              bottom: "35px",
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
              }}
            >
              Всі права захищені &#9675; 2024
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "348px",
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          />
        </Box>
      )}

      <Button
        sx={{
          padding: 0,
          minWidth: "auto",
          marginLeft: "auto",
          background: "transparent",
          "&:hover": { background: "transparent" },
        }}
      >
        <img
          src={CartIcon}
          alt="Cart"
          style={{ width: 28, height: 28, padding: 16 }}
        />
      </Button>
    </>
  );
}

export default BurgerMenu;
