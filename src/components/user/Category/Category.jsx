import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";

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
  return (
    <>
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
          sx={{ fontFamily: "Ruda", fontSize: "48px", marginTop: "100px" }}
        >
          Категорії
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
        rowSpacing={4}
        columnSpacing={2}
        columns={{ xs: 12, sm: 6, md: 4 }}
        sx={{ marginTop: "32px" }}
      >
        {category.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CategoryCard item={item} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          margin: "0 auto",
          marginTop: "96px",
          width: "714px",
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
            sx={{ fontFamily: "Ruda", fontSize: "48px" }}
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
          sx={{ fontFamily: "Ruda", textAlign: "center", marginTop: "24px" }}
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
    </>
  );
}

export default Category;
