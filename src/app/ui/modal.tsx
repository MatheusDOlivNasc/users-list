"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { tv } from "tailwind-variants";

interface Props {
  children: ReactNode;
  backTo?: string;
}

const modalStyle = tv({
  slots: {
    base: [
      "fixed top-0 left-0 w-screen h-screen",

      "bg-black/20 backdrop-blur-sm z-[1000]",
    ],
    box: "flex justify-center items-start w-full h-screen",
  },
});

export function Modal({ children }: Props) {
  const router = useRouter();

  function onDismiss(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const target = event.target as HTMLDivElement;

    if (target.id == "message-box") {
      router.back();
    }
  }

  return createPortal(
    <div className={modalStyle().base()}>
      <div
        id="message-box"
        className={modalStyle().box()}
        onClick={onDismiss}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
