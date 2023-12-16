import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 320,
      maxMobile: 480,
      tablet: 768,
      desktop: 1280,
    },
  },
  palette: {
    mode: "light",
    common: {
      black: "#030C0D",
      white: "#FAF9FB",
    },
    primary: {
      main: "#324EBD",
      dark: "#789DD1",
      light: "#BDCAFF",
      contrastText: "#FAF9FB",
    },
    secondary: {
      main: "#030C0D",
      dark: "#AAAAAA",
      light: "#D9D9D9",
    },
    error: {
      main: "rgba(209, 54, 52, 0.25)",
      contrastText: "#D13634",
    },
    warning: {
      main: "rgba(251, 160, 50, 0.25)",
      contrastText: "#FBA032",
    },
    info: {
      main: "#D9D9D9",
      contrastText: "#030C0D",
    },
    success: {
      main: "#FAF9FB",
      contrastText: "rgba(124, 167, 95, 0.25)",
    },

    text: {
      primary: "#030C0D",
      secondary: "#FAF9FB",
      disabled: "#AAAAAA",
    },
    divider: "#789DD1",
    background: { paper: "#FAF9FB", default: "#fff" },
    action: {
      active: "#324EBD",
      hover: "#789DD1",
      selected: "#D9D9D9",
      disabled: "#FAF9FB",
      disabledBackground: "#AAAAAA",
      focus: "#FAF9FB",
    },
  },

  spacing: [0, 8, 16, 24, 32, 56, 96],
  shape: {
    borderRadius: 5,
  },
  shadows: [
    "none",
    "0px 0px 6px rgba(0, 0, 0, 0.60)",
    "0px 7px 15px rgba(3, 12, 13, 0.10)",
    "none",
    "none",
  ],
  typography: {
    fontFamily: "Onest",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h1: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "104px",
    },
    h2: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "64px",
    },
    h3: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "40px",
    },
    h4: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "24px",
    },
    subtitle1: {
      fontFamily: "Onest",
      fontWeight: 600,
      fontSize: "13px",
      letterSpacing: 1.3,
      textTransform: "uppercase",
    },
    body1: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "16px",
      letterSpacing: 0.08,
    },
    button: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "16px",
      letterSpacing: 0.08,
    },
  },
});

export default theme;
