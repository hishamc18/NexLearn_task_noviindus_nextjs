"use client";

import { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function PrimaryButton({ text, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-[#1C3141] hover:bg-[#25465D] font-poppins text-white py-3 rounded-md transition-all duration-200 text-[15px] font-semibold"
    >
      {text}
    </button>
  );
}
