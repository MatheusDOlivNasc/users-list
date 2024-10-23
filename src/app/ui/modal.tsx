"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
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
    box: "flex justify-center w-full",
  },
});

export function Modal({ children, backTo }: Props) {
  const router = useRouter();

  function onDismiss() {
    if(backTo) router.push(backTo);
    else router.back();
  }

  return createPortal(
    <div className={modalStyle().base()}>
      <div className={modalStyle().box()} onClick={onDismiss}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
