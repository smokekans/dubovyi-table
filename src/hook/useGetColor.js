import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "redux/enums/enumsSlice";
import { BASE_URL } from "utils/constants/Url";

function useGetColor(colorId) {
  const { EColors } = useSelector((store) => store.enums);
  const dispatch = useDispatch();
  debugger;
  let color = EColors.find((color) => color.id === colorId);

  if (color === undefined) {
    const loadColorInfo = async () => {
      const response = await axios.get(
        BASE_URL + `/colors/findById?id=${colorId}`
      );
      const data = await response.data;
      dispatch(getColors({ type: "COLOR_INFO_LOADED", payload: data }));

      return data.name;
    };
    color = loadColorInfo();
  }
  console.log("====================================");
  console.log(color);
  console.log("====================================");
  return color;
}

export default useGetColor;
