import "../app/globals.css"

import type { Preview } from "@storybook/react"
import { Title, Subtitle, Description, Primary, Stories } from "@storybook/blocks";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      )
    }
  },
}

export default preview
