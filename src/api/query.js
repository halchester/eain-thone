import axios from "./index";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const getAllInstockItemsOfUser = async (props) => {
  const response = await axios.get(`/api/instock/${props.queryKey[2]}`, {
    headers: {
      Auth: props.queryKey[1],
    },
  });
  return response.data.data;
};
