import { Card, CardHeader, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import table from "../../../img/table.png";

function CategoryCard({ item }) {
  return (
    <Link to="#" style={{ textDecoration: "none" }}>
      <Card
        variant="outlined"
        sx={{
          width: "409px",
          maxHeight: "380px",
          borderRadius: 0,
          border: "none",
          "&:hover": {
            cursor: "pointer",
            "& .MuiCardMedia-root": { opacity: 0.5 },
            "& .MuiTypography-root": { color: "#7D862A" },
          },
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Ruda",
                fontSize: "24px",
                transition: "color 0.3s ease-in-out",
              }}
            >
              {item}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="335px"
          image={table}
          alt="Paella dish"
          sx={{ transition: "width 0.3s ease-in-out" }}
        />
      </Card>
    </Link>
  );
}

export default CategoryCard;
