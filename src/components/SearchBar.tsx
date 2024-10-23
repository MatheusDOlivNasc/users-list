"use client";

import { tv } from "tailwind-variants";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const searchBarStyle = tv({
  base: "border-2 border-black w-full sm:w-1/3 px-2 py-1",
});

type Props = {
  onSearchTextChange: (searchText: string) => void;
};

export default function SearchBar({ onSearchTextChange }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);
  const ref = useRef<HTMLInputElement>(null);
  const searchText = searchParams.get("search");

  useEffect(() => {
    if (ref.current) ref.current.value = searchText || "";
    onSearchTextChange(String(searchText || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    const newSearchText = event?.target?.value || "";
    params.set("search", newSearchText);
    router.replace(pathname + `?${params.toString()}`);
  }
  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    const newSearchText = event?.target?.value || "";
    onSearchTextChange(newSearchText);
  }

  return (
    <input
      ref={ref}
      type="text"
      placeholder="Filter by user name"
      className={searchBarStyle()}
      onChange={handleSetValue}
      onBlur={handleSubmit}
    />
  );
}
