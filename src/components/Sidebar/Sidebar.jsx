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
import { Link } from "react-router-dom";
import { items } from "./config";

export default function Sidebar() {
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
            borderRight: (theme) => `2px solid ${theme.palette.primary.main}`,
            mb: "322px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{
            background: (theme) => theme.palette.primary.main,
            borderRadius: (theme) => theme.shape.borderRadius,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            display: "inline-flex",
            mx: 5,
            p: 4,
          }}
        >
          {items.map((item, index) => (
            <ListItem
              disablePadding
              key={index}
              sx={{ height: "24px", gap: 2 }}
            >
              <Link
                key={index}
                to={item.path}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    display: "inline-flex",
                    alignItems: "center",
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
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Toolbar />
      <Outlet />
    </Box>
  );
}
