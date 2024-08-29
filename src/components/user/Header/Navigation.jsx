import {
  Box,
  Button,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import table from "../../../img/header/table.png";
import table2 from "../../../img/header/table2.png";
import bed from "../../../img/header/bed.png";
import nightstand from "../../../img/header/nightstand.png";
import sofa from "../../../img/header/sofa.png";
import someElse from "../../../img/header/someElse.png";
import stool from "../../../img/header/stool.png";
import stool2 from "../../../img/header/stool2.png";
import wardrobe from "../../../img/header/wardrobe.png";

import BurgerMenu from "./BurgerMenu";

function Navigation({ isNavVisible }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageSrc, setImageSrc] = useState(table);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const isMobile = useMediaQuery(`(max-width:834px)`);
  const isTablet = useMediaQuery(`(max-width:1279px)`);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = (newImage) => {
    setImageSrc(newImage);
  };

  const handleMouseLeave = () => {
    setImageSrc(table);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {isMobile ? (
        <BurgerMenu
          imageSrc={imageSrc}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClose={handleClose}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      ) : (
        <>
          {isNavVisible && (
            <List sx={{ display: "flex", gap: "24px" }}>
              <ListItem disablePadding>
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

              <ListItem disablePadding>
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

              <ListItem disablePadding>
                <Button
                  endIcon={
                    open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                  }
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
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
                      width: "1440px",
                      height: "230px",
                      background: "light-grey",
                      borderTop: "1px solid #2A2928",
                      borderRight: "1px solid #2A2928",
                      borderLeft: "1px solid #2A2928",
                      padding: "32px 30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
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
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                      }}
                    >
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
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                      }}
                    >
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
                        height: "230px",
                        width: "251px",
                        objectFit: "cover",
                        objectPosition: "bottom",
                      }}
                    />
                  </Box>
                </Menu>
              </ListItem>
            </List>
          )}
          <Button
            sx={{
              display: "flex",
              gap: "8px",
              background: "#0E352D",
              padding: "16px 56px",
              color: "#F6F5F5",
              justifyСontent: "center",
              alignItems: "center",
              borderRadius: "0",
              marginLeft: isTablet ? "13px" : "76px",
              "&:hover": { background: "#176554" },
            }}
          >
            <Typography>Кошик</Typography>
            <KeyboardArrowDownIcon />
          </Button>
        </>
      )}
    </Box>
  );
}

export default Navigation;
