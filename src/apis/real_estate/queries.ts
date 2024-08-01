import { useQuery } from "@tanstack/react-query";
import { getCompanyRealEstates, getRealEstateById, getRealEstateList } from ".";

const useGetRealEstateListQuery = (country: string) =>
  useQuery({
    queryKey: ["get-realestate-list"],
    queryFn: () => getRealEstateList(country),
  });

const useGetRealEstateByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-real-estate-by-id"],
    queryFn: () => getRealEstateById(id),
    enabled: !!id,
  });

const useGetCompanyRealEstatesQuery = (
  id: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-company-real-estate", id],
    queryFn: () => getCompanyRealEstates(id),
    enabled: enabled,
  });

export {
  useGetRealEstateListQuery,
  useGetRealEstateByIdQuery,
  useGetCompanyRealEstatesQuery,
};
