export const getDisplayValue = <T extends { id: string; name: string }>(
  items: T[],
  selected: string,
  placeholder = "Choose from Drop-down",
): string => {
  return items.find((item) => item.id === selected)?.name ?? placeholder;
};
