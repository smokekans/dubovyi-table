import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

import { items } from "./config";

export default function Sidebar() {
  const activeStyle = {
    backgroundColor: "#789DD1",
    textDecoration: "none",
    cursor: "pointer",
    width: "100%",
    borderRadius: 25,
    padding: "0",
  };

  return (
    <Box
      sx={{
        display: "flex",
        pt: 6,
        mt: 5,
      }}
    >
      <Drawer
        sx={{
          position: "static",
          width: "330px",
          mb: "322px",
          "& .MuiDrawer-paper": {
            position: "static",
            width: "330px",
            maxHeight: "100%",
            borderRight: 0,
            mb: "510px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{
            background: (theme) => theme.palette.primary.main,
            borderRadius: 5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            mx: 5,
            p: 4,
            gap: 4,
          }}
        >
          {items.map((item, index) => (
            <ListItem disablePadding key={index} sx={{ height: "20px" }}>
              <NavLink
                to={item.path}
                style={({ isActive }) =>
                  isActive
                    ? activeStyle
                    : {
                        textDecoration: "none",
                        cursor: "pointer",
                        width: "100%",
                      }
                }
              >
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "start",
                    width: "100%",
                    textAlign: "start",
                    p: "4px 8px",
                  }}
                >
                  <Typography
                    variant="body1"
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
      </Drawer>
      <Toolbar />
      <Outlet />
    </Box>
  );
}
