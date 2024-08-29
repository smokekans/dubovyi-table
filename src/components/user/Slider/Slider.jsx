import React, { useState, useEffect } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { slides } from "utils/constans";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery(`(max-width:834px)`);
  const isTablet = useMediaQuery(`(max-width:1279px)`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        // paddingX: isTablet ? 0 : "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          transition: "transform 1s ease-in-out",
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              minWidth: "100%",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                maxWidth: isMobile ? "480px" : "100%",
                height: isMobile ? "180px" : "385px",
                maxHeight: isMobile ? "232px" : "385px",
                objectFit: "fill",
                mt: isMobile ? "132px" : "145px",
              }}
              src={slide.imageUrl}
              alt={slide.title}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: isMobile ? "26px" : isTablet ? "26px" : "24px",
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
