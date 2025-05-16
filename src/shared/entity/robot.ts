export type operationType = "AND" | "OR";
export type actionType = "start" | "set_daily_budget" | "restart" | "pause";

export interface Rule {
  ruleName?: string;
  description?: string;
  descriptionDetail?: string;
  action: actionType[]
  open?: boolean;
  id?: string;
  label?: string;
  condition: RuleCondition;
}

export default interface RuleCondition {
  id: string;
  operation?: operationType;
  value?: string;  
  metricValue?: string;
  conditions?: RuleCondition[];
}
