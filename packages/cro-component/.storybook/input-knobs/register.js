import React from 'react';
import { addons, types } from '@storybook/addons';
import { useChannel, useParameter } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { ADDON_ID, PANEL_KEY, PANEL_ID, GET_SCHEMA, UPDATE_STATE } from './constant';
import SchemaTable from './SchemaTable';
import produce from 'immer';
import 'antd/dist/antd.css';

const Panel = () => {
  const { props } = useParameter('component', { props: {} });
  const [schema, setSchema] = React.useState({});
  const emit = useChannel({
    [GET_SCHEMA]: (v) => {
      setSchema(v);
    }
  });

  const propsSchema = React.useMemo(() => {
    return schema.properties ? schema.properties.input.properties : {};
  }, [schema]);

  const schemaDataSource = React.useMemo(() => {
    return Object.entries(propsSchema).reduce((pre, [key, value]) => {
      return {
        ...pre,
        [key]: value.default
      };
    }, {});
  }, [propsSchema]);

  const [dataSource, setDataSource] = React.useState(schemaDataSource);

  const updDataSource = React.useCallback(
    (key, value) => {
      setDataSource((pre) => {
        const newDataSource = produce(pre, (draftState) => {
          draftState[key] = value;
        });
        return newDataSource;
      });
    },
    [setDataSource]
  );

  React.useEffect(() => {
    setDataSource({
      ...schemaDataSource,
      ...props
    });
  }, [schemaDataSource, props, setDataSource]);

  React.useEffect(() => {
    emit(UPDATE_STATE, dataSource);
  }, [dataSource, emit]);

  return <SchemaTable schema={propsSchema} dataSource={dataSource} onChange={updDataSource} />;
};

addons.register(ADDON_ID, () => {
  // Also need to set a unique name to the panel.
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_KEY,
    paramKey: PANEL_KEY,
    render: ({ active, key }) => {
      return (
        <AddonPanel key={key} active={active}>
          <Panel />
        </AddonPanel>
      );
    }
  });
});
