import type { Meta, StoryObj } from "@storybook/react";
import Chart from "./Chart";
import { generateChartOption } from "@/shared/sample/chart";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Chart> = {
  component: Chart,
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const ChartDashboard: Story = {
  args: {
    height: "500px",
    option: generateChartOption(),
  },
  render: (args) => (
    <div className="flex flex-col justify-center items-center bg-[#1E1F31] rounded">
      <div className="w-[100%] h-[500px]">
        <Chart {...args} />
      </div>
    </div>
  ),
};
