import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import table from "../../../img/table.png";

function CategoryCard({ item }) {
  const isMobile = useMediaQuery(`(max-width:834px)`);
  const isTablet = useMediaQuery(`(max-width:1279px)`);

  return (
    <Link to="#" style={{ textDecoration: "none" }}>
      <Card
        variant="outlined"
        sx={{
          width: isMobile ? "100%" : isTablet ? "100%" : "449px",
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
          style={{ padding: "0px" }}
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
          sx={{
            transition: "width 0.3s ease-in-out",
            marginTop: "16px",
            objectPosition: "bottom",
            height: "335px",
          }}
        />
      </Card>
    </Link>
  );
}

export default CategoryCard;
