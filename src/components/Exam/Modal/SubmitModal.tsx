"use client";

import Image from "next/image";
import PrimaryButton from "../../Common/PrimaryButton";

interface SubmitModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  remainingTime: string;
  totalQuestions: number;
  answered: number;
  review: number;
}

export default function SubmitModal({ open, onClose, onConfirm, remainingTime, totalQuestions, answered, review }: SubmitModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[17px] font-poppins font-medium">Are you sure you want to submit the test?</h2>
          <button onClick={onClose} className="text-gray-600 text-[30px]">×</button>
        </div>
        <hr className="mb-4" />

        <div className="flex flex-col gap-6 text-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#1C3141] p-3 rounded-sm">
              <Image src="/exam/timer.svg" width={15} height={15} alt="Timer" />
            </div>
            <span className="flex-1">Remaining Time:</span>
            <span className="font-bold">{remainingTime}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#F6C041] p-3 rounded-sm">
              <Image src="/exam/question.svg" width={15} height={15} alt="Questions" />
            </div>
            <span className="flex-1">Total Questions:</span>
            <span className="font-bold">{String(totalQuestions).padStart(3, "0")}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#4CAF50] p-3 rounded-sm">
              <Image src="/exam/question.svg" width={15} height={15} alt="Answered" />
            </div>
            <span className="flex-1">Questions Answered:</span>
            <span className="font-bold">{String(answered).padStart(3, "0")}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#800080] p-3 rounded-sm">
              <Image src="/exam/question.svg" width={15} height={15} alt="Review" />
            </div>
            <span className="flex-1">Marked for review:</span>
            <span className="font-bold">{String(review).padStart(3, "0")}</span>
          </div>
        </div>

        <PrimaryButton text="Submit Test" onClick={onConfirm}/>
      </div>
    </div>
  );
}
