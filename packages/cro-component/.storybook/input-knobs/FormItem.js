import React from 'react';
import { Checkbox, Input, InputNumber, Select } from 'antd';
import { getDataType } from './utils';

const FormItem = ({ schema, value, onChange }) => {
  const dataType = getDataType(schema);

  switch (dataType) {
    case 'boolean':
      return <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />;
    case 'string':
      return <Input value={value} onChange={(e) => onchange(e.target.value)} />;
    case 'number':
      return (
        <InputNumber
          value={value}
          min={schema.min}
          max={schema.max}
          onChange={(e) => onChange(e)}
        />
      );
    case 'enum':
      return (
        <Select value={value} onSelect={(e) => onChange(e)}>
          {schema.enum.map((v) => (
            <Select.Option key={v} value={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      );
    case 'array':
      return '暂不支持配置数组';
    case 'object':
      return '暂不支持配置对象';
    default:
      return dataType;
  }
};

export default FormItem;
