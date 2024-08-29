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
      zero: "#effaf6",
      one: "#d8f3e7",
      two: "#b3e7d2",
      three: "#81d4b8",
      four: "#4eb998",
      five: "#2b9e7f",
      six: "#1c7f66",
      seven: "#176554",
      eight: "#145144",
      nine: "#0e352d",
      ten: "#092520",
      main: "#2b9e7f",
    },
    secondary: {
      zero: "#fafaeb",
      one: "#f3f3d4",
      two: "#e6e7af",
      three: "#d3d77f",
      four: "#bbc252",
      five: "#a0a939",
      six: "#7d862a",
      seven: "#5f6724",
      eight: "#4d5321",
      nine: "#414720",
      ten: "#22260d",
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
      zero: "#f6f5f5",
      one: "#e7e6e6",
      two: "#d2d0cf",
      three: "#b2afae",
      four: "#8b8785",
      five: "#706c6a",
      six: "#605c5a",
      seven: "#514f4d",
      eight: "#464444",
      nine: "#3e3d3b",
      ten: "#2a2928",
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
