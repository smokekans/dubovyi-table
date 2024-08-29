import {
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchInput({ setNavMenuOpen }) {
  const isTablet = useMediaQuery(`(max-width:1280px)`);
  const isMobile = useMediaQuery(`(max-width:834px)`);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchToggle = () => {
    const newSearchOpenState = !isSearchOpen;
    setIsSearchOpen(newSearchOpenState);
    if (isTablet && setNavMenuOpen) {
      setNavMenuOpen(!newSearchOpenState);
    }
  };

  const handleClearSearch = () => {
    if (isTablet && setNavMenuOpen) {
      setIsSearchOpen(false);
      setNavMenuOpen(true);
    } else {
      setSearchText("");
    }
  };

  return (
    <>
      {isTablet && !isMobile ? (
        !isSearchOpen ? (
          <IconButton onClick={handleSearchToggle} sx={{ color: "black" }}>
            <SearchIcon sx={{ height: "24px", width: "24px" }} />
          </IconButton>
        ) : (
          <TextField
            variant="standard"
            placeholder="Пошук"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              maxWidth: "402px",
              width: "300px",
              borderBottom: "1px solid black",
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "1px солид #000",
              },
              "& .MuiOutlinedInput-root, .MuiInputBase-root": {
                paddingLeft: "24px",
                "&:before": { borderBottom: "1px солид black" },
                "&:after": { borderBottom: "1px солид black" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ height: "24px", width: "24px", color: "black" }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearSearch}
                    sx={{ color: "black" }}
                  >
                    <CloseIcon sx={{ height: "24px", width: "24px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )
      ) : (
        <TextField
          variant="standard"
          placeholder="Пошук"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            maxWidth: "402px",
            width: "100%",
            borderBottom: "1px solid black",
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "1px солид #000",
            },
            "& .MuiOutlinedInput-root, .MuiInputBase-root": {
              paddingLeft: "24px",
              "&:before": { borderBottom: "1px солид black" },
              "&:after": { borderBottom: "1px солид black" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ height: "24px", width: "24px", color: "black" }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} sx={{ color: "black" }}>
                  <CloseIcon sx={{ height: "24px", width: "24px" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </>
  );
}

export default SearchInput;
