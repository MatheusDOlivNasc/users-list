import { UserModel } from "@/models/user";
import { useMemo, useState } from "react";

interface Props {
  list: UserModel[];
}

export default function useSort({ list }: Props) {
  const [orderBy, setOrderBy] = useState<keyof UserModel | null>(null);
  const [orderDirection, setOrderDirection] = useState(false);

  const sortedList = useMemo(
    () =>
      orderBy == null
        ? list
        : list?.sort((a, b) => {
            const stRef = (orderDirection ? a : b)?.[orderBy];
            const ndRef = (orderDirection ? b : a)?.[orderBy];

            return typeof stRef == "number" && typeof ndRef == "number"
              ? stRef - ndRef
              : String(stRef)?.localeCompare(String(ndRef));
          }),
    [orderBy, list, orderDirection]
  );

  function handleSetOrderBy(key: keyof UserModel | null) {
    if (orderBy == key) setOrderDirection((prev) => !prev);
    else setOrderDirection(true);

    setOrderBy(key);
  }

  return {
    sortedList,
    orderDirection,
    orderBy,
    setOrderBy: handleSetOrderBy,
  };
}
