export const styles = {
  formControl: {
    width: "127px",
    height: "36px",
    ".MuiInputBase-root .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":
      {
        borderColor: (theme) => theme.palette.common.black,
        borderRadius: 5,
      },
    "&.MuiFormControl-root .MuiTextField-root": {
      flexDirection: "column",
    },
    ".MuiFormHelperText-root": {
      ml: 0,
      lineHeight: 1,
      width: "127px",
      height: "50px",
    },
  },
  textField: {
    padding: 0,
    "& .MuiOutlinedInput-root, .MuiInputBase-root": {
      padding: 0,
      "&.Mui-focused fieldset": {
        borderColor: (theme) => theme.palette.common.black,
        borderWidth: "1px",
        padding: 0,
      },
    },
    ".MuiOutlinedInput-root .MuiInputBase-input ": {
      py: 1,
      pr: 2,
    },
  },
  inputLabel: {
    color: (theme) => theme.palette.primary.main,
    transform: "none",
    textTransform: "uppercase",
  },
  inputAdornment: {
    padding: 0,
    ml: 2,
    mr: 1,
    color: (theme) => theme.palette.common.black,
  },
};
