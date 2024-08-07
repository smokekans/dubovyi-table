import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import Attribute from "./Attribute";
import Price from "./Price";
import { BASE_URL, GET_ALL_COLORS, GET_ALL_MATERIALS } from "utils/url";
import axios from "axios";

function Filtration() {
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const loadMaterialsInfo = async () => {
      try {
        const response = await axios.get(BASE_URL + GET_ALL_MATERIALS);
        const data = response.data;
        setMaterials(data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadColorsInfo = async () => {
      try {
        const response = await axios.get(BASE_URL + GET_ALL_COLORS);
        const data = response.data;
        setColors(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMaterialsInfo();
    loadColorsInfo();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "333px",
        gap: "64px",
        marginTop: "100px",
      }}
    >
      <Category />
      <Price />
      <Attribute enums={materials} title={"Матеріали"} />
      <Attribute enums={colors} title={"Колір"} />
    </Box>
  );
}

export default Filtration;
