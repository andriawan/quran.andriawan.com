import type { operationType, Rule } from "@/shared/entity/robot";
import clsx from "clsx";
import React, { useState } from "react";

export interface LogicOperatorRobotRulesProps {
  value?: operationType;
  data?: Rule;
  switchToCustom: () => void;
  showBannerMaxCondition: () => void;
  showBannerMaxLogic: () => void;
  onRuleChange: (value: Rule) => void;
  customClass?: string;
  disableLogicMenu?: boolean;
  list: Rule[];
}
const LogicOperatorRobotRules = ({
  value,
  data,
  switchToCustom,
  showBannerMaxCondition,
  showBannerMaxLogic,
  customClass = "",
  list,
  disableLogicMenu = false,
  onRuleChange,
}: LogicOperatorRobotRulesProps) => {
  const [isShownActionTooltip, setIsShownActionTooltip] = useState(false);

  const toggleCondition = (
    item: Rule | undefined,
    operation: operationType | undefined,
  ) => {
    if (!item || !operation) return;
    item.operation = operation === "AND" ? "OR" : "AND";
    onRuleChange(item);
    switchToCustom?.();
  };

  const checkMaxItem = (max: number, array: Rule[]) => array.length >= max;

  const validateMaxTree = (array: Rule[]) => {
    if (checkMaxItem(5, array)) {
      showBannerMaxCondition?.();
      return false;
    }
    return true;
  };

  const addCondition = (array: Rule[]) => {
    if (!validateMaxTree(array)) return;
    array.push({ metricValue: "" });
    switchToCustom?.();
  };

  const addLogic = (array: Rule[]) => {
    if (!validateMaxTree(array)) return;
    if (disableLogicMenu) {
      showBannerMaxLogic?.();
      return;
    }
    array.push({
      operation: "OR",
      conditions: [{ metricValue: "" }, { metricValue: "" }],
    });
    switchToCustom?.();
  };

  return (
    <div
      className={clsx(
        "relative w-5 flex-none flex flex-col text-black items-center justify-center rounded-md",
        {
          "bg-[#FF9304]": value === "AND",
          "bg-white": value === "OR",
        },
        customClass,
      )}
    >
      {/* Top Arrow */}
      <div className="flex-none">
        <button type="button" onClick={() => toggleCondition(data, value)}>
          <svg
            className="cursor-pointer"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Arrow</title>
            <path
              d="M8 7.1L4.7 10.4L3.76 9.46L8 5.22L12.24 9.46L11.3 10.4L8 7.1Z"
              fill="#111224"
            />
          </svg>
        </button>
      </div>

      {/* Vertical Text */}
      <button
        type="button"
        onClick={() => toggleCondition(data, value)}
        className="flex-1 flex items-center cursor-pointer rotate-[270deg] py-2"
      >
        <p className="text-[12px] px-2 text-center">{value}</p>
      </button>

      {/* Bottom Arrow */}
      <button type="button" onClick={() => toggleCondition(data, value)}>
        <svg
          className="cursor-pointer"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Arrow Bottom</title>
          <path
            d="M8 8.9L11.3 5.6L12.24 6.54L8 10.78L3.76 6.54L4.7 5.6L8 8.9Z"
            fill="#111224"
          />
        </svg>
      </button>

      {/* Tooltip Trigger */}
      <div
        onMouseEnter={() => setIsShownActionTooltip(true)}
        onMouseLeave={() => setIsShownActionTooltip(false)}
        className={clsx(
          "border-t mt-1 border-black cursor-pointer rounded-b-md w-5 h-5 flex justify-center items-center",
        )}
      >
        {!isShownActionTooltip ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <title>Tooltip</title>
            <path
              d="M9.67 5.67H5.67V9.67H4.33V5.67H0.33V4.33H4.33V0.33H5.67V4.33H9.67V5.67Z"
              fill="black"
            />
          </svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <title>Tooltip 2</title>
            <path
              d="M6.83 7.77L4 4.94L1.17 7.77L0.23 6.83L3.06 4L0.23 1.17L1.17 0.23L4 3.06L6.83 0.23L7.77 1.17L4.94 4L7.77 6.83L6.83 7.77Z"
              fill="black"
            />
          </svg>
        )}
      </div>

      {/* Tooltip Content */}
      {isShownActionTooltip && (
        <div className="absolute bottom-[-60px] bg-white border rounded shadow-md p-2 text-[10px] w-[100px] text-black z-10">
          <button
            type="button"
            onClick={() => addCondition(list)}
            className="cursor-pointer py-1 px-2 mb-1 rounded-md bg-logo-color"
          >
            Add condition
          </button>
          <button
            type="button"
            onClick={() => addLogic(list)}
            className="cursor-pointer py-1 px-2 rounded-md bg-white"
          >
            Add logic
          </button>
        </div>
      )}
    </div>
  );
};

export default LogicOperatorRobotRules;
