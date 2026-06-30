import React from 'react';
import { InputField as InputFieldType } from '@/types/simulator';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Currency } from '@/context/CurrencyContext';

interface InputFormProps {
  fields: InputFieldType[];
  values: Record<string, number | string>;
  onChange: (name: string, value: number | string) => void;
  currency: Currency;
}

export function InputForm({ fields, values, onChange, currency }: InputFormProps) {

  return (
    <div className="space-y-6">
      {fields.map((field) => {
        const val = values[field.name] ?? field.defaultValue.toString();

        if (field.type === 'slider') {
          return (
            <div key={field.name} className="py-2">
              <Slider
                label={field.label}
                value={Number(val)}
                min={field.min ?? 0}
                max={field.max ?? 100}
                step={field.step ?? 1}
                prefixStr={(field.prefix === '₹' || field.prefix === '$' || field.prefix === 'AED') ? currency.symbol : field.prefix}
                suffixStr={field.suffixStr}
                onChangeValue={(v) => onChange(field.name, v)}
              />
            </div>
          );
        }

        if (field.type === 'select' && field.options) {
          return (
            <Select
              key={field.name}
              label={field.label}
              value={val}
              options={field.options.map((o) => ({ label: o.label, value: o.value }))}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        }

        return (
          <Input
            key={field.name}
            type="number"
            label={field.label}
            value={val}
            min={field.min}
            max={field.max}
            step={field.step}
            prefixStr={(field.prefix === '₹' || field.prefix === '$' || field.prefix === 'AED') ? currency.symbol : field.prefix}
            suffixStr={field.unit}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        );
      })}
    </div>
  );
}
