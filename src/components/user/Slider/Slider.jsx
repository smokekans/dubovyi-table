import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { slides } from "utils/constans";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log("hi");

  const handleSelectSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            display: currentSlide === index ? "block" : "none",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              maxHeight: "385px",
              objectFit: "cover",
              mt: "145px",
            }}
            src={slide.imageUrl}
            alt={slide.title}
          />
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "24px",
        }}
      >
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => handleSelectSlide(index)}
            sx={{
              minWidth: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: currentSlide === index ? "#176554" : "#8B8785",
              m: "0 5px",
              p: 0,
              "&:hover": {
                backgroundColor: "#2B9E7F",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slider;
