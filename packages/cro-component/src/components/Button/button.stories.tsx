import React from 'react';
import Button from './button';
import {
  ComponentWrapper,
  createParameter,
  createStoryElement
} from './../../../.storybook/input-knobs';

export default {
  title: 'Button',
  decorators: [ComponentWrapper],

  ...createParameter({ schema: Button.schema, component: Button })
};

export const defaultBtn = createStoryElement(Button, { disabled: false }, 666);
export const disabledBtn = createStoryElement(Button, { disabled: true }, 666);
export const primaryBtn = createStoryElement(Button, { type: 'primary' }, 666);

export const withEmoji = createStoryElement(
  Button,
  { disabled: false },
  <span role="img" aria-label="so cool">
    😀 😎 👍 💯
  </span>
);
