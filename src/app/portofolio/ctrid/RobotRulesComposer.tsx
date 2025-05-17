import clsx from "clsx";
import ChevronDown from "./ChevronDown";
import LogicOperatorRobotRules from "./LogicOperator";
import type { Rule } from "@/shared/entity/robot";
import { atom, useAtom, type PrimitiveAtom } from "jotai";
import type RuleCondition from "@/shared/entity/robot";
import Trash from "./Trash";
import Warning from "./Warning";
import type { ItemListParams } from "@/app/components/Select";
import MetricsInput from "./MetricsInput";
import IconActionRules from "./ActionRulesIcon";
import Select from "@/app/components/Select";

export interface RobotRulesComposerProps {
  onRemove?: () => void;
  atomRule: PrimitiveAtom<Rule>;
  metrics: ItemListParams[];
  periods: ItemListParams[];
  days: ItemListParams[];
  actionList: ItemListParams[];
  clocks: ItemListParams[];
  comparations: ItemListParams[];
  isDebug?: boolean;
  statusCampaigns: ItemListParams[];
}

export default function RobotRulesComposer({
  onRemove,
  atomRule,
  metrics,
  periods,
  days,
  clocks,
  comparations,
  actionList,
  isDebug,
  statusCampaigns,
}: RobotRulesComposerProps) {
  const atomRuleCondition = atom(
    (get) => get(atomRule).condition,
    (get, set, update: RuleCondition) => {
      set(atomRule, { ...get(atomRule), condition: update });
    },
  );
  const atomRuleConditionLevel1 = (index: number) => {
    const finalAtom = atom(
      (get) => {
        const condition = get(atomRuleCondition);
        return condition.conditions?.[index];
      },
      (get, set, update: RuleCondition) => {
        const condition = get(atomRuleCondition);
        if (condition.conditions) {
          set(atomRuleCondition, {
            ...get(atomRuleCondition),
            conditions: [
              ...condition.conditions.slice(0, index),
              update,
              ...condition.conditions.slice(index + 1),
            ],
          });
        }
      },
    );
    return finalAtom;
  };
  const setAtomRuleConditionLevel2 = (index: number, index2: number) => {
    const finalAtom = atom(
      (get) => {
        const condition = get(atomRuleConditionLevel1(index));
        return condition?.conditions?.[index2];
      },
      (get, set, update: RuleCondition) => {
        const condition = get(atomRuleConditionLevel1(index));
        if (condition?.conditions) {
          set(atomRuleConditionLevel1(index), {
            ...condition,
            conditions: [
              ...condition.conditions.slice(0, index2),
              update,
              ...condition.conditions.slice(index2 + 1),
            ],
          });
        }
      },
    );
    return finalAtom;
  };
  const [rule, setRule] = useAtom(atomRule);
  return (
    <div
      className={clsx(
        "py-4 flex flex-col text-white rounded w-full bg-[#1E1F31]",
      )}
    >
      <div className="flex px-4 items-center gap-4">
        <button
          type="button"
          onClick={() => setRule((prev) => ({ ...prev, open: !prev.open }))}
        >
          <ChevronDown
            className={clsx("w-4 h-4 cursor-pointer", {
              "rotate-180": rule.open,
            })}
          />
        </button>
        <button
          type="button"
          className="text-md flex-grow text-start"
          onClick={() => setRule((prev) => ({ ...prev, open: !prev.open }))}
        >
          <p>{rule.ruleName}</p>
          <p className={clsx("text-sm text-gray-400")}>
            {rule.descriptionDetail}
          </p>
        </button>
        <button type="button" onClick={onRemove}>
          <Trash className="size-5" />
        </button>
      </div>
      {rule.open && (
        <div className="border-t mt-3 px-4 py-4 border-gray-700 gap-4 flex flex-col">
          <div className="flex items-center text-sm text-black bg-yellow-50 p-1 rounded border border-orange-400 justify-center gap-2">
            <Warning className="size-4" />
            <p className="font-semibold">
              These Rules will only affect if your Campaign status CBO: YES
            </p>
          </div>
          <div className="bg-[#2B2D3A] text-center p-2 rounded">Condition:</div>
          <div className="w-full flex">
            <LogicOperatorRobotRules
              atomRuleCondition={atomRuleCondition}
              showBannerMaxCondition={() => {}}
              switchToCustom={() => {}}
              showBannerMaxLogic={() => {}}
            />
            <div className="flex-1 flex flex-col">
              {rule.condition.conditions?.map((condition, index) => {
                return (
                  <div
                    key={condition.id}
                    className={clsx("flex items-stretch mb-2 last:mb-0")}
                  >
                    <div className="h-full flex items-center flex-1">
                      <div
                        className={clsx("w-3 mt-5 lg:mt-0 h-[1px]", {
                          "bg-[#FF9304]": rule.condition.operation === "AND",
                          "bg-white": rule.condition.operation === "OR",
                        })}
                      />
                      {condition.conditions && (
                        <>
                          <LogicOperatorRobotRules
                            atomRuleCondition={atomRuleConditionLevel1(index)}
                            showBannerMaxCondition={() => {}}
                            switchToCustom={() => {}}
                            showBannerMaxLogic={() => {}}
                          />
                          <div className="flex-1 flex flex-col">
                            {condition.conditions?.map((condition2, index2) => {
                              return (
                                <div
                                  key={condition2.id}
                                  className={clsx("flex items-stretch mb-2")}
                                >
                                  <div className="h-full flex items-center flex-1">
                                    <div
                                      className={clsx(
                                        "w-3 mt-5 lg:mt-0 h-[1px]",
                                        {
                                          "bg-[#FF9304]":
                                            condition.operation === "AND",
                                          "bg-white":
                                            condition.operation === "OR",
                                        },
                                      )}
                                    />
                                    {!condition2.conditions && (
                                      <div
                                        className={clsx(
                                          "min-w-[60%] w-full flex-1 flex items-center h-full lg:border lg:border-[#3a4144] rounded-md",
                                        )}
                                      >
                                        <div className="h-[42px] hidden lg:flex md:h-[36px] w-full flex-row items-center bg-bg-card rounded">
                                          <MetricsInput
                                            atomRuleCondition={setAtomRuleConditionLevel2(
                                              index,
                                              index2,
                                            )}
                                            clocks={clocks}
                                            index={index}
                                            condition={condition2}
                                            comparations={comparations}
                                            metrics={metrics}
                                            periods={periods}
                                            days={days}
                                            statusCampaigns={statusCampaigns}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                      {!condition.conditions && (
                        <div
                          className={clsx(
                            "min-w-[60%] w-full flex-1 flex items-center h-full lg:border lg:border-[#3a4144] rounded-md",
                          )}
                        >
                          <div className="h-[42px] hidden lg:flex md:h-[36px] w-full flex-row items-center bg-bg-card rounded">
                            <MetricsInput
                              atomRuleCondition={atomRuleConditionLevel1(index)}
                              clocks={clocks}
                              index={index}
                              condition={condition}
                              comparations={comparations}
                              metrics={metrics}
                              periods={periods}
                              days={days}
                              statusCampaigns={statusCampaigns}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-[#2B2D3A] text-center p-2 rounded">Action:</div>
          <div className="w-full flex">
            <div className="px-3 w-full py-[2px] gap-3 rounded-md flex items-center bg-[#158D00] justify-center">
              <IconActionRules action={rule.action[0]} />
              <Select
                triggerClassName="rounded-l text-white flex-1 w-full"
                popoverTriggerClassName="flex-1 w-full"
                withSearchInput
                autoOpenOnFocus
                data={actionList}
                onSelected={(item) => {
                  const newRule: Rule = {
                    ...rule,
                    action: [item.value],
                    actionId: item.id,
                    actionText: item.text,
                  };
                  setRule(newRule);
                }}
                placeholder="Select Action..."
                selected={{
                  id: rule.actionId ?? "",
                  value: rule.action[0],
                  text: rule.actionText ?? "",
                }}
              />
            </div>
          </div>
        </div>
      )}
      {isDebug && <pre className="p-4">{JSON.stringify(rule, null, 2)}</pre>}
    </div>
  );
}
