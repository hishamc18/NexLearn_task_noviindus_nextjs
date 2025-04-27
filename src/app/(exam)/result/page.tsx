"use client";

import ResultStats from "@/components/Exam/Result/ResultStats";
import { useSelector } from "react-redux";
import { selectExam } from "@/redux/slices/examSlice";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/Common/PrimaryButton";
import Loader from "@/components/Common/Loader";

export default function Page() {
    const exam = useSelector(selectExam);
    const router = useRouter();

    if (exam.score === null) return null;

    const totalQuestions = (exam.correct ?? 0) + (exam.wrong ?? 0) + (exam.notAttended ?? 0);

    if(exam.loading){
      return <Loader />
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center px-4 bg-[#F6FBFF]">
            {/* Top Card */}
            <div className="bg-gradient-to-b from-[#32748F] to-[#20445A] rounded-2xl max-w-md w-full text-white text-center px-8 py-10 shadow-lg">
                <p className="text-base font-medium mb-3">Marks Obtained:</p>
                <h1 className="text-6xl font-bold">{exam.score} / 100</h1>
            </div>

            {/* Details */}
            <div className="rounded-2xl w-full max-w-md px-1 py-6 flex flex-col gap-4">
                <ResultStats icon="/exam/question.svg" bg="bg-[#F6C041]" label="Total Questions:" value={totalQuestions} />
                <ResultStats
                    icon="/exam/question.svg"
                    bg="bg-[#4CAF50]"
                    label="Correct Answers:"
                    value={String(exam.correct ?? 0).padStart(3, "0")}
                />
                <ResultStats
                    icon="/exam/question.svg"
                    bg="bg-[#FF4C4C]"
                    label="Incorrect Answers:"
                    value={String(exam.wrong ?? 0).padStart(3, "0")}
                />
                <ResultStats
                    icon="/exam/question.svg"
                    bg="bg-[#757575]"
                    label="Not Attended Questions:"
                    value={String(exam.notAttended ?? 0).padStart(3, "0")}
                />
            </div>

            {/* Done Button */}
            <div className="w-full max-w-md">
                <PrimaryButton text="Done" onClick={() => router.push("/instruction")} />
            </div>
        </div>
    );
}


