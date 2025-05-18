import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { useState } from "react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Select> = {
  component: Select,
  title: "Common Components/Select",
};

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectStory: Story = {
  args: {
    data: [
      {
        id: "1",
        text: "Option 1",
        subText: "Option 1 lorem ipsum dolor sit amet",
        value: "option1",
      },
      {
        id: "2",
        text: "Option 2 lorem ipsum dolor sit amet",
        value: "option2",
      },
      {
        id: "3",
        text: "Option 3",
        value: "option3",
      },
      {
        id: "4",
        text: "Option 4",
        value: "option4",
      },
      {
        id: "5",
        text: "Option 5",
        value: "option5",
      },
      {
        id: "6",
        text: "Option 6",
        value: "option6",
      },
      {
        id: "7",
        text: "Option 7",
        value: "option7",
      },
      {
        id: "8",
        text: "Option 8",
        value: "option8",
      },
      {
        id: "9",
        text: "Option 9",
        value: "option9",
      },
      {
        id: "10",
        text: "Option 10",
        value: "option10",
      },
      {
        id: "11",
        text: "Option 11",
        value: "option11",
      },
      {
        id: "12",
        text: "Option 12",
        value: "option12",
      },
      {
        id: "13",
        text: "Option 13",
        value: "option13",
      },
      {
        id: "14",
        text: "Option 14",
        value: "option14",
      },
    ],
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.data[0]);
    return (
      <Select
        {...args}
        selected={selected}
        onSelected={(item) => setSelected(item)}
      />
    );
  },
};

export const SelectMultipleStory: Story = {
  args: {
    data: [
      {
        id: "1",
        text: "Option 1",
        subText: "Option 1 lorem ipsum dolor sit amet",
        value: "option1",
      },
      {
        id: "2",
        text: "Option 2 lorem ipsum dolor sit amet",
        value: "option2",
      },
      {
        id: "3",
        text: "Option 3",
        value: "option3",
      },
      {
        id: "4",
        text: "Option 4",
        value: "option4",
      },
      {
        id: "5",
        text: "Option 5",
        value: "option5",
      },
      {
        id: "6",
        text: "Option 6",
        value: "option6",
      },
      {
        id: "7",
        text: "Option 7",
        value: "option7",
      },
      {
        id: "8",
        text: "Option 8",
        value: "option8",
      },
    ],
  },
  render: (args) => {
    const [selected, setSelected] = useState([args.data[0]]);
    return (
      <Select
        {...args}
        selected={selected}
        multiple
        onSelected={(item) => setSelected([item, ...selected])}
      />
    );
  },
};
