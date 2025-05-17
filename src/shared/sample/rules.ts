import { atom } from "jotai";
import type { Rule } from "../entity/robot";
import { generateRandomString } from "../utility";
import type { ItemListParams } from "@/app/components/Select";

export function generateRandomRulesDataWithJotai() {
  const rules: Rule[] = [
    {
      ruleName: "Rules 1 - Start Campaign with Budget and Conditions.",
      description:
        "Start and set daily budget for good performing campaigns at the start of the day",
      descriptionDetail:
        "Start and set daily budget for good performing campaigns at the start of the day",
      action: [],
      open: true,
      id: generateRandomString(10),
      label: "Start Campaign with Budget and Conditions.",
      condition: {
        id: generateRandomString(10),
        operation: "AND",
        conditions: [
          {
            id: generateRandomString(10),
            metricValue: "",
          },
          {
            id: generateRandomString(10),
            metricValue: "",
          },
        ],
      },
    },
  ];
  return atom<Rule>(rules[0]);
}

export const daysParam = [
  { id: "0", value: "0", text: "Monday" },
  { id: "1", value: "1", text: "Tuesday" },
  { id: "2", value: "2", text: "Wednesday" },
  { id: "3", value: "3", text: "Thursday" },
  { id: "4", value: "4", text: "Friday" },
  { id: "5", value: "5", text: "Saturday" },
  { id: "6", value: "6", text: "Sunday" },
];

export const clockParam = [
  { id: "0", value: "0", text: "00:00" },
  { id: "0:30", value: "0:30", text: "00:30" },
  { id: "1", value: "1", text: "01:00" },
  { id: "1:30", value: "1:30", text: "01:30" },
  { id: "2", value: "2", text: "02:00" },
  { id: "2:30", value: "2:30", text: "02:30" },
  { id: "3", value: "3", text: "03:00" },
  { id: "3:30", value: "3:30", text: "03:30" },
  { id: "4", value: "4", text: "04:00" },
  { id: "4:30", value: "4:30", text: "04:30" },
  { id: "5", value: "5", text: "05:00" },
  { id: "5:30", value: "5:30", text: "05:30" },
  { id: "6", value: "6", text: "06:00" },
  { id: "6:30", value: "6:30", text: "06:30" },
  { id: "7", value: "7", text: "07:00" },
  { id: "7:30", value: "7:30", text: "07:30" },
  { id: "8", value: "8", text: "08:00" },
  { id: "8:30", value: "8:30", text: "08:30" },
  { id: "9", value: "9", text: "09:00" },
  { id: "9:30", value: "9:30", text: "09:30" },
  { id: "10", value: "10", text: "10:00" },
  { id: "10:30", value: "10:30", text: "10:30" },
  { id: "11", value: "11", text: "11:00" },
  { id: "11:30", value: "11:30", text: "11:30" },
  { id: "12", value: "12", text: "12:00" },
  { id: "12:30", value: "12:30", text: "12:30" },
  { id: "13", value: "13", text: "13:00" },
  { id: "13:30", value: "13:30", text: "13:30" },
  { id: "14", value: "14", text: "14:00" },
  { id: "14:30", value: "14:30", text: "14:30" },
  { id: "15", value: "15", text: "15:00" },
  { id: "15:30", value: "15:30", text: "15:30" },
  { id: "16", value: "16", text: "16:00" },
  { id: "16:30", value: "16:30", text: "16:30" },
  { id: "17", value: "17", text: "17:00" },
  { id: "17:30", value: "17:30", text: "17:30" },
  { id: "18", value: "18", text: "18:00" },
  { id: "18:30", value: "18:30", text: "18:30" },
  { id: "19", value: "19", text: "19:00" },
  { id: "19:30", value: "19:30", text: "19:30" },
  { id: "20", value: "20", text: "20:00" },
  { id: "20:30", value: "20:30", text: "20:30" },
  { id: "21", value: "21", text: "21:00" },
  { id: "21:30", value: "21:30", text: "21:30" },
  { id: "22", value: "22", text: "22:00" },
  { id: "22:30", value: "22:30", text: "22:30" },
  { id: "23", value: "23", text: "23:00" },
  { id: "23:30", value: "23:30", text: "23:30" },
];

