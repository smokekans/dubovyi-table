import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrderStatus } from "redux/enums/enumsSlice";
import { BASE_URL, GET_CATEGORY_BY_ID } from "utils/url";

async function loadStatusInfo(statusId, dispatch) {
  try {
    const response = await axios.get(
      BASE_URL + GET_CATEGORY_BY_ID + `?id=${statusId}`
    );
    const data = response.data;
    dispatch(setOrderStatus(data));
    return data.name;
  } catch (error) {
    console.error(error);
  }
}

function useGetOrderStatus(statusId) {
  const { EOrderStatus } = useSelector((store) => store.enums);
  const dispatch = useDispatch();

  let status = EOrderStatus.find((status) => status.id === statusId);

  if (status === undefined) {
    return loadStatusInfo(statusId, dispatch);
  }

  return status.name;
}

export default useGetOrderStatus;
