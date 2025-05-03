import clsx from "clsx";
import TaxBadgeChart from "./TaxBadgeChart";
import ChevronDown from "./ChevronDown";

interface CardProps {
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  bgCard?: string;
  amountClass: string;
  isLoading?: boolean;
  amount?: number;
  label?: string;
  percentage?: number;
  percentageState?: "negative" | "positive" | "neutral";
  currency?: string;
  isIncludeVat?: boolean;
}

export default function Card({
  onClick,
  isLoading = false,
  isIncludeVat = false,
  onKeyDown,
  label = "",
  amount = 0,
  percentage = 0,
  currency = "IDR",
  amountClass = "",
  percentageState = "neutral",
  bgCard = "bg-[#1E1F31]",
}: CardProps) {
  const loadingComponent = isLoading && (
    <div>
      <div className="absolute bg-gray-500 top-0 right-0 w-full h-full z-40 flex flex-col items-end justify-end rounded">
        <div className="h-3 animate-pulse bg-slate-400 rounded-lg w-2/3 mx-1" />
        <div className="h-3 animate-pulse bg-slate-400 rounded-lg mx-1 my-3 w-1/3" />
      </div>
    </div>
  );
  const vatBadgeComponent = isIncludeVat && <TaxBadgeChart color="#2196F3" />;
  return (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={clsx(
        " rounded relative cursor-pointer w-full p-3 text-white",
        bgCard ? bgCard : "bg-[#1E1F31]",
      )}
    >
      {loadingComponent}
      <div className="absolute top-[-7px] right-[-7px] h-full z-30">
        {vatBadgeComponent}
      </div>
      <div className="flex pb-2">
        <div className="flex justify-end gap-1.5 cursor-pointer whitespace-nowrap overflow-hidden">
          <ChevronDown className="w-[16px] h-[16px] flex-none" />
          <p title={label} className="text-xs truncate w-full flex-1">
            {label}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={clsx("text-[20px]", amountClass)}>
          <span className="text-[12px] text-gray-currency mr-1 font-extralight">
            {currency}
          </span>
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </p>
        <div
          className={clsx("text-[12px] h-5 text-green-600", {
            "text-red-600": percentageState === "negative",
            "text-green-600": percentageState === "positive",
            "text-gray-400": percentageState === "neutral",
          })}
        >
          <span className="leading-none">
            {percentageState === "negative"
              ? "-"
              : percentageState === "positive"
                ? "+"
                : ""}
            {percentage.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            %
          </span>
        </div>
      </div>
    </div>
  );
}
