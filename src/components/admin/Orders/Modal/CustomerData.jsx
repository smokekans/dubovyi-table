import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const keyMessages = {
  firstName: "Ім’я Прізвище",
  phone: "телефон",
  email: "E-Mail",
  comment: "Коментар",
};
const desiredOrder = ["firstName", "phone", "email", "comment"];

function CustomerData({ formik }) {
  const userName = `${formik.values.firstName} ${formik.values.secondName}`;

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
        {desiredOrder.map((key) => {
          if (keyMessages[key] && formik.values[key]) {
            return (
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 0,
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
                <ListItemText
                  primary={key === "firstName" ? userName : formik.values[key]}
                  sx={{
                    flex: "none",
                  }}
                />
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </Box>
  );
}

export default CustomerData;
