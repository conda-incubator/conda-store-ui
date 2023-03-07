import { addDecorator } from "@storybook/react"
import { themeDecorator } from "../src/theme"

export const parameters = {
  options: {
    storySort: {
      order: ['Introduction'], 
    },
  },
}

addDecorator(themeDecorator);
