import dayjs from "dayjs";

export const formatDate = (date: string): string => {
  return dayjs(date).format("DD MMM YYYY");
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format("DD MMM YYYY, hh:mm A");
};
