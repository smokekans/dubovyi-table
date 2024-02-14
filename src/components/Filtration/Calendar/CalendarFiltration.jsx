import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import * as xDatePickers from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styles } from "./CalendarFiltration.styles";

export default function CalendarFiltration({ formik }) {
  const today = dayjs();
  const firstDayOfYear = dayjs().startOf("year");

  const [startDate, setStartDate] = React.useState(firstDayOfYear);
  const [endDate, setEndDate] = React.useState(today);

  React.useEffect(() => {
    formik.setFieldValue("startDate", startDate.format("DD.MM.YYYY"));
    formik.setFieldValue("endDate", endDate.format("DD.MM.YYYY"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);
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
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          format="DD.MM.YYYY"
          disableFuture
          views={["year", "month", "day"]}
          minDate={firstDayOfYear}
          slots={{ openPickerIcon: CalendarTodayIcon }}
          sx={styles.datePicker}
        />
        <xDatePickers.DatePicker
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          format="DD.MM.YYYY"
          views={["year", "month", "day"]}
          minDate={startDate}
          dayOfWeekFormatter={(_day, weekday) => `${weekday.format("dd")}`}
          slots={{ openPickerIcon: CalendarTodayIcon }}
          sx={styles.datePicker}
        />
      </xDatePickers.LocalizationProvider>
    </Box>
  );
}
