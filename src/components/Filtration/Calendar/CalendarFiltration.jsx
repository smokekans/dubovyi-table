import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import * as xDatePickers from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styles } from "./CalendarFiltration.styles";

export default function CalendarFiltration({ formik }) {
  const firstDayOfYear = dayjs("2023-01-01");
  const { values, setFieldValue } = formik;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Typography variant="h4">Вибірка товарів доданих в період</Typography>
      <xDatePickers.LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="uk"
        localeText={
          xDatePickers.ukUA.components.MuiLocalizationProvider.defaultProps
            .localeText
        }
      >
        <xDatePickers.DatePicker
          value={dayjs(values.startDate, "DD.MM.YYYY")}
          onChange={(newValue) =>
            setFieldValue("startDate", newValue.format("DD.MM.YYYY"))
          }
          format="DD.MM.YYYY"
          disableFuture
          views={["year", "month", "day"]}
          minDate={firstDayOfYear}
          dayOfWeekFormatter={(_day, weekday) => `${weekday.format("dd")}`}
          slots={{ openPickerIcon: CalendarTodayIcon }}
          sx={styles.datePicker}
        />
        <Divider
          orientation="horizontal"
          sx={{
            width: "16px",
            borderColor: (theme) => theme.palette.common.black,
          }}
        />
        <xDatePickers.DatePicker
          value={dayjs(values.endDate, "DD.MM.YYYY")}
          onChange={(newValue) =>
            setFieldValue("endDate", newValue.format("DD.MM.YYYY"))
          }
          format="DD.MM.YYYY"
          views={["year", "month", "day"]}
          disableFuture
          minDate={dayjs(values.startDate, "DD.MM.YYYY")}
          dayOfWeekFormatter={(_day, weekday) => `${weekday.format("dd")}`}
          slots={{ openPickerIcon: CalendarTodayIcon }}
          sx={styles.datePicker}
        />
      </xDatePickers.LocalizationProvider>
    </Box>
  );
}
