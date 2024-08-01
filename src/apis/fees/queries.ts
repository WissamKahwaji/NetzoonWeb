import { useQuery } from "@tanstack/react-query";
import { getFeesInfo } from ".";

const useGetFeesInfoQuery = () =>
  useQuery({
    queryKey: ["get-fees"],
    queryFn: () => getFeesInfo(),
  });

export { useGetFeesInfoQuery };
