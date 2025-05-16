import { atom } from "jotai";
import type { Rule } from "../entity/robot";
import { generateRandomString } from "../utility";

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
      id: generateRandomString(10),
      label: "Start Campaign with Budget and Conditions.",
      condition: {
        id: generateRandomString(10),
        operation: "AND",
        conditions: [
          {
            id: generateRandomString(10),
            operation: 'AND',
            value: '',
            metricValue: '',
          },
          {
            id: generateRandomString(10),
            operation: 'AND',
            value: '',
            metricValue: '',
          }
        ]
      },
    },
  ];
  return atom<Rule>(rules[0]);
}
