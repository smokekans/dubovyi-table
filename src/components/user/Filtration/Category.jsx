import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, GET_ALL_CATEGORIES } from "utils/url";
import table from "../../../img/filtration/table.svg";
import stool from "../../../img/filtration/stool.svg";
import stool2 from "../../../img/filtration/stool2.svg";
import bed from "../../../img/filtration/bed.svg";
import someElse from "../../../img/filtration/someElse.svg";
import wardrobe from "../../../img/filtration/wardrobe.svg";
import sofa from "../../../img/filtration/sofa.svg";
import nightstand from "../../../img/filtration/nightstand.svg";
import table2 from "../../../img/filtration/table2.svg";

const categoryList = [
  { name: "Столи", img: table },
  { name: "Стільці", img: stool },
  { name: "Ліжка", img: bed },
  { name: "Інше", img: someElse },
  { name: "Шафи", img: wardrobe },
  { name: "Дивани", img: sofa },
  { name: "Тумбочки", img: nightstand },
  { name: "Столики", img: table2 },
  { name: "Табуретки", img: stool2 },
];

function Category() {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadCategoryInfo = async () => {
      try {
        const response = await axios.get(BASE_URL + GET_ALL_CATEGORIES);
        const data = response.data;
        setCategory(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategoryInfo();
  }, []);

  const displayedCategory = category.slice(0, 8);
  const otherCategories = category.slice(9);

  const handleClick = () => {
    setOpen(!open);
  };

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
        Категорія
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: 0,
        }}
      >
        {displayedCategory.map((item) => {
          const categoryItem = categoryList.find(
            (category) => category.name === item.name
          );
          return (
            <ListItem
              key={item.id}
              sx={{
                padding: 0,
                gap: "8px",
                "&:hover": {
                  color: "#2B9E7F",
                  cursor: "pointer",
                  "& .MuiListItemIcon-root img": {
                    filter:
                      "invert(37%) sepia(67%) saturate(4043%) hue-rotate(132deg) brightness(88%) contrast(94%)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ width: "40px", height: "40px" }}>
                {categoryItem && (
                  <img
                    src={categoryItem.img}
                    alt={item.name}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}

        <ListItem
          onClick={handleClick}
          sx={{
            padding: 0,
            gap: "8px",
            "&:hover": {
              color: "#2B9E7F",
              cursor: "pointer",
              "& .MuiListItemIcon-root img": {
                filter:
                  "invert(37%) sepia(67%) saturate(4043%) hue-rotate(132deg) brightness(88%) contrast(94%)",
              },
            },
          }}
        >
          <ListItemIcon sx={{ width: "40px", height: "40px" }}>
            <img
              src={someElse}
              alt="Інше"
              style={{ width: "100%", height: "100%" }}
            />
          </ListItemIcon>
          <ListItemText primary="Інше" />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {otherCategories.map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  sx={{
                    padding: "8px 0 8px 50px",
                    gap: "8px",
                    "&:hover": {
                      color: "#2B9E7F",
                      cursor: "pointer",
                    },

                    "&:before": {
                      content: '""',
                      position: "absolute",
                      left: "30px",
                      top: 0,
                      bottom: index === otherCategories.length - 1 ? "30%" : 0,
                      width: "2px",
                      backgroundColor: "#D2D0CF",
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: "30px",
                      top: "70%",
                      width: "10px",
                      height: "2px",
                      backgroundColor: "#D2D0CF",
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default Category;