export const listSimbol: ItemListParams[] = [
  {
    id: "GREATER_THAN",
    value: "GREATER_THAN",
    text: "> (Greater Than)",
    metaData: { shortText: ">" },
  },
  {
    id: "LESS_THAN",
    value: "LESS_THAN",
    text: "< (Less Than)",
    metaData: { shortText: "<" },
  },
  {
    id: "EQUAL",
    value: "EQUAL",
    text: "= (Equal)",
    metaData: { shortText: "=" },
  },
  {
    id: "LESS_THAN_OR_EQUAL",
    value: "LESS_THAN_OR_EQUAL",
    text: "≤ (Less Than Equal)",
    metaData: { shortText: "≤" },
  },
  {
    id: "GREATER_THAN_OR_EQUAL",
    value: "GREATER_THAN_OR_EQUAL",
    text: "≥ (Greater Than Equal)",
    metaData: { shortText: "≥" },
  },
];

export const listStatusCampaign: ItemListParams[] = [
  { id: "ALL", value: "ALL", text: "ALL STATUS" },
  { id: "ACTIVE", value: "ACTIVE", text: "ACTIVE" },
  { id: "PAUSED", value: "PAUSED", text: "PAUSED" },
];

export const periodParam: ItemListParams[] = [
  { id: "today", value: "today", text: "Today" },
  { id: "yesterday", value: "yesterday", text: "Yesterday" },
  { id: "last_3d", value: "last_3d", text: "Last 3 Day" },
  {
    id: "last_3d_today",
    value: "last_3d_today",
    text: "Last 3 Days (Include Today)",
  },
  { id: "last_7d", value: "last_7d", text: "Last 7 Days" },
  {
    id: "last_7d_today",
    value: "last_7d_today",
    text: "Last 7 Days (Include Today)",
  },
  { id: "this_month", value: "this_month", text: "This Month" },
  { id: "last_month", value: "last_month", text: "Last Month" },
];

export const listMetric: ItemListParams[] = [
  {
    id: "purchaseValue",
    value: "purchaseValue",
    text: "Purchase Value",
    metaData: {
      mode: ["campaign", "view"],
      period: "",
      operation: "",
      value: "",
    },
  },
  {
    id: "roas",
    value: "roas",
    text: "ROAS",
    metaData: {
      mode: ["campaign", "view"],
      period: "",
      operation: "",
      value: "",
    },
  },
  {
    id: "cpl",
    value: "cpl",
    text: "Cost Per Goal",
    metaData: {
      period: "",
      mode: ["campaign", "view"],
      operation: "",
      value: "",
    },
  },
  {
    id: "spends",
    value: "spends",
    text: "Spent",
    metaData: {
      period: "",
      operation: "",
      mode: ["campaign", "view"],
      value: "",
    },
  },
  {
    id: "cpm",
    value: "cpm",
    text: "CPM",
    metaData: {
      period: "",
      operation: "",
      mode: ["campaign", "view"],
      value: "",
    },
  },
  {
    id: "cpc",
    value: "cpc",
    text: "CPC (Link Click)",
    metaData: {
      period: "",
      operation: "",
      mode: ["campaign", "view"],
      value: "",
    },
  },
  {
    id: "ctr",
    value: "ctr",
    text: "CTR (Link Click)",
    metaData: {
      period: "",
      operation: "",
      mode: ["campaign", "view"],
      value: "",
    },
  },
  {
    id: "ctr_all",
    value: "ctr_all",
    text: "CTR All",
    metaData: {
      period: "",
      operation: "",
      mode: ["campaign", "view"],
      value: "",
    },
  },
  {
    id: "goal_events",
    value: "goal_events",
    text: "Goal Events",
    metaData: {
      period: "",
      operation: "",
      mode: ["campaign", "view"],
      value: "",
    },
  },
  {
    id: "ageCampaign",
    value: "ageCampaign",
    text: "Campaign Age",
    metaData: {
      operation: "",
      mode: ["campaign"],
      value: "",
    },
  },
  {
    id: "campaignStatus",
    value: "campaignStatus",
    text: "Campaign Status",
    metaData: {
      operation: "EQUAL",
      mode: ["campaign"],
      isViewBased: false,
      value: "",
    },
  },
  {
    id: "time",
    value: "time",
    text: "Time",
    metaData: {
      operation: "",
      mode: ["campaign", "view"],
      hour: "",
      minute: "",
      weekdays: [],
    },
  },
];

export const actionList: ItemListParams[] = [
  { id: generateRandomString(10), value: "start", text: "Start Campaign" },
  { id: generateRandomString(10), value: "pause", text: "Pause Campaign" },
  {
    id: generateRandomString(10),
    value: "set_daily_budget",
    text: "Set Campaign Initial Budget",
  },
  { id: generateRandomString(10), value: "restart", text: "Restart Campaign" },
  {
    id: generateRandomString(10),
    value: '["start","set_daily_budget"]',
    text: "Start Campaign and Initial Budget",
  },
];
