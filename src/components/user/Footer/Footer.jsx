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

  const isMobile = useMediaQuery(`(max-width:833px)`);
  const isTablet = useMediaQuery(`(min-width:834px) and (max-width:1279px)`);

  return (
    <Box
      component="footer"
      sx={{
        marginTop: isMobile ? "72px" : isTablet ? "105px" : "72px",
        background: "#0E352D",
        padding: isMobile
          ? "30px 20px"
          : isTablet
          ? "100px 50px"
          : "100px 108px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1440px", // Ограничение ширины контента
          margin: "0 auto", // Центрирование контента
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: isMobile ? "center" : "flex-start",
          gap: isMobile ? "24px" : isTablet ? "61px" : "231px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
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
            display: "grid",
            gridTemplateAreas: isMobile
              ? `"links categories" 
                 "socials categories"`
              : `"links categories socials"`,
            justifyContent: isMobile ? "center" : "space-between",
            gridGap: isMobile ? "40px" : isTablet ? "48px" : "87px",
            gridRowGap: 0,
            width: "100%",
          }}
        >
          {/* Перша колонка - Основні посилання */}
          <List
            id="links"
            sx={{
              paddingY: "0px",
              gridArea: "links",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "32px",
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
            id="categories"
            sx={{
              gridArea: "categories",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "16px" : "61px",
              order: isMobile ? 3 : isTablet ? 2 : "unset",
            }}
          >
            <Box>
              <List
                sx={{
                  paddingY: "0px",
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "16px" : "32px",
                }}
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
                sx={{
                  paddingY: "0px",
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "16px" : "32px",
                }}
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
            id="socials"
            sx={{
              paddingTop: isMobile ? "40px" : 0,
              paddingBottom: "0px",
              gridArea: "socials",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "24px" : "32px",
              marginLeft: 0,
              order: isMobile ? 2 : isTablet ? 3 : "unset",
              justifyContent: "center",
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
    </Box>
  );
}

export default Footer;
