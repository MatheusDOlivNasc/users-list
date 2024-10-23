import { UserService } from "@/Services/user";
import Link from "next/link";
import { tv } from "tailwind-variants";

interface Props {
  userId: string;
}

const userPanelStyle = tv({
  slots: {
    base: [
      "bg-white shadow-lg p-1 sm:p-3 rounded w-[95%] max-w-[400px] mt-3",
      "space-y-2",
    ],
    name: "font-bold text-xl px-1",
    data: "not-italic ",
    dataLabel: "inline text-xs break-words",
    dataText: "inline font-medium break-words",

    link: "underline ml-1 sm:ml-0",

    titleSection: "flex justify-between flex-start sm:items-end px-1 flex-col sm:flex-row",
    section: "bg-gray-100 rounded py-1 px-3 ",
  },
});

export default async function UserPanel({ userId }: Props) {
  const user = await UserService.getById(userId);

  return (
    <div className={userPanelStyle().base()}>
      <div className={userPanelStyle().titleSection()}>
        <h1 className={userPanelStyle().name()}>
          {user?.name || "User not found"}
        </h1>
        <Link href="/" className={userPanelStyle().link()}>
          Home
        </Link>
      </div>
      {user && (
        <>
          <div className={userPanelStyle().section()}>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>User:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>{user?.username}</dd>
            </dl>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Email:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>{user?.email}</dd>
            </dl>
            <address className={userPanelStyle().data()}>
              <dl className={userPanelStyle().data()}>
                <dt className={userPanelStyle().dataLabel()}>Street:</dt>{" "}
                <dd className={userPanelStyle().dataText()}>
                  {user?.address?.street}
                </dd>
              </dl>
              <dl className={userPanelStyle().data()}>
                <dt className={userPanelStyle().dataLabel()}>Suite:</dt>{" "}
                <dd className={userPanelStyle().dataText()}>
                  {user?.address?.suite}
                </dd>
              </dl>
              <dl className={userPanelStyle().data()}>
                <dt className={userPanelStyle().dataLabel()}>City:</dt>{" "}
                <dd className={userPanelStyle().dataText()}>
                  {user?.address?.city}
                </dd>
              </dl>
              <dl className={userPanelStyle().data()}>
                <dt className={userPanelStyle().dataLabel()}>Zipcode:</dt>{" "}
                <dd className={userPanelStyle().dataText()}>
                  {user?.address?.zipcode}
                </dd>
              </dl>
              {/* <p>
              {user?.address?.geo?.lat} - {user?.address?.geo?.lng}
            </p> */}
            </address>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Phone:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>{user?.phone}</dd>
            </dl>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Website:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>{user?.website}</dd>
            </dl>
          </div>
          <div className={userPanelStyle().section()}>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Company:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>
                {user?.company?.name}
              </dd>
            </dl>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Catch phrase:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>
                {user?.company?.catchPhrase}
              </dd>
            </dl>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Bs:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>
                {user?.company?.bs}
              </dd>
            </dl>
          </div>
        </>
      )}
    </div>
  );
}
