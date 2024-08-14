import { Container, Box, AppBar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../img/logo-wood-crafts.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function HeaderAdmin() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "96px",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.common.white,
        borderBottom: (theme) => `1px solid ${theme.palette.secondary.dark}`,
        borderRadius: 0,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1280px",
        }}
      >
        <Link to="/">
          <Box
            component="img"
            alt="logo"
            src={logo}
            sx={{ height: "56px", width: "96px" }}
          />
        </Link>
        <Box sx={{ mx: 4, gap: 5, display: "flex" }}>
          <Link
            to="/authorization"
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Typography>Авторизація</Typography>
          </Link>
          <Link
            to="/admin/main"
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Typography>Admin</Typography>
          </Link>
        </Box>
        <Button
          variant="text"
          endIcon={<ExitToAppIcon sx={{ width: 24, height: 24 }} />}
          sx={{
            p: 8,
            height: "40px",
            textTransform: "none",
            color: (theme) => theme.palette.common.black,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.secondary.dark,
            },
          }}
          onClick={() => navigate("/")}
        >
          Вихід
        </Button>
      </Container>
    </AppBar>
  );
}
