import React, { useState } from 'react';

import addons, { makeDecorator } from '@storybook/addons';
import { GET_SCHEMA, UPDATE_STATE } from './constant';
export default makeDecorator({
  name: 'componentWrapper',
  parameterName: 'component',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    const Target = getStory(context);
    const [props, setProps] = useState({});

    React.useEffect(() => {
      const listener = (data) => {
        setProps(data);
      };
      channel.on(UPDATE_STATE, listener);
      return () => {
        channel.removeListener(UPDATE_STATE, listener);
      };
    }, [channel, setProps]);

    React.useEffect(() => {
      const { schema } = parameters;
      channel.emit(GET_SCHEMA, schema);
    }, [parameters]);

    return React.createElement(Target, props);
  }
});
