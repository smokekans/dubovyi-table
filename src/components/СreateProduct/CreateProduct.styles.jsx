export const styles = {
  formControl: {
    borderRadius: (theme) => theme.shape.borderRadius,
    height: "91px",
    ".css-gk4fn5-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused, .MuiOutlinedInput-notchedOutline":
      {
        borderColor: (theme) => theme.palette.common.black,
      },
  },
  formControlMultiline: {
    borderRadius: "50px",
  },
  inputLabel: { color: "black", transform: "none" },
  autocomplete: {
    ".MuiAutocomplete-popupIndicator, .MuiAutocomplete-popupIndicatorOpen, .MuiAutocomplete-clearIndicator":
      {
        color: (theme) => theme.palette.common.black,
      },
    ".MuiAutocomplete-endAdornment": {
      top: "auto",
    },
  },
  textField: {
    "& .MuiInputBase-input": {
      p: 2,
      height: "20px",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: (theme) => theme.palette.common.black,
        borderWidth: "1px",
      },
    },
    mt: "39px",
  },
  textFieldMultiline: {
    ".MuiInputBase-root": {
      p: 0,
    },
    ".MuiInputBase-input": {
      p: 2,
    },
    mt: "39px",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: (theme) => theme.palette.common.black,
        borderWidth: "1px",
      },
    },
  },
};
