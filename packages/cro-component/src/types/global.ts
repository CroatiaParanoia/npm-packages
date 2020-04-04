import React from 'react';
import { JSONSchema7 } from 'json-schema';

export type Component<T> = React.ComponentType<T> & {
  schema?: JSONSchema7;
};
