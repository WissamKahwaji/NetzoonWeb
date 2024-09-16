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
  longitude?: number;
  latitude?: number;
}

export type CalculateDeliveryRateResponseModel = {
  HasErrors: boolean;
  TotalAmount: {
    CurrencyCode: string;
    Value: number;
  };
};

export type CreatePickupInputModel = {
  pickupAddress: PartyAddressModel;
  pickupContact: PickupContactModel;
  pickupLocation: string;
  pickupDate: string;
  readyTime: string;
  lastPickupTime: string;
  closingTime: string;
  pickupItems: {
    shipmentWeight: {
      value: number;
    };
    numberOfPieces: number;
  };
};

export type CreatePickupWithShipmentInputModel = {
  pickupAddress: PartyAddressModel;
  pickupContact: PickupContactModel;
  pickupLocation: string;
  pickupDate: string;
  readyTime: string;
  lastPickupTime: string;
  closingTime: string;
  pickupItems: {
    shipmentWeight: {
      value: number;
    };
    numberOfPieces: number;
  };
  shipper: {
    partyAddress: PartyAddressModel;
    contact: PickupContactModel;
  };
  consignee: {
    partyAddress: PartyAddressModel;
    contact: PickupContactModel;
  };
  shippingDateTime: string;
  dueDate: string;
  Items: ItemsModel[];
};

export type PickupContactModel = {
  personName: string;
  title: string;
  companyName: string;
  phoneNumber1: string;
  cellPhone: string;
  department?: string;
  emailAddress?: string;
};

export type CreatePickupResponseModel = {
  HasErrors: boolean;
  ProcessedPickup: {
    ID: string;
    GUID: string;
  };
};

export type ItemsModel = {
  PackageType: string;
  Quantity: number;
  Weight: {
    Unit: string;
    Value: number;
  };
  Comments: string;
  Reference: string;

  CommodityCode: number;
  GoodsDescription: string;
  CountryOfOrigin: string;
  CustomsValue: {
    CurrencyCode: string;
    Value: number;
  };
};
