import clone from "just-clone";
import type Robot from "../entity/robot";

export default function generateRandomRobotData() {
  const robot: Robot = {
    open: false,
    operation: "AND",
    condition: {
      operation: "AND",
      value: "",
      metricValue: "",
      conditions: [],
    },
  };
  return clone(robot);
}
