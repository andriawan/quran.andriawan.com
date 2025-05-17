import type { ItemListParams } from "@/app/components/Select";

export type operationType = "AND" | "OR";
export interface Rule {
  ruleName?: string;
  description?: string;
  descriptionDetail?: string;
  action: string[];
  actionText?: string;
  actionId?: string;
  open?: boolean;
  id?: string;
  label?: string;
  condition: RuleCondition;
}

export default interface RuleCondition {
  id: string;
  operation?: operationType | string;
  value?: string;
  metricValue?: string;
  period?: string;
  periodText?: string;
  metricText?: string;
  hour?: number | string;
  minute?: number | string;
  weekdays?: ItemListParams[];
  operationText?: string;
  timeText?: string;
  timeValue?: string;
  statusCampaignText?: string;
  conditions?: RuleCondition[];
}
