import { Suggestion } from ".";

export const searchByName = (
  suggestions: Suggestion[],
  value: string | null
) => {
  const filteredItems = suggestions.filter(
    (item) => !value || item.name.toLowerCase().includes(value.toLowerCase())
  );

  return filteredItems;
};
