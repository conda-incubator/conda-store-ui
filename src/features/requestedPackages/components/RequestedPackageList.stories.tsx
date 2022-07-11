import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { RequestedPackageList } from './RequestedPackageList';

export default {
  component: RequestedPackageList,
} as ComponentMeta<typeof RequestedPackageList>;

const packageList = [
  "numpy>=4.7",
  "pandas<=3.8.1",
  "python>=1.1",
  { pip: ["test"] }
];

export const Primary: ComponentStory<typeof RequestedPackageList> = () => (
  <RequestedPackageList packageList={packageList} />
);
