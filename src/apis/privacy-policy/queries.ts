import { useQuery } from "@tanstack/react-query";
import { getPrivacyInfo } from ".";

const useGetPrivacyInfoQuery = () =>
  useQuery({
    queryKey: ["get-privacy-info"],
    queryFn: () => getPrivacyInfo(),
  });

export { useGetPrivacyInfoQuery };
