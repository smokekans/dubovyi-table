import React from "react";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "components/Filtration/Autocomplete/AutocompleteFiltration.styles";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export default function AutocompleteFiltration({ fields, formik, options }) {
  const { setFieldValue, values } = formik;
  const selectedOptionIds = values[fields.name] || [];

  return (
    <FormControl
      sx={{
        ...styles.formControl,
        width: fields.id === "colorId" ? "190px" : "144px",
      }}
    >
      <InputLabel htmlFor={fields.id} sx={styles.inputLabel}>
        <Typography variant="subtitle1">{fields.label}</Typography>
      </InputLabel>
      <Autocomplete
        disablePortal
        multiple
        id={fields.id}
        options={options}
        getOptionLabel={(option) => (option ? option.name : "")}
        value={options.filter((option) =>
          selectedOptionIds.includes(option.id)
        )}
        onChange={(event, newValue) => {
          const newIds = newValue.map((option) => option.id);
          setFieldValue(fields.name, newIds);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            margin="normal"
            id={fields.id}
            name={fields.name}
            focused
            placeholder={fields.placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <CheckBoxOutlineBlankOutlinedIcon sx={{ display: "none" }} />
                </>
              ),
            }}
            sx={styles.textField}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <ListItem {...props}>
            <Checkbox
              sx={{
                p: 0,
                mr: 1,
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              icon={
                <CheckBoxOutlineBlankOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: (theme) => theme.palette.common.black,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              }
              checked={selected}
            />
            {option.name}
          </ListItem>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Typography
              variant="body2"
              {...getTagProps({ index })}
              key={option.id}
              sx={{ display: "none" }}
            >
              {option.name}
            </Typography>
          ))
        }
        PaperComponent={({ children }) => (
          <Paper
            sx={{
              overflow: "auto",
              boxShadow: "none",
              mt: "16px",
              borderRadius: 0,
              width: fields.id === "colorId" ? "190px" : "144px",
              "& .MuiAutocomplete-listbox": {
                gap: "16px",
                p: 0,
              },
              "& .MuiAutocomplete-option": {
                height: "auto",
                p: 0,
                pr: 1,
                alignItems: "flex-start",
              },
            }}
          >
            {children}
          </Paper>
        )}
        sx={{
          ...styles.autocomplete,
          "& .MuiAutocomplete-popupIndicator": {
            display: "none",
          },
          "& .MuiAutocomplete-tag": {
            marginRight: "8px",
          },
        }}
        open
      />
    </FormControl>
  );
}
