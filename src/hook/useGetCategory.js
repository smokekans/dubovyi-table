import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "redux/enums/enumsSlice";
import { BASE_URL, CATEGORY_BY_ID } from "utils/url";

async function loadCategoryInfo(categoryId, dispatch) {
  try {
    const response = await axios.get(
      BASE_URL + CATEGORY_BY_ID + `?id=${categoryId}`
    );
    const data = response.data;
    dispatch(setCategories(data));
    return data.name;
  } catch (error) {
    console.error(error);
  }
}

function useGetCategory(categoryId) {
  const { ECategories } = useSelector((store) => store.enums);
  const dispatch = useDispatch();

  let category = ECategories.find((category) => category.id === categoryId);

  if (category === undefined) {
    return loadCategoryInfo(categoryId, dispatch);
  }

  return category.name;
}

export default useGetCategory;
