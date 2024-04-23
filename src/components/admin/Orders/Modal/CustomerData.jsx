import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Input,
  Tooltip,
} from "@mui/material";

const keyMessages = {
  firstName: "Ім’я Прізвище",
  phone: "телефон",
  email: "E-Mail",
  comment: "Коментар",
};
const desiredOrder = ["firstName", "phone", "email", "comment"];

function CustomerData({ formik, isEdit }) {
  const { values, handleChange } = formik;
  const userName = `${values.firstName} ${values.secondName}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "25px",
        background: "#FAF9FB",
        // gap: "24px",
        width: "503px",
        padding: "16px 24px 24px 24px",
      }}
    >
      <Typography variant="h4">Дані клієнта</Typography>
      <Divider
        orientation="horizontal"
        sx={{
          borderColor: "#324EBD",
          borderWidth: "1px",
          width: "100%",
          mt: "8px",
        }}
      />
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          mt: "24px",
          padding: 0,
        }}
      >
        {desiredOrder.map((key) => (
          <ListItem
            key={key}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 0,
              position: "relative",
            }}
          >
            <ListItemText
              primary={keyMessages[key]}
              sx={{
                flex: "none",
                margin: 0,
                "& > span": {
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "1.3px",
                  lineHeight: "normal",
                  textTransform: "uppercase",
                },
              }}
            ></ListItemText>
            <ListItemText
              sx={{
                borderBottom: "1px dashed #324EBD",
                alignSelf: "end",
              }}
            />
            {values[key].length > 100 ? (
              <>
                <Input
                  label="No Wrap Input"
                  disableUnderline={true}
                  maxRows={key === "comment" ? 3 : 2}
                  multiline
                  readOnly={!isEdit}
                  name={key}
                  value={key === "firstName" ? userName : values[key]}
                  onChange={handleChange}
                  sx={{
                    maxWidth: "300px",
                    width: !isEdit
                      ? `${values[key].length * 10}px`
                      : `${values[key].length * 10 + 18}px`,
                    borderRadius: !isEdit ? "0px" : "5px",
                    border: !isEdit ? "none" : "1px solid #AAA",
                    padding: !isEdit ? "0px" : "8px",
                    paddingRight: !isEdit ? "8px" : "8px",
                    "& .MuiOutlinedInput-root, .MuiInputBase-root": {
                      padding: "0px",
                    },
                    "& .MuiInputBase-input": {
                      padding: "0px",
                      overflowY: isEdit ? "scroll" : "hidden",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#D9D9D9",
                        borderRadius: 1,
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#AAA",
                        cursor: "pointer",
                      },
                    },
                  }}
                />
                {!isEdit ? (
                  <Tooltip title={values[key]} arrow>
                    <Box
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        fontWeight: "bold",
                        fontSize: "20px",
                        margin: "2px",
                        marginBottom: !isEdit ? "0px" : "8px",
                        color: "#AAA",
                        cursor: "pointer",
                      }}
                    >
                      ...
                    </Box>
                  </Tooltip>
                ) : null}
              </>
            ) : (
              <Input
                label="No Wrap Input"
                disableUnderline={true}
                maxRows={key === "comment" ? 3 : 2}
                multiline
                readOnly={!isEdit}
                name={key}
                value={key === "firstName" ? userName : values[key]}
                onChange={handleChange}
                sx={{
                  maxWidth: "300px",
                  width: !isEdit
                    ? `${values[key].length * 10}px`
                    : `${values[key].length * 10 + 18}px`,
                  borderRadius: !isEdit ? "0px" : "5px",
                  border: !isEdit ? "none" : "1px solid #AAA",
                  padding: !isEdit ? "0px" : "8px",
                  "& .MuiOutlinedInput-root, .MuiInputBase-root": {
                    padding: "0px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "0px",
                    textAlign: "right",
                  },
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CustomerData;
