import React from 'react';

export const getDataType = (schema) => {
  if (schema.type) {
    return schema.type;
  }

  if (schema.enum) {
    return 'enum';
  }
};

export const createParameter = (obj = {}) => {
  return {
    parameters: {
      component: {
        ...obj
      }
    }
  };
};

export const createPropsParameter = (obj = {}) => {
  return createParameter({ props: { ...obj } });
};

export const createStoryElement = (component, params = {}, children = null) => {
  const fc = () => (props) => {
    return React.createElement(component, { ...params, ...props }, children);
  };

  fc.story = {
    ...createPropsParameter(params)
  };

  return fc;
};
