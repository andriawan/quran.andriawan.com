import clsx from "clsx";
import ChevronDown from "./ChevronDown";
import { useState } from "react";
import LogicOperatorRobotRules from "./LogicOperator";
import type { Rule } from "@/shared/entity/robot";

export interface RobotRulesComposerProps {
  onRemove?: () => void;
  rule: Rule;
  onRobotRulesChange?: (rule: Rule) => void;
  onRobotRulesListChange?: (rule: Rule) => void;
  list: Rule[];
}

export default function RobotRulesComposer({
  onRemove,
  list,
  rule,
  onRobotRulesChange,
}: RobotRulesComposerProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={clsx(
        "py-4 flex flex-col text-white rounded w-full bg-[#1E1F31]",
      )}
    >
      <div className="flex px-4 items-center gap-4">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <ChevronDown className="w-4 h-4 cursor-pointer" />
        </button>
        <button
          type="button"
          className="text-md flex-grow text-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Rules 7 - Start Campaign with Budget and Conditions.</p>
          <p className={clsx("text-sm text-gray-400")}>
            Start and set daily budget for good performing campaigns at the
            start of the day
          </p>
        </button>
        <button type="button" onClick={onRemove}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Trash</title>
            <g clip-path="url(#clip0_755_2085)">
              <path
                d="M14.1667 4.99935H18.3334V6.66602H16.6667V17.4993C16.6667 17.7204 16.579 17.9323 16.4227 18.0886C16.2664 18.2449 16.0544 18.3327 15.8334 18.3327H4.16675C3.94573 18.3327 3.73377 18.2449 3.57749 18.0886C3.42121 17.9323 3.33341 17.7204 3.33341 17.4993V6.66602H1.66675V4.99935H5.83342V2.49935C5.83342 2.27834 5.92121 2.06637 6.07749 1.91009C6.23377 1.75381 6.44573 1.66602 6.66675 1.66602H13.3334C13.5544 1.66602 13.7664 1.75381 13.9227 1.91009C14.079 2.06637 14.1667 2.27834 14.1667 2.49935V4.99935ZM15.0001 6.66602H5.00008V16.666H15.0001V6.66602ZM11.1784 11.666L12.6517 13.1393L11.4734 14.3177L10.0001 12.8443L8.52675 14.3177L7.34841 13.1393L8.82175 11.666L7.34841 10.1927L8.52675 9.01435L10.0001 10.4877L11.4734 9.01435L12.6517 10.1927L11.1784 11.666ZM7.50008 3.33268V4.99935H12.5001V3.33268H7.50008Z"
                fill="#797979"
              />
            </g>
            <defs>
              <clipPath id="clip0_755_2085">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="border-t mt-3 px-4 py-4 border-gray-700 gap-4 flex flex-col">
          <div className="flex items-center text-sm text-black bg-yellow-50 p-1 rounded border border-orange-400 justify-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Info</title>
              <path
                d="M9.00005 1.80078C12.978 1.80078 16.2 5.02278 16.2 9.00078C16.2 12.9788 12.978 16.2008 9.00005 16.2008C5.02205 16.2008 1.80005 12.9788 1.80005 9.00078C1.80005 5.02278 5.02205 1.80078 9.00005 1.80078ZM10.017 10.2428L10.332 4.42878H7.66805L7.98305 10.2428H10.017ZM9.93605 13.2668C10.152 13.0598 10.269 12.7718 10.269 12.4028C10.269 12.0248 10.161 11.7368 9.94505 11.5298C9.72905 11.3228 9.41405 11.2148 8.99105 11.2148C8.56805 11.2148 8.25305 11.3228 8.02805 11.5298C7.80305 11.7368 7.69505 12.0248 7.69505 12.4028C7.69505 12.7718 7.81205 13.0598 8.03705 13.2668C8.27105 13.4738 8.58605 13.5728 8.99105 13.5728C9.39605 13.5728 9.71105 13.4738 9.93605 13.2668Z"
                fill="#1E1F31"
              />
            </svg>

            <p className="font-semibold">
              These Rules will only affect if your Campaign status CBO: YES
            </p>
          </div>
          <div className="bg-[#2B2D3A] text-center p-2 rounded">Condition:</div>
          <div className="w-full">
            <LogicOperatorRobotRules
              list={list}
              data={rule}
              value={rule.operation}
              onRuleChange={(rule) => onRobotRulesChange?.(rule)}
              showBannerMaxCondition={() => {}}
              switchToCustom={() => {}}
              showBannerMaxLogic={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
