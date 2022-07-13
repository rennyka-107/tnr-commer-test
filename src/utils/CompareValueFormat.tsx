import { IconTimes } from "@components/Icons";

export const CompareValueFormat = (value: any, key: string) => {
  if (!value) return <IconTimes style={{ width: 22.5 }} />;
  if (typeof value === "number") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return value;
};
