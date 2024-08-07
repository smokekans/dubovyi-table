import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

function Attribute({ enums, title }) {
  const [checked, setChecked] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedValues = showAll ? enums : enums.slice(0, 8);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "0px 16px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "left" }}>
        {title}
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: 0,
        }}
      >
        {displayedValues.map((value) => {
          return (
            <ListItem key={value} disablePadding sx={{ width: "fit-content" }}>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                sx={{
                  padding: 0,
                  color: "black",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#2B9E7F",
                    "& span": {
                      color: "#2B9E7F",
                      "&.Mui-checked": { color: "#2B9E7F" },
                    },
                  },
                  "& span": {
                    color: "black",
                    padding: "0 8px 0 0",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  },
                }}
              >
                <Checkbox
                  icon={<CheckBoxOutlineBlankOutlinedIcon />}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  sx={{
                    color: "black",
                  }}
                />
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Button
          onClick={handleShowAll}
          sx={{
            textTransform: "none",
            color: "black",
            minWidth: 0,
            width: "fit-content",
            padding: 0,
            "&:hover": { color: "#2B9E7F", background: "transparent" },
          }}
        >
          {showAll ? "...менше" : "...ще"}
        </Button>
      </List>
    </Box>
  );
}

export default Attribute;
