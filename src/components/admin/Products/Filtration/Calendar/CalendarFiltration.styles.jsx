export const styles = {
  datePicker: {
    width: "150px",
    py: 1,
    px: 2,
    "&.MuiInputBase-root .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: (theme) => `1px solid ${theme.palette.common.black}`,
        py: 1,
        px: 2,
      },
    ".css-6rw2jl-MuiInputBase-input-MuiOutlinedInput-input": {
      py: 1,

      pl: 2,
    },
    ".MuiIconButton-edgeEnd": {
      color: "black",
      width: "24px",
      height: "24px",
      p: 0,
      mr: 0,
    },
    "& .css-dare5k-MuiInputBase-input-MuiOutlinedInput-input": {
      p: "8px 16px",
    },
    ".css-1sq2y91-MuiInputAdornment-root": {
      ml: 0,
    },
    ".MuiOutlinedInput-notchedOutline": {
      border: (theme) => `1px solid ${theme.palette.common.black}`,
      "&.Mui-focused": {
        border: (theme) => `1px solid ${theme.palette.common.black}`,
      },
    },
    ".css-1p3fsy2-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: (theme) => `1px solid ${theme.palette.common.black}`,
      },
  },
};
