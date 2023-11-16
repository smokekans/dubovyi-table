import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { items } from "./config";

export default function Sidebar() {
  return (
    <>
      <Drawer
        sx={{
          width: "330px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "330px",
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List
          sx={{
            height: "376px",
            padding: 4,
            background: "#324EBD",
            borderRadius: "25px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            display: "inline-flex",
            m: 7,
          }}
        >
          {items.map((item, index) => (
            <ListItem disablePadding sx={{ height: "24px" }}>
              <Link
                key={index}
                to={item.path}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <ListItemButton>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: "#FAF9FB",
                      fontSize: 16,
                      fontFamily: "Onest",
                      fontWeight: "400",
                      letterSpacing: 0.08,
                      wordWrap: "break-word",
                      textAlign: "center",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ ml: "346px", mt: "152px" }}>
        <Outlet />
      </Box>
    </>
  );
}
