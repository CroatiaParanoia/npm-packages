import React, { useState } from 'react';
import { Table } from 'antd';
import FormItem from './FormItem';
import { getDataType } from './utils';

// 参数，说明，类型，默认值，当前值
const createColumns = (schema, onChange) => {
  return [
    {
      title: '参数',
      dataIndex: 'paramName'
    },
    {
      title: '说明',
      dataIndex: 'desc'
    },
    {
      title: '类型',
      dataIndex: 'type'
    },
    {
      title: '默认值',
      dataIndex: 'default'
    },
    {
      title: '当前值',
      dataIndex: 'value',
      render(currentValue, item) {
        const { paramName } = item;
        const onChangeFn = onChange.bind(null, paramName);
        return (
          <FormItem
            key={paramName}
            propsKey={paramName}
            schema={schema[paramName]}
            onChange={onChangeFn}
            value={currentValue}
          />
        );
      }
    }
  ];
};

const combineDataSource = (schema, dataSource) => {
  return Object.entries(schema).map(([key, value]) => {
    return {
      key,
      paramName: key,
      desc: value.title,
      type: getDataType(value),
      default: String(value.default),
      value: dataSource[key] || value.default
    };
  });
};

const SchemaTable = ({ schema, dataSource, onChange }) => {
  const column = React.useMemo(() => {
    return createColumns(schema, onChange);
  }, [schema, onChange]);

  const source = React.useMemo(() => {
    return combineDataSource(schema, dataSource);
  }, [schema, dataSource]);

  return <Table dataSource={source} columns={column} pagination={false} />;
};

export default SchemaTable;
