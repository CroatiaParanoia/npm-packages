import React from 'react';
import Checkbox from './checkbox';
import {
  ComponentWrapper,
  createParameter,
  createStoryElement
} from './../../../.storybook/input-knobs';

export default {
  title: 'Checkbox',
  decorators: [ComponentWrapper],

  ...createParameter({ schema: Checkbox.schema })
};

export const defaultCheckbox = createStoryElement(Checkbox, { disabled: false }, 666);

export const checked = createStoryElement(Checkbox, { checked: true }, 666);

export const disabled = createStoryElement(Checkbox, { disabled: true }, 666);
