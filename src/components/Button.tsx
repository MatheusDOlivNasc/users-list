import { ButtonHTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonStyle = tv({
  base: "ease-in duration-300 transition-all",
  variants: {
    baseStyle: {
      default: "px-3 py-1.5 rounded",
      all: "w-full",
      none: " ",
    },
    color: {
      black: "bg-black text-white hover:bg-gray-900",
      white: "bg-white text-black hover:bg-gray-100",
      red: "bg-red-500 text-white hover:bg-red-600",
    },
    fontColor: {
      black: "text-black",
      white: "text-white",
      red: "text-red",
    }
  },
  defaultVariants: {
    baseStyle: "default",
    color: "black",
  },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyle>;

export default function Button({
  children,
  type = "button",
  className,

  baseStyle,
  color,
  fontColor,

  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      className={buttonStyle({ className, baseStyle, color, fontColor })}
    >
      {children}
    </button>
  );
}
