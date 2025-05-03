import clsx from "clsx";

interface ButtonProps {
  text: string;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  variant: "primary" | "secondary" | "ghost" | "danger";
  rounded: "sm" | "md" | "lg" | "none";
  type: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  text = "hello",
  size = "md",
  onClick,
  isDisabled = false,
  isLoading = false,
  loadingText = "Loading...",
  variant = "primary",
  rounded = "none",
  type = "button",
}: ButtonProps) {
  let filteredText = text || "hello";
  if (isLoading) {
    filteredText = loadingText || "Loading...";
  }
  return (
    <button
      onClick={() => {
        if (isDisabled || isLoading) return;
        onClick?.();
      }}
      className={clsx(
        "px-4 py-1 min-w-[100px] text-white bg-green-400 hover:brightness-90",
        {
          "text-sm": size === "sm",
          "text-md": size === "md",
          "text-lg py-2": size === "lg",
        },
        {
          "bg-green-400": variant === "primary",
          "bg-green-700": variant === "secondary",
          "bg-red-500": variant === "danger",
          "bg-transparent text-green-400 border-green-400 border-2":
            variant === "ghost",
        },
        {
          "rounded-sm": rounded === "sm",
          "rounded-md": rounded === "md",
          "rounded-lg": rounded === "lg",
          "rounded-none": rounded === "none",
        },
        {
          "cursor-not-allowed": isDisabled || isLoading,
          "opacity-50": isDisabled && !isLoading,
          "animate-pulse": isLoading && !isDisabled,
        },
      )}
      type={type}
    >
      {filteredText}
    </button>
  );
}
