export const FormatFilterText = (
  value: { text: any; hasValue: boolean }[]
) => {
  const arr = value.filter(item => item.hasValue).map(item => item.text);
  return arr?.length > 0 ? arr.reduce((prev, curr) => [prev, ', ', curr]) : 'Bộ lọc khác'
};
