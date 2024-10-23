"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import useUsersList from "@/hooks/useUsersList";
import { UserModel } from "@/models/user";
import { tv } from "tailwind-variants";

const homeStyle = tv({
  slots: {
    base: "w-full p-2",
    highbar: "space-x-2",

    searchText: "p-2 ",

    table: "table-auto w-full mt-2",
    tableCol: "min-w-32",
    tableTitle: "capitalize text-left text-sm",
    tableData: " ",

    usersNotFound: "my-1 text-sm",

    error: "bg-red-500 text-white mt-2 px-2 py-1",
  },
});

export default function Home() {
  const {
    list: users,
    isLoading,
    handleStartFetch,
    searchText,
    setSearchText,
    isFetchStated,
    error,
  } = useUsersList();

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
          <table className={homeStyle().table()}>
            <colgroup>
              {titlesList?.map((line, index) => (
                <col key={index} className={homeStyle().tableCol()} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {titlesList?.map((line, index) => (
                  <th key={index} className={homeStyle().tableTitle()}>
                    {line}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  {titlesList?.map((line, index) => (
                    <td key={index} className={homeStyle().tableData()}>
                      {user?.[line] || "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {users.length == 0 && (
            <div className={homeStyle().usersNotFound()}>
              {searchText.length > 0
                ? "No users match your search"
                : "No users available"}
            </div>
          )}
        </>
      )}
    </div>
  );
}
