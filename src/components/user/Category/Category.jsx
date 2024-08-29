import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const category = [
  "Столи",
  "Стільці",
  "Шафи",
  "Ліжка",
  "Тумбочки",
  "Столики",
  "Табуретки",
  "Дивани",
  "Інше",
];

function Category() {
  const isMobile = useMediaQuery(`(max-width:834px)`);
  const isTablet = useMediaQuery(`(min-width:835px) and (max-width:1279px)`);
  const isDesktop = useMediaQuery(`(min-width:1280px)`);

  return (
    <Box
      sx={{
        margin: "0 auto",
        paddingX: isMobile ? "16px" : "30px",
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          "&:hover": {
            cursor: "pointer",
            "& h2": { color: "#1C7F66" },
            "& .MuiDivider-root": { borderColor: "#1C7F66", width: "257px" },
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Ruda",
            fontSize: isMobile ? "32px" : "48px",
            marginTop: isMobile ? "72px" : isTablet ? "72px" : "100px",
          }}
        >
          <Link to="/assortment">Категорії</Link>
        </Typography>
        <Divider
          sx={{
            margin: "0 auto",
            width: "153px",
            border: "1px solid #145144",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </Box>

      <Grid
        container
        rowSpacing={2}
        // columnSpacing={{ xs: 2, sm: 2, md: 3 }}
        sx={{ marginTop: "16px", width: "100%", gap: "16px" }}
      >
        {category.map((item, index) => (
          <Grid
            item
            // xs={12}
            // sm={6}
            // md={4}
            key={index}
            sx={{
              ...(isTablet &&
                !isDesktop &&
                index === category.length - 1 && {
                  gridColumn: "span 12", // Последняя карточка на планшете занимает весь ряд
                }),
              flexGrow: 1,
            }}
          >
            <CategoryCard item={item} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          margin: "0 auto",
          marginTop: "96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            "&:hover": {
              cursor: "pointer",
              "& h2": { color: "#1C7F66" },
              "& .MuiDivider-root": { borderColor: "#1C7F66", width: "257px" },
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontFamily: "Ruda", fontSize: isMobile ? "32px" : "48px" }}
          >
            Ручна робота
          </Typography>
          <Divider
            sx={{
              margin: "0 auto",
              width: "153px",
              border: "1px solid #145144",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontFamily: "Ruda",
            textAlign: "center",
            marginTop: "24px",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          Наші дерев'яні меблі ручної роботи створені з міцних та натуральних
          матеріалів, що робить їх ідеальними для створення екологічно чистого
          та затишного середовища у вашому домі. Кожен предмет меблів
          виготовлений з урахуванням найвищих стандартів якості та дбайливого
          ставлення до довкілля. Використання природних матеріалів, ручна робота
          та відновлювані ресурси сприяють збереженню нашого середовища, а також
          надають кожному елементу неповторного характеру та унікальності.
          Оберіть наші дерев'яні меблі для свого дому та створіть простір, який
          не лише приваблює гостей, але й піклується про наше спільне майбутнє.
        </Typography>
      </Box>
    </Box>
  );
}

export default Category;
