import type { Meta, StoryObj } from "@storybook/react";
import PerformanceDashboard from "./PerformanceDashboard";
import generateRandomCardData from "@/shared/sample/card";
import { generateChartOption } from "@/shared/sample/chart";

const meta: Meta<typeof PerformanceDashboard> = {
  component: PerformanceDashboard,
};

export default meta;
type Story = StoryObj<typeof PerformanceDashboard>;

export const PerformanceDashboardSample: Story = {
  args: {
    cardComposition: generateRandomCardData(6),
    chartOptions: {
      height: "230px",
      option: generateChartOption(14),
    },
  },
  render: (args) => (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
      <PerformanceDashboard {...args} />
    </div>
  ),
};
