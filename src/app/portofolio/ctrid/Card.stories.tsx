import type { Meta, StoryObj } from "@storybook/react";
import Card from "./card";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardDashboard: Story = {
  args: {
    bgCard: "bg-green-400",
    amountClass: "text-blue-500",
  },
  render: (args) => (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-48">
        <Card {...args} />
      </div>
    </div>
  ),
};
