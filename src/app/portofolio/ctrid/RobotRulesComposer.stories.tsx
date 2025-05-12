import type { Meta, StoryObj } from "@storybook/react";
import RobotRulesComposer from "./RobotRulesComposer";
import { generateRandomRulesDataWithJotai } from "@/shared/sample/rules";

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
    atomRule: generateRandomRulesDataWithJotai(),
  },
  render: (args) => {
    return (
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
        <RobotRulesComposer {...args} />
      </div>
    );
  },
};
