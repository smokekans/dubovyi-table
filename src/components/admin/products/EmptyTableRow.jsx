import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

function EmptyTableRow() {
  return (
    <TableRow>
      <TableCell colSpan={6} component="th" scope="row" padding="none">
        <Typography variant="h3" sx={{ marginTop: "24px" }}>
          За даним запитом відсутні товари.
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default EmptyTableRow;
