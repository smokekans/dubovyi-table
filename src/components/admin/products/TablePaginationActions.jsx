import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, display: "flex", gap: "32px" }}>
      <IconButton
        onClick={() => {
          if (page > 0) {
            handleBackButtonClick();
          }
        }}
        aria-label="previous page"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          color: page === 0 ? "#AAA" : "#030C0D",
          backgroundColor: "transparent",
          width: "48px",
          height: "48px",
          borderRadius: "25px",
          border: page === 0 ? "1px solid  #AAA" : "1px solid  #030C0D",
          cursor: page === 0 ? "default" : "pointer",
          pointerEvents: page === 0 ? "none" : "auto",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {theme.direction === "rtl" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </IconButton>
      <IconButton
        onClick={() => {
          if (page < Math.ceil(count / rowsPerPage) - 1) {
            handleNextButtonClick();
          }
        }}
        aria-label="next page"
        sx={{
          color:
            page >= Math.ceil(count / rowsPerPage) - 1 ? "#AAA" : "#030C0D",
          width: "48px",
          height: "48px",
          borderRadius: "25px",
          border:
            page >= Math.ceil(count / rowsPerPage) - 1
              ? "1px solid  #AAA"
              : "1px solid  #030C0D",
          pointerEvents:
            page >= Math.ceil(count / rowsPerPage) - 1 ? "none" : "auto",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {theme.direction === "rtl" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      </IconButton>
    </Box>
  );
}

export default TablePaginationActions;
