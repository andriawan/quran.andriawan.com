import clsx from "clsx";
import TaxBadgeChart from "./TaxBadgeChart";
import ChevronDown from "./ChevronDown";
import { formatNumberDisplay, formatShortNumber } from "@/shared/utility";
import { Popover } from "@base-ui-components/react";

export interface CardProps {
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  bgCard?: string;
  amountClass: string;
  isLoading?: boolean;
  amount?: number | null;
  amountMode: "normal" | "short";
  amounType: "default" | "currency" | "percentage";
  label?: string;
  percentage?: number | null;
  comparedPercentage?: number | null;
  percentageState?: "negative" | "positive" | "neutral";
  currency?: string;
  isIncludeVat?: boolean;
  className?: string;
}

export default function Card({
  onClick,
  isLoading = false,
  isIncludeVat = false,
  onKeyDown,
  label = "",
  amount = 0,
  percentage = 0,
  comparedPercentage = 0,
  amounType = "default",
  currency = "IDR",
  amountClass = "",
  amountMode = "normal",
  percentageState = "neutral",
  bgCard = "bg-[#1E1F31]",
  className = "",
}: CardProps) {
  const vatBadgeComponent = isIncludeVat && <TaxBadgeChart color="#2196F3" />;
  return (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={clsx(
        " rounded relative cursor-pointer w-full p-3 text-white",
        bgCard ? bgCard : "bg-[#1E1F31]",
        className,
      )}
    >
      <div className="absolute top-[-7px] right-[-7px] h-full z-30">
        {vatBadgeComponent}
      </div>
      <div className="flex pb-2 w-full">
        <div className="flex w-full justify-start gap-1.5 cursor-pointer whitespace-nowrap overflow-hidden">
          {isLoading ? (
            <div
              className={clsx(
                "w-full animate-pulse h-4 rounded opacity-15 bg-slate-500 mr-4 ",
              )}
            />
          ) : (
            <>
              <ChevronDown className="w-[16px] h-[16px] flex-none" />
              <p title={label} className="text-xs truncate w-full flex-1">
                {label}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className={clsx("text-[20px]", amountClass)}>
          {isLoading ? (
            <span
              className={clsx(
                "w-full animate-pulse rounded opacity-15 bg-slate-500 text-slate-500",
              )}
            >
              Loading Data...
            </span>
          ) : (
            <>
              <span className="text-[12px] text-gray-currency mr-1 font-extralight">
                {amounType === "currency" ? currency : ""}
              </span>
              <span title={amount?.toString()} className="hidden md:inline">
                {amountMode === "short"
                  ? formatShortNumber(amount)
                  : formatNumberDisplay(amount)}
              </span>
              <span className="md:hidden">{formatShortNumber(amount)}</span>
              <span>{amounType === "percentage" ? "%" : ""}</span>
            </>
          )}
        </p>
        <div
          className={clsx("text-[12px] h-5 text-green-600", {
            "text-red-600": percentageState === "negative",
            "text-green-600": percentageState === "positive",
            "text-gray-400": percentageState === "neutral",
          })}
        >
          {isLoading ? (
            <span
              className={clsx(
                "w-full animate-pulse rounded opacity-15 bg-slate-500 text-slate-500",
              )}
            >
              Loading Data...
            </span>
          ) : (
            <>
              <Popover.Root openOnHover={true} delay={0}>
                <Popover.Trigger>
                  <span className="leading-none">
                    {percentageState === "negative"
                      ? "-"
                      : percentageState === "positive"
                        ? "+"
                        : ""}
                    {formatNumberDisplay(percentage)}%
                  </span>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Positioner sideOffset={10}>
                    <Popover.Popup className={clsx("w-[150px]")}>
                      <Popover.Description>
                        <div className="flex flex-col items-end gap-2 bg-[#1E1F31] p-4 rounded border border-gray-600 text-white text-xs">
                          <p>Today</p>
                          <p>{formatNumberDisplay(percentage)}%</p>
                          <p className="text-lg font-bold">VS</p>
                          <p>Yesterday</p>
                          <p>{formatNumberDisplay(comparedPercentage)}%</p>
                        </div>
                      </Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
