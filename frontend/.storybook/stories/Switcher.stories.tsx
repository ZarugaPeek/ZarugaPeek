import type { Meta, StoryObj } from '@storybook/react';
import { Switcher as Component } from '@/components/switch';

export default {
  component: Component,
  args: {},
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Primary: Story = {};
