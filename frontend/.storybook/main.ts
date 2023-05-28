import type { StorybookConfig } from "@storybook/nextjs"
import * as path from "node:path"

const config: StorybookConfig = {
  stories: ["stories/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/nextjs",
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/lib': path.resolve(__dirname, '../lib'),
      '@/components': path.resolve(__dirname, '../components'),
    }
    return config
  }
}
export default config
