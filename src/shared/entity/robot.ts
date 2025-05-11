export type operationType = "AND" | "OR";

export interface Rule {
  id?: string;
  label?: string;
  operation?: operationType;
  value?: string;
  metricValue?: string;
  conditions?: Rule[];
}

export default interface Robot {
  open: boolean;
  operation: operationType;
  condition: Rule;
}
