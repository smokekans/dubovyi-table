import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <ThreeDots
      height="280"
      width="280"
      radius="10"
      color="#324EBD"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      wrapperClassName=""
      visible={true}
    />
  );
}
