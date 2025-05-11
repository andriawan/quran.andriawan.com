import type { Meta, StoryObj } from "@storybook/react";
import RobotRulesComposer from "./RobotRulesComposer";
import generateRandomRobotData from "@/shared/sample/robot";
import { useState } from "react";

const meta: Meta<typeof RobotRulesComposer> = {
  component: RobotRulesComposer,
};

export default meta;
type Story = StoryObj<typeof RobotRulesComposer>;

export const RobotRulesComposerSample: Story = {
  args: {
    onRemove: () => {
      alert("remove");
    },
  },
  render: (args) => {
    const [robot, setRobotState] = useState(generateRandomRobotData());
    return (
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
        <RobotRulesComposer
          {...args}
          list={robot.condition?.conditions ?? []}
          onRobotRulesChange={(rule) => {
            setRobotState({ ...robot, condition: rule });
          }}
          rule={robot.condition}
        />
      </div>
    );
  },
};
