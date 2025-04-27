"use client";

import * as RadioGroup from '@radix-ui/react-radio-group';
import OptionItem from "../QuestionSection/OptionsItem";
import { Option } from "@/types/exam.types";

interface OptionListProps {
  options: Option[];
  selectedOptionId: number | null;
  onSelectOption: (optionId: number) => void;
}

export default function OptionList({ options, selectedOptionId, onSelectOption }: OptionListProps) {
  return (
    <RadioGroup.Root
      className="flex flex-col gap-4"
      value={selectedOptionId?.toString() || ''}
      onValueChange={(value) => onSelectOption(Number(value))}
    >
      {options.map((opt) => (
        <OptionItem
          key={opt.id}
          value={opt.id.toString()}
          label={opt.option}
          selected={selectedOptionId === opt.id}
        />
      ))}
    </RadioGroup.Root>
  );
}
