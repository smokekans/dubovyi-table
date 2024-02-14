import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMaterials } from "redux/enums/enumsSlice";
import { BASE_URL, GET_MATERIAL_BY_ID } from "utils/constants/url";

async function loadCategoryInfo(materialId, dispatch) {
  try {
    const response = await axios.get(
      BASE_URL + GET_MATERIAL_BY_ID + `?id=${materialId}`
    );
    const data = response.data;
    dispatch(setMaterials(data));
    return data.name;
  } catch (error) {
    console.error(error);
  }
}

function useGetMaterial(materialId) {
  const { EMaterials } = useSelector((store) => store.enums);
  const dispatch = useDispatch();

  let material = EMaterials.find((material) => material.id === materialId);

  if (material === undefined) {
    return loadCategoryInfo(materialId, dispatch);
  }

  return material.name;
}

export default useGetMaterial;
