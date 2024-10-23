"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import useUsersList from "@/hooks/useUsersList";
import { UserModel } from "@/models/user";
import { tv } from "tailwind-variants";
import useSort from "@/hooks/useSort";
import { LuArrowUpDown } from "react-icons/lu";
import { HiMiniArrowLongDown, HiMiniArrowLongUp } from "react-icons/hi2";
import usePagination from "@/hooks/usePagination";
import Paginator from "@/components/Paginator";
import useSearch from "@/hooks/useSearch";
import Link from "next/link";

const homeStyle = tv({
  slots: {
    base: "w-full p-2",
    highbar: "sm:space-x-2 space-y-1",

    searchText: "p-2 ",

    screenTable: "w-aull overflow-auto",
    table: "table-auto w-full mt-2",
    tableCol: "min-w-32",
    tableTitle: "text-sm",
    tableTitleButton: "text-left flex flex-row space-x-2 items-center px-0.5",
    tableTitleButtonText: "capitalize",
    tableTitleButtonIcon: " ",
    tableTitleButtonIconOff: "opacity-20 ",
    tableData: "underline underline-offset-2",

    usersNotFound: "my-1 text-sm",

    error: "bg-red-500 text-white mt-2 px-2 py-1",
  },
});

export default function Home() {
  const {
    list: defaultList,
    isLoading,
    handleStartFetch,

    isFetchStated,
    error,
  } = useUsersList();

  const {
    filteredList: list,
    searchText,
    setSearchText,
  } = useSearch(defaultList, "name");

  const { sortedList, setOrderBy, orderBy, orderDirection } = useSort(list);

  const {
    currentList: users,
    totalPages,
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
  } = usePagination(sortedList, [orderBy, orderDirection]);

  const titlesList: (keyof UserModel)[] = [
    "name",
    "username",
    "email",
    "phone",
    "city",
    "company",
  ];

  return (
    <div className={homeStyle().base()}>
      <div className={homeStyle().highbar()}>
        <SearchBar onSearchTextChange={setSearchText} />
        <Button onClick={handleStartFetch} color="black">
          Fetch users
        </Button>
      </div>

      {searchText && (
        <div className={homeStyle().searchText()}>
          Searching for &quot;<b>{searchText}</b>&quot;
        </div>
      )}
      {error && <p className={homeStyle().error()}>{error}</p>}
      {!isFetchStated ? (
        <div className={homeStyle().searchText()}>
          Click on &quot;Fetch users&quot; to load the users list
        </div>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className={homeStyle().screenTable()}>
            <table className={homeStyle().table()}>
              <colgroup>
                {titlesList?.map((_, index) => (
                  <col key={index} className={homeStyle().tableCol()} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  {titlesList?.map((key, index) => (
                    <th key={index} className={homeStyle().tableTitle()}>
                      <Button
                        baseStyle="all"
                        color="white"
                        className={homeStyle().tableTitleButton()}
                        onClick={() => setOrderBy(key)}
                      >
                        <div className={homeStyle().tableTitleButtonText()}>
                          {key}
                        </div>
                        {orderBy == key ? (
                          orderDirection ? (
                            <HiMiniArrowLongUp
                              className={homeStyle().tableTitleButtonIcon()}
                            />
                          ) : (
                            <HiMiniArrowLongDown
                              className={homeStyle().tableTitleButtonIcon()}
                            />
                          )
                        ) : (
                          <LuArrowUpDown
                            className={homeStyle().tableTitleButtonIconOff()}
                          />
                        )}
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id}>
                    {titlesList?.map((line, index) => (
                      <td key={index} className={homeStyle().tableData()}>
                        <Link href={"/user/" + user?.id}>
                          {user?.[line] || "--"}
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users?.length == 0 && (
            <div className={homeStyle().usersNotFound()}>
              {searchText.length > 0
                ? "No users match your search"
                : "No users available"}
            </div>
          )}
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsLength={list.length}
          />
        </>
      )}
    </div>
  );
}
