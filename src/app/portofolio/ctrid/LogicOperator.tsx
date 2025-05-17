import type RuleCondition from "@/shared/entity/robot";
import { generateRandomString } from "@/shared/utility";
import { Popover } from "@base-ui-components/react";
import clsx from "clsx";
import type { WritableAtom } from "jotai";
import { useAtom } from "jotai";
import React, { useState } from "react";

export interface LogicOperatorRobotRulesProps {
  atomRuleCondition: WritableAtom<
    RuleCondition | undefined,
    [update: RuleCondition],
    void
  >;
  switchToCustom: () => void;
  showBannerMaxCondition: () => void;
  showBannerMaxLogic: () => void;
  customClass?: string;
  disableLogicMenu?: boolean;
  level: number;
  onLogicRemove?: () => void;
  hideRemoveLogic?: boolean;
}
const LogicOperatorRobotRules = ({
  switchToCustom,
  showBannerMaxCondition,
  showBannerMaxLogic,
  customClass = "",
  disableLogicMenu = false,
  atomRuleCondition,
  level,
  hideRemoveLogic,
  onLogicRemove,
}: LogicOperatorRobotRulesProps) => {
  const [isShownActionTooltip, setIsShownActionTooltip] = useState(false);
  const [ruleCondition, setRuleCondition] = useAtom(atomRuleCondition);

  const toggleCondition = (item: RuleCondition | undefined) => {
    if (!item) return;
    const operation = item.operation;
    item.operation = operation === "AND" ? "OR" : "AND";
    setRuleCondition(item);
  };

  const checkMaxItem = (max: number, array: RuleCondition[]) =>
    array.length >= max;

  const validateMaxTree = (array: RuleCondition[]) => {
    if (checkMaxItem(5, array)) {
      showBannerMaxCondition?.();
      return false;
    }
    return true;
  };

  const addCondition = (array: RuleCondition[] | undefined) => {
    if (!ruleCondition) return;
    if (!array) return;
    if (!validateMaxTree(array)) return;
    array.push({ metricValue: "", id: generateRandomString(10) });
    setRuleCondition({
      ...ruleCondition,
      conditions: array,
    });
    switchToCustom?.();
  };

  const addLogic = (array: RuleCondition[] | undefined) => {
    if (!ruleCondition) return;
    if (!array) return;
    if (!validateMaxTree(array)) return;
    if (disableLogicMenu) {
      showBannerMaxLogic?.();
      return;
    }
    array.push({
      operation: "OR",
      id: generateRandomString(10),
      conditions: [
        { metricValue: "", id: generateRandomString(10) },
        { metricValue: "", id: generateRandomString(10) },
      ],
    });
    setRuleCondition({
      ...ruleCondition,
      conditions: array,
    });
    switchToCustom?.();
  };

  return (
    <div
      className={clsx(
        "relative w-5 flex-none flex flex-col text-black items-center justify-center rounded-md",
        level > 1 ? "h-full" : "",
        {
          "bg-[#FF9304]": ruleCondition?.operation === "AND",
          "bg-white": ruleCondition?.operation === "OR",
        },
        customClass,
      )}
    >
      {/* Top Arrow */}
      <div className="flex-none">
        <button type="button" onClick={() => toggleCondition(ruleCondition)}>
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
        onClick={() => toggleCondition(ruleCondition)}
        className="flex-1 flex items-center cursor-pointer rotate-[270deg] py-2"
      >
        <p className="text-[12px] px-2 text-center">
          {ruleCondition?.operation}
        </p>
      </button>

      {/* Bottom Arrow */}
      <button type="button" onClick={() => toggleCondition(ruleCondition)}>
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
      <Popover.Root delay={0}>
        <Popover.Trigger>
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
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup className={clsx("w-[150px]")}>
              <Popover.Description>
                <div className="absolute bottom-[-60px] bg-[#2B2D3A] rounded shadow-md p-2 text-[12px] w-[120px] text-neutral-50 z-10">
                  <Popover.Close
                    onClick={() => addCondition(ruleCondition?.conditions)}
                    className="cursor-pointer py-1 px-2 mb-1 w-full"
                  >
                    Add condition
                  </Popover.Close>
                  {level < 2 && (
                    <Popover.Close
                      onClick={() => addLogic(ruleCondition?.conditions)}
                      className="cursor-pointer py-1 px-2 w-full"
                    >
                      Add logic
                    </Popover.Close>
                  )}
                  {level > 1 && !hideRemoveLogic && (
                    <Popover.Close
                      onClick={() => onLogicRemove?.()}
                      className="cursor-pointer py-1 px-2 w-full"
                    >
                      Remove logic
                    </Popover.Close>
                  )}
                </div>
              </Popover.Description>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default LogicOperatorRobotRules;
