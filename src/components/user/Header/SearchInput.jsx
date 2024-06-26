import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput() {
  return (
    <TextField
      variant="standard"
      placeholder="Пошук"
      sx={{
        maxWidth: "402px",
        width: "100%",
        borderBottom: "1px solid black",
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "1px solid #000",
        },
        "& .MuiOutlinedInput-root, .MuiInputBase-root": {
          paddingLeft: "24px",
          "&:before": { borderBottom: "1px solid black" },
          "&:after": { borderBottom: "1px solid black" },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              color: (theme) => theme.palette.common.black,
              marginRight: "4px",
            }}
          >
            <SearchIcon sx={{ height: "24px", width: "24px" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchInput;
