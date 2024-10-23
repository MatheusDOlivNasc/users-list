import { UserModel } from "@/models/user";
import { DependencyList, useEffect, useMemo, useState } from "react";

export default function usePagination(list: UserModel[] = [], extraDeps: DependencyList = []) {
  const [currentPage, setCurrentPage] = useState(0);
  const displayItemsList = [3, 6, 9, 12];
  const [ displayItems, setDisplayItems ] = useState(3)

  useEffect(() => {
    setCurrentPage(0);
  }, [list, displayItems]);

  const pageProps = useMemo(() => {
    const updatedList = [...list];
    const startIndex = currentPage * displayItems;
    const endIndex = Math.min((currentPage + 1) * displayItems, list.length);

    return {
      currentList: updatedList.slice(startIndex, endIndex),
      startIndex,
      endIndex,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, list, displayItems, ...extraDeps]);

  return {
    ...pageProps,
    totalPages: Math.ceil(list.length / displayItems),
    currentPage,
    setCurrentPage,

    displayItemsList,
    displayItems,
    setDisplayItems,
  };
}
