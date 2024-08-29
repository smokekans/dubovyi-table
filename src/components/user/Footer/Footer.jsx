import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import footerLogo from "../../../img/wood-crafts-footer.svg";
import footerLogoMobile from "../../../img/logo-footer-mobile.svg";
import { category, navItems, socialMedia } from "./config";

function Footer() {
  const half = Math.ceil(category.length / 2);
  const firstColumn = category.slice(0, half);
  const secondColumn = category.slice(half);

  const isMobile = useMediaQuery(`(max-width:834px)`);
  const isTablet = useMediaQuery(`(min-width:835px) and (max-width:1279px)`);

  return (
    <Box
      component="footer"
      sx={{
        background: "#0E352D",
        marginTop: "72px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: isMobile ? "center" : "flex-start",
        padding: isMobile ? "30px 50px" : "100px 108px",
        height: isMobile ? "auto" : "384px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          marginBottom: isMobile ? "24px" : "0",
        }}
      >
        <Link to="">
          <Box
            component="img"
            alt="logo"
            src={isMobile ? footerLogoMobile : footerLogo}
            sx={{
              height: isMobile ? "100%" : "160px",
              width: isMobile ? "100%" : "160px",
              minWidth: isMobile ? "180px" : "160px",
              maxWidth: isMobile ? "240px" : "160px",
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isTablet ? "space-between" : "center",
          gap: isMobile ? "24px" : isTablet ? "48px" : "287px",
        }}
      >
        {/* Перша колонка - Основні посилання */}
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            order: isMobile ? 1 : isTablet ? 1 : "unset",
          }}
        >
          {navItems.map((item, index) => (
            <ListItem disablePadding key={index}>
              <NavLink
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "#FFF",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      color: "#2B9E7F",
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>

        {/* Друга колонка - Категорії */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            order: isMobile ? 3 : isTablet ? 2 : "unset",
          }}
        >
          <Box>
            <List
              sx={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {firstColumn.map((item, index) => (
                <ListItem disablePadding key={index}>
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: "none", color: "#FFF" }}
                  >
                    <Typography
                      sx={{
                        textTransform: "none",
                        "&:hover": {
                          color: "#2B9E7F",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <List
              sx={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {secondColumn.map((item, index) => (
                <ListItem disablePadding key={index}>
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: "none", color: "#FFF" }}
                  >
                    <Typography
                      sx={{
                        textTransform: "none",
                        "&:hover": {
                          color: "#2B9E7F",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Третя колонка - Соціальні мережі */}
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginLeft: isMobile ? "0" : "272px",
            order: isMobile ? 2 : isTablet ? 3 : "unset",
          }}
        >
          {socialMedia.map((item, index) => (
            <ListItem disablePadding key={index}>
              <NavLink to={item.path} style={{ textDecoration: "none" }}>
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: "#FFF",
                    "&:hover": {
                      background: "transparent",
                      color: "#2B9E7F",
                    },
                    padding: 0,
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Button>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Footer;
