import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 375,
      maxMobile: 480,
      tablet: 834,
      desktop: 1440,
    },
  },
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#FFF",
      gray: "#AAA",
    },
    primary: {
      50: "#effaf6",
      100: "#d8f3e7",
      200: "#b3e7d2",
      300: "#81d4b8",
      400: "#4eb998",
      500: "#2b9e7f",
      600: "#1c7f66",
      700: "#176554",
      800: "#145144",
      900: "#0e352d",
      950: "#092520",
      main: "#2b9e7f",
    },
    secondary: {
      50: "#fafaeb",
      100: "#f3f3d4",
      200: "#e6e7af",
      300: "#d3d77f",
      400: "#bbc252",
      500: "#a0a939",
      600: "#7d862a",
      700: "#5f6724",
      800: "#4d5321",
      900: "#414720",
      950: "#22260d",
      main: "#bbc252",
    },
    error: {
      main: "#B53134",
      contrastText: "#000",
    },
    warning: {
      main: "#EE6723",
      contrastText: "#000",
    },
    info: {
      50: "#f6f5f5",
      100: "#e7e6e6",
      200: "#d2d0cf",
      300: "#b2afae",
      400: "#8b8785",
      500: "#706c6a",
      600: "#605c5a",
      700: "#514f4d",
      800: "#464444",
      900: "#3e3d3b",
      950: "#2a2928",
      main: "#706c6a",
    },
    success: {
      main: "#2B9E7F",
      contrastText: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#FFF",
      disabled: "#AAA",
    },
    divider: "#145144",
    background: { paper: "#fff", default: "#fff" },
    action: {
      active: "#0E352D",
      hover: "#176554",
      selected: "#176554",
      disabled: "#E7E6E6",
      disabledBackground: "#B2AFAE",
      focus: "#2B9E7F",
    },
  },
  spacing: (factor) => {
    const spacingValues = [0, 8, 16, 24, 32, 56, 96];
    return spacingValues[factor];
  },

  typography: {
    fontFamily: "Ruda",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h1: {
      fontFamily: "Viaoda Libre",
      fontWeight: 400,
      fontSize: { mobile: "56px", tablet: "80px" },
      lineHeight: { mobile: "79.02px", tablet: "112.88px" },
      letterSpacing: "0.013em",
    },
    h2: {
      fontFamily: "Ruda",
      fontWeight: 400,
      fontSize: { mobile: "32px", tablet: "48px" },
      lineHeight: { mobile: "38.94px", tablet: "58.42px" },
      letterSpacing: { tablet: "-0.01em" },
    },
    h3: {
      fontFamily: "Ruda",
      fontWeight: 400,
      fontSize: { mobile: "24px", tablet: "32px" },
      lineHeight: { mobile: "29.21px", tablet: "38.94px" },
    },
    h4: {
      fontFamily: "Ruda",
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "29.21px",
    },
    subtitle1: {
      fontFamily: "Ruda",
      fontSize: "13px",
      lineHeight: "15.82px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
    body1: {
      fontFamily: "Ruda",
      fontWeight: 400,
      fontSize: { mobile: "14px", tablet: "16px" },
      lineHeight: { mobile: "19.6px", tablet: "22.4px" },
    },
    body2: {
      fontFamily: "Ruda",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "19.6px",
    },
    button: {
      fontFamily: "Ruda",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "19.47px",
      letterSpacing: "0.015em",
      textTransform: "uppercase",
    },
  },

  components: {},
});

export default theme;
