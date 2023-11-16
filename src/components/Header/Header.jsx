import { Container, Toolbar, Box, AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const pages = ["authorization", "admin"];

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ height: "96px", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Toolbar>
          <Link to="/">LOGO</Link>
          <Box sx={{ mx: 4, gap: 5, display: "flex" }}>
            {pages.map((page, index) => (
              <Link to={page} key={index}>
                <Typography>{page}</Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
