import { UserModel } from "@/models/user";
import { DependencyList, useEffect, useMemo, useState } from "react";

export default function usePagination(list: UserModel[] = [], extraDeps: DependencyList = []) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(0);
  }, [list]);

  const pageProps = useMemo(() => {
    const updatedList = [...list];
    const startIndex = currentPage * pageSize;
    const endIndex = Math.min((currentPage + 1) * pageSize, list.length);

    return {
      currentList: updatedList.slice(startIndex, endIndex),
      startIndex,
      endIndex,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, list, ...extraDeps]);

  return {
    ...pageProps,
    totalPages: Math.ceil(list.length / pageSize),
    currentPage,
    setCurrentPage,
  };
}
