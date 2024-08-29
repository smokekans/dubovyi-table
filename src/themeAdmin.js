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
      gray: "#AAAAAA",
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
      main: "#D13634",
      contrastText: "rgba(209, 54, 52, 0.25)",
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
      disabled: "#AAAAAA",
      disabledBackground: "#AAAAAA",
      focus: "#FAF9FB",
    },
  },
  spacing: (factor) => {
    const spacingValues = [0, 8, 16, 24, 32, 56, 96];
    return spacingValues[factor];
  },
  shape: {
    borderRadius: 5,
  },
  shadows: [
    "none",
    "0px 0px 6px rgba(0, 0, 0, 0.60)",
    "0px 7px 15px rgba(3, 12, 13, 0.10)",
    "0px 7px 15px 0px rgba(3, 12, 13, 0.10), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 171px 48px 0px rgba(3, 12, 13, 0.00)",
    "none",
    "none",
    "none",
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
      lineHeight: "30.6px",
      fontStyle: "normal",
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
      lineHeight: "20.4px",
      letterSpacing: 0.08,
    },
    button: {
      fontFamily: "Onest",
      fontWeight: 400,
      fontSize: "16px",
      letterSpacing: 0.08,
    },
  },

  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: "#AAAAAA",
          boxShadow: "0px 4px 18px 3px #2E323414, 0px 1px 6px 0px #0B3C5D1F",
          backgroundColor: "#FAF9FB",
          marginTop: "24px",
        },
      },
    },
    MuiMonthCalendar: {
      styleOverrides: {
        root: {
          padding: 0,
          rowGap: "24px",
        },
      },
    },
    MuiYearCalendar: {
      styleOverrides: {
        root: {
          rowGap: "8px",
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          color: "#030C0D",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: "#030C0D",
        },
        label: {
          color: "#030C0D",
          textTransform: "capitalize",
          fontFamily: "Onest",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20.4px",
          letterSpacing: 0.08,
        },
        switchViewButton: {
          color: "#030C0D",
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          color: "#030C0D",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: "0.005em",
          "&.Mui-disabled": {
            color: "#AAA",
          },
          "&.Mui-selected:focus": {
            backgroundColor: "#789DD1",
            color: "#FAF9FB",
          },
          "&.Mui-selected": {
            backgroundColor: "#789DD1",
            color: "#FAF9FB",
          },
          "&:hover, &:focus": {
            backgroundColor: "#324EBD",
            color: "#FAF9FB",
          },
        },
      },
    },
    MuiPickersMonth: {
      styleOverrides: {
        monthButton: {
          color: "#030C0D",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: "0.005em",
          "&.Mui-disabled": {
            color: "#AAA",
          },
          "&.Mui-selected:focus": {
            backgroundColor: "transparent",
            color: "#789DD1",
            fontSize: "24px",
            lineHeight: "31px",
            letterSpacing: "0em",
          },
          "&.Mui-selected": {
            backgroundColor: "transparent",
            color: "#789DD1",
            fontSize: "24px",
            lineHeight: "31px",
            letterSpacing: "0em",
          },
          "&:hover, &:focus": {
            backgroundColor: "transparent",
            color: "#324EBD",
            fontSize: "24px",
            lineHeight: "31px",
            letterSpacing: "0em",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#030C0D",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: "0.005em",
          "&.Mui-disabled": {
            color: "#AAA",
          },
          "&.Mui-selected": {
            backgroundColor: "transparent",
            border: "1px solid #AAA",
            color: "#030C0D",
            fontWeight: 400,
          },
          "&.Mui-selected:focus": {
            backgroundColor: "transparent",
            border: "1px solid #AAA",
            color: "#030C0D",
            fontWeight: 400,
          },
          "&:hover, &:focus": {
            backgroundColor: "#324EBD",
            color: "#FAF9FB",
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: "#AAAAAA",
          textTransform: "uppercase",
          fontFamily: "Onest",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20.4px",
          letterSpacing: 0.08,
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          "&>.MuiTextField-root": {
            minWidth: "150px",
            width: "150px",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxHeight: "none",
          ".MuiAutocomplete-option": {
            minHeight: "20px",
            padding: 0,
            "&.Mui-focused": {
              backgroundColor: "inherit",
              color: "#324EBD",
            },
            '&[aria-selected="true"]': {
              backgroundColor: "inherit",
              color: "#789DD1",
            },
            '&.Mui-focused[aria-selected="true"]': {
              backgroundColor: "inherit",
              color: "#789DD1",
            },
          },
        },
        option: {
          fontFamily: "Onest",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20.4px",
          letterSpacing: 0.08,
        },
        hasPopupIcon: {
          "&.MuiAutocomplete-hasClearIcon": {
            "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
              paddingRight: 0,
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "input:-webkit-autofill": {
            WebkitBackgroundClip: "text !important",
          },
          "&.MuiOutlinedInput-root": {
            paddingRight: 0,
            "&.Mui-focused": {
              "&.MuiOutlinedInput-notchedOutline": {
                border: "1px solid #FFF",
              },
            },
          },
        },
        input: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
        input: {},
        notchedOutline: {
          borderWidth: "1px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: "16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          maxHeight: "232px",
        },
      },
    },
  },
});

export default theme;
