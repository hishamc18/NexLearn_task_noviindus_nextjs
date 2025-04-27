"use client";

import Image from "next/image";
import { IoMdArrowDropright } from "react-icons/io";

interface ComprehensionButtonProps {
  onClick: () => void;
}

export default function ComprehensionButton({ onClick }: ComprehensionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#177A9C] hover:bg-[#2894B9] text-white font-medium text-[14px] px-2 py-2 rounded-md transition flex items-center justify-between w-full"
    >
      <div className="flex items-center gap-3">
        <Image
          src="/exam/comprehensionLogo.svg"
          alt="Book Icon"
          width={20}
          height={20}
          className="comprehension-icon"
        />
        Read Comprehensive Paragraph
      </div>

      <IoMdArrowDropright className="text-white w-5 h-5 ml-1" />
    </button>
  );
}
