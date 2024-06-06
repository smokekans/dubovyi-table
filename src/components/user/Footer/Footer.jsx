import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import footerLogo from "../../../img/wood-crafts-footer.svg";
import { category, navItems, socialMedia } from "./config";

function Footer() {
  const half = Math.ceil(category.length / 2);
  const firstColumn = category.slice(0, half);
  const secondColumn = category.slice(half);

  return (
    <Box
      sx={{
        height: "384px",
        background: "#0E352D",
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="">
        <Box
          component="img"
          alt="logo"
          src={footerLogo}
          sx={{ height: "160px", width: "160px" }}
        />
      </Link>

      <Box
        sx={{
          display: "flex",
          gap: "287px",
          marginLeft: "138px",
        }}
      >
        <Box>
          <List sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
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
        </Box>

        <Box sx={{ display: "flex", gap: "61px" }}>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
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
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
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

      <Box sx={{ marginLeft: "272px" }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {socialMedia.map((item, index) => (
            <ListItem disablePadding key={index}>
              <NavLink to={item.path} style={{ textDecoration: "none" }}>
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: "#FFF",
                    "&:hover": { background: "transparent" },
                    padding: 0,
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
