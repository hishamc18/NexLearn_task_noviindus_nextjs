"use client";

import * as RadioGroup from '@radix-ui/react-radio-group';

interface OptionItemProps {
  value: string;
  label: string;
  selected: boolean;
}

export default function OptionItem({ value, label, selected }: OptionItemProps) {
  return (
    <RadioGroup.Item
      value={value}
      className={`flex justify-between items-center p-3 rounded-lg border transition ${
        selected ? 'bg-blue-50 border-[#1C3141]' : 'bg-white hover:bg-gray-100'
      }`}
    >
      <span className="text-base">{label}</span>
      <div className="flex items-center justify-center w-4 h-4 rounded-full border border-[#1C3141]">
        <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-[#1C3141]" />
      </div>
    </RadioGroup.Item>
  );
}
