import type { Meta, StoryObj } from '@storybook/react';
import { Button as Component } from '@/components/ui/button';

export default {
  component: Component,
  args: {
    variant: "default",
    children: "Button"
  },
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
