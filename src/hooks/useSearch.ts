import { useMemo, useState } from "react";

export default function useSearch<T>(list: T[], searchByKey?: keyof T) {
  const [searchText, setSearchText] = useState("");

  const filteredList = useMemo(() => {
    if (!searchText) return list;

    return list?.filter((item) => {
      const baseText = searchByKey ? item?.[searchByKey] : JSON.stringify(item);

      return baseText
        ?.toString()
        .toLocaleLowerCase()
        .includes(searchText?.toLocaleLowerCase());
    });
  }, [searchText, list, searchByKey]);

  return {
    filteredList,
    searchText,
    setSearchText,
  };
}
