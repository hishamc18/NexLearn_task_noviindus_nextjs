"use client";

import { useState } from "react";
import { Question } from "@/types/exam.types";
import ComprehensionModal from "../Modal/ComprehensionModal";
import ComprehensionButton from "./ComprehensionButton";
import OptionList from "./OptionList";
import ActionButton from "./ActionButton";

interface Props {
    question: Question;
    selectedOptionId: number | null;
    onSelectOption: (optionId: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    onMarkForReview: () => void;
    isLast: boolean;
}

export default function QuestionBoard({
    question,
    selectedOptionId,
    onSelectOption,
    onNext,
    onPrevious,
    onMarkForReview,
    isLast,
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col justify-between relative h-full">
            <div className="overflow-y-auto flex flex-col gap-4">
                {/* Comprehension Button */}
                <div className="bg-white p-4 border rounded-md flex flex-col gap-4">
                    {question.comprehension && (
                        <>
                            <div className="w-fit">
                                <ComprehensionButton onClick={() => setIsModalOpen(true)} />
                            </div>
                            {/* Modal Component */}
                            <ComprehensionModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                paragraph={question.comprehension}
                            />
                        </>
                    )}
                    {/* Question Text */}
                    <h2 className="text-[16px] font-medium">
                        {question.number}. {question.question}
                    </h2>
                </div>

                <h2 className="ml-3 text-[12px] text-gray-500 font-medium">Choose the answer:</h2>

                {/* Options */}
                <div>
                    <div className="space-y-4">
                        {question.options.length > 0 && (
                            <OptionList
                                options={question.options}
                                selectedOptionId={selectedOptionId}
                                onSelectOption={onSelectOption}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
                <ActionButton
                    onClick={onMarkForReview}
                    text="Mark for review"
                    bgColor="bg-[#800080]"
                    className="text-white"
                />
                <ActionButton
                    onClick={onPrevious}
                    text="Previous"
                    bgColor="bg-[#CECECE]"
                    disabled={question.number === 1}
                    className="text-black"
                />
                <ActionButton
                    onClick={onNext}
                    text={isLast ? "Submit" : "Next"}
                    bgColor="bg-[#1C3141]"
                    className="text-white"
                />
            </div>
        </div>
    );
}
