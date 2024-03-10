import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "redux/enums/enumsSlice";
import { BASE_URL, GET_ALL_COLORS } from "utils/url";

async function loadColorInfo(colorId, dispatch) {
  try {
    const response = await axios.get(
      BASE_URL + GET_ALL_COLORS + `?id=${colorId}`
    );
    const data = response.data;
    dispatch(setColors(data));
    return data.name;
  } catch (error) {
    console.error(error);
  }
}

function useGetColor(colorId) {
  const { EColors } = useSelector((store) => store.enums);
  const dispatch = useDispatch();

  let color = EColors.find((color) => color.id === colorId);

  if (color === undefined) {
    return loadColorInfo(colorId, dispatch);
  }

  return color.name;
}

export default useGetColor;
