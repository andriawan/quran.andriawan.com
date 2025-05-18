import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Card> = {
  component: Card,
  title: "Portofolio/ctr.id",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardDashboard: Story = {
  args: {
    label: "Ads Spent",
    amount: 9_000_200_000,
    amounType: "currency",
    percentage: 30.33,
  },
  render: (args) => (
    <div className="flex flex-col justify-center items-center">
      <div className="w-48">
        <Card {...args} />
      </div>
    </div>
  ),
};

export const CardDashboardLoading: Story = {
  args: {
    isLoading: true,
    label: "Ads Spent",
    amount: 9_000_200_000,
    percentage: 30.33,
    comparedPercentage: 10.33,
  },
  render: (args) => (
    <div className="flex flex-col justify-center items-center">
      <div className="w-48">
        <Card {...args} />
      </div>
    </div>
  ),
};
