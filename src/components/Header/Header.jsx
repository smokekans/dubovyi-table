import {
  Container,
  Box,
  AppBar,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../img/logo-wood-crafts.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
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
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 5,
          alignItems: "center",
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
        <TextField
          id="input-search"
          focused
          color="secondary"
          placeholder="Пошук"
          sx={{
            ".MuiInputBase-root": {
              padding: "8px 24px",
              borderRadius: (theme) => theme.shape.borderRadius,
            },
            ".MuiInputBase-input": {
              width: "290px",
              fontSize: "16px",
              p: 0,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.common.black }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ mx: 4, gap: 5, display: "flex" }}>
          <Link to="/authorization">
            <Typography>Авторизація</Typography>
          </Link>
          <Link to="/admin/main">
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
            borderRadius: (theme) => theme.shape.borderRadius,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.secondary.dark,
              borderRadius: (theme) => theme.shape.borderRadius,
            },
          }}
        >
          Вихід
        </Button>
      </Container>
    </AppBar>
  );
}
