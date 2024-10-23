"use client";

import Button from "@/components/Button";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";
import { tv } from "tailwind-variants";

type Props = {
  userId: string;
  backTo?: string;
};

const userPanelStyle = tv({
  slots: {
    base: [
      "bg-white shadow-lg p-1 sm:p-3 rounded w-[95%] max-w-[400px] mt-3",
      "overflow-auto max-h-[80dvh]",
      "space-y-2",
    ],
    name: "font-bold text-xl px-1",
    data: "not-italic ",
    dataLabel: "inline text-xs break-words",
    dataText: "inline font-medium break-words",

    titleSection:
      "flex justify-between flex-start text-center sm:items-end px-1 flex-col sm:flex-row mt-1 sm:mt-0",
    section: "bg-gray-100 rounded py-1 px-3 ",
  },
});

export default function UserPanel({ userId, backTo }: Props) {
  const { user, isLoading, error } = useUser(userId);
  const router = useRouter();

  return (
    <div className={userPanelStyle().base()}>
      <div className={userPanelStyle().titleSection()}>
        <h1 className={userPanelStyle().name()}>
          {isLoading ? "Loading..." : user?.name || "User not found"}
        </h1>
        <Button
          baseStyle="none"
          color="white"
          className="underline underline-offset-2 my-1"
          onClick={() => (backTo ? router.push(backTo) : router.back())}
        >
          Home
        </Button>
      </div>
      {error && (
        <dl className={userPanelStyle().data()}>
          <dd className={userPanelStyle().dataText()}>{error}</dd>
        </dl>
      )}
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

            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Phone:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>{user?.phone}</dd>
            </dl>
            <dl className={userPanelStyle().data()}>
              <dt className={userPanelStyle().dataLabel()}>Website:</dt>{" "}
              <dd className={userPanelStyle().dataText()}>{user?.website}</dd>
            </dl>
          </div>
          <address className={userPanelStyle().section()}>
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
