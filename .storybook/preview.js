import { addParameters, addDecorator } from "@storybook/react"
import { themeDecorator } from "../src/theme"
import { DocsPage, DocsContainer } from '@storybook/addon-docs';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addDecorator(themeDecorator);
