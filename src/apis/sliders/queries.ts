import { useQuery } from "@tanstack/react-query";
import { getSliderInfo } from ".";

const useGetSliderInfoQuery = () =>
  useQuery({
    queryKey: ["get-sliders"],
    queryFn: () => getSliderInfo(),
  });

export { useGetSliderInfoQuery };
