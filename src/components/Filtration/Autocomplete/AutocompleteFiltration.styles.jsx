export const styles = {
  formControl: {
    height: "69px",
    ".MuiInputBase-root .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":
      {
        borderColor: (theme) => theme.palette.common.black,
        borderRadius: 5,
      },
  },
  textField: {
    mt: "37px",
    "& .MuiOutlinedInput-root, .MuiInputBase-root": {
      p: 0,
      "&.Mui-focused fieldset": {
        borderColor: (theme) => theme.palette.common.black,
        borderWidth: "1px",
      },
    },
    ".MuiOutlinedInput-root .MuiAutocomplete-input": {
      padding: "8px 16px",
    },
  },
  inputLabel: {
    color: (theme) => theme.palette.primary.main,
    transform: "none",
    textTransform: "uppercase",
  },
  autocomplete: {
    height: "36px",
    ".MuiAutocomplete-popupIndicator, .MuiAutocomplete-popupIndicatorOpen, .MuiAutocomplete-clearIndicator":
      {
        color: (theme) => theme.palette.common.black,
      },
    ".MuiAutocomplete-endAdornment": {
      top: "auto",
    },
  },
};
