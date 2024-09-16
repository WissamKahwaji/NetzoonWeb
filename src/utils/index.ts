/* eslint-disable @typescript-eslint/no-explicit-any */
export const createFormData = (data: object): FormData => {
  const formData = new FormData();

  const appendToFormData = (obj: any, parentKey?: string): void => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item instanceof File) {
            formData.append(formKey, item);
          } else {
            // appendToFormData(item, `${formKey}[${index}]`);
            formData.append(formKey, item);
          }
        });
      } else if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        appendToFormData(value, formKey);
      } else if (value instanceof File) {
        formData.append(formKey, value);
      } else {
        formData.append(formKey, value);
      }
    });
  };

  appendToFormData(data);

  return formData;
};

export const getCurrencyFromCountry = (country: string) => {
  switch (country) {
    case "AE":
      return "AED";
    case "EG":
      return "EGP";
    case "JO":
      return "JOD";
    case "IQ":
      return "IQD";
    case "SA":
      return "SAR";
    default:
      return "$";
  }
};

export const formatDateWithoutTime = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Get the user's local time zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert UTC to user's local time zone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);

  // Extract formatted date parts
  const year = parts.find(part => part.type === "year")?.value;
  const month = parts.find(part => part.type === "month")?.value;
  const day = parts.find(part => part.type === "day")?.value;
  const hour = parts.find(part => part.type === "hour")?.value;
  const minute = parts.find(part => part.type === "minute")?.value;
  const ampm = parts.find(part => part.type === "dayPeriod")?.value;

  return `${year}-${month}-${day} ${hour}:${minute} ${ampm}`;
};

export const calculateRemainingDays = (endDateStr: string): number => {
  const endDate: Date = new Date(endDateStr);
  const now: Date = new Date();

  const remainingDays: number = Math.ceil(
    (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return remainingDays;
};

export const calculateAddFees = (
  startDate: string,
  endDate: string,
  fee: number
): number => {
  // Convert the date strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in time
  const differenceInTime = end.getTime() - start.getTime();

  // Calculate the difference in days
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  // Calculate the addFees
  const addFees = differenceInDays * fee;

  return addFees;
};

export const roundToHalf = (num: number): number => {
  return Math.round(num * 2) / 2;
};

export const formatMobileNumber = (mobile: string | undefined): string => {
  return mobile ? mobile.replace(/\s+/g, "").replace(/\+/g, "") : "97148707700";
};
