import { atom } from "jotai";
import type { Rule } from "../entity/robot";

export function generateRandomRulesDataWithJotai() {
  const rules: Rule[] = [
    {
      ruleName: "Rules 1 - Start Campaign with Budget and Conditions.",
      description:
        "Start and set daily budget for good performing campaigns at the start of the day",
      descriptionDetail:
        "Start and set daily budget for good performing campaigns at the start of the day",
      action: ["start"],
      open: true,
      id: "1",
      label: "Start Campaign with Budget and Conditions.",
      condition: {
        operation: "AND",
        conditions: [
          {
            operation: undefined,
            value: '',
            metricValue: '',
          }
        ]
      },
    },
  ];
  return atom<Rule>(rules[0]);
}
