import { Box } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <ThreeDots
        height="280"
        width="280"
        radius="10"
        color="#324EBD"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Box>
  );
}
