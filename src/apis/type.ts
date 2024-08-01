export type GenericResponse<Data> = {
  message: string;
  data?: Data;
};

export type ErrorMessage = {
  response: {
    data: {
      message: string;
    };
  };
};
