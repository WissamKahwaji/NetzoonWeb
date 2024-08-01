import { useQuery } from "@tanstack/react-query";
import { getCompanyDeliveryServices } from ".";

const useGetCompanyDeliveryServicesQuery = (
  id: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-company-delivery-services", id],
    queryFn: () => getCompanyDeliveryServices(id),
    enabled: enabled,
  });

export { useGetCompanyDeliveryServicesQuery };
