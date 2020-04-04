import React from 'react';
import { JSONSchema7 } from 'json-schema';
export declare type Component<T> = React.ComponentType<T> & {
    schema?: JSONSchema7;
};
