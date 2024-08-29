import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import CartIcon from "../../../img/header/cart.svg";

import bg from "../../../img/header/BurgerImage.png";
import table from "../../../img/header/table.png";
import table2 from "../../../img/header/table2.png";
import bed from "../../../img/header/bed.png";
import nightstand from "../../../img/header/nightstand.png";
import sofa from "../../../img/header/sofa.png";
import someElse from "../../../img/header/someElse.png";
import stool from "../../../img/header/stool.png";
import stool2 from "../../../img/header/stool2.png";
import wardrobe from "../../../img/header/wardrobe.png";
import SearchInput from "./SearchInput";
import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";

function BurgerMenu({
  imageSrc,
  handleMouseEnter,
  handleMouseLeave,
  open,
  anchorEl,
  setAnchorEl,
  handleClose,
  drawerOpen,
  setDrawerOpen,
}) {
  const [iconVisible, setIconVisible] = useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setIconVisible(false);
    setTimeout(() => {
      setDrawerOpen(!drawerOpen);
      setIconVisible(true);
    }, 300);
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
            height: "-webkit-fill-available",
            backgroundColor: "#fff",
            zIndex: 1000,
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
            }}
          >
            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              <SearchInput />
            </ListItem>

            <ListItem sx={{ textAlign: "center", justifyContent: "center" }}>
              <Button
                endIcon={
                  open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: "black",
                  padding: 0,
                  "&:hover": {
                    background: "transparent",
                    color: "#BBC252",
                  },
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      color: "#BBC252",
                    },
                  }}
                >
                  Каталог
                </Typography>
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  marginTop: "38px",
                  ".MuiPaper-root": { borderRadius: "0px" },
                  ".MuiMenuItem-root": {
                    padding: 0,
                    minHeight: 0,
                    "&:hover": {
                      background: "transparent",
                      color: "#2B9E7F",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "250px",
                    background: "light-grey",
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(table)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Столи
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(stool2)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Стільці
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(wardrobe)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Шафи
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(bed)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Ліжка
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(nightstand)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Тумбочки
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(table2)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Столики
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(stool)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Табуретки
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(sofa)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Дивани
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      onMouseEnter={() => handleMouseEnter(someElse)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Інше
                    </MenuItem>
                  </Box>
                  <Box
                    component="img"
                    alt="category"
                    src={imageSrc}
                    sx={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                      objectPosition: "bottom",
                    }}
                  />
                </Box>
              </Menu>
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
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      color: "#BBC252",
                    },
                  }}
                >
                  FAQ
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
                  sx={{
                    textTransform: "none",
                    whiteSpace: "nowrap",
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

          <Box
            sx={{
              padding: "16px",
              textAlign: "center",
              position: "relative",
              zIndex: 10,
              bottom: "35px",
            }}
          >
            <Typography>Всі права захищені &#9675; 2024</Typography>
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
