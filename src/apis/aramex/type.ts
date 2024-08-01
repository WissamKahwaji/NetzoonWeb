export type FetchCitiesResponseModel = {
  Cities: string[];
};

export type CalculateDeliveryRateInput = {
  originAddress: PartyAddressModel;
  destinationAddress: PartyAddressModel;
  actualWeightValue: number;
  numberOfPieces: number;
  preferredCurrencyCode: string;
};

interface PartyAddressModel {
  line1: string;
  line2?: string;
  line3?: string;
  city: string;
  stateOrProvinceCode?: string;
  postCode?: string;
  countryCode?: string;
  longitude: number;
  latitude?: number;
}

export type CalculateDeliveryRateResponseModel = {
  HasErrors: boolean;
  TotalAmount: {
    CurrencyCode: string;
    Value: number;
  };
};
