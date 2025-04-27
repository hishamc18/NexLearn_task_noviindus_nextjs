"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestionsThunk } from "@/redux/slices/examSlice";
import PrimaryButton from "@/components/Common/PrimaryButton";
import Loader from "@/components/Common/Loader";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, questions, totalMarks, totalTime, instruction } = useAppSelector((state) => state.exam);

    useEffect(() => {
        dispatch(fetchQuestionsThunk());
    }, [dispatch]);

    const formatTime = (minutes: number) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs > 0 ? `${hrs}:` : ""}${mins.toString().padStart(2, "0")}:00`;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="h-screen bg-gray-100 flex flex-col items-center px-4 py-8 overflow-y-auto">
            <h1 className="text-[20px] md:text-[23px] font-poppins font-medium text-center mb-4">
                Ancient Indian History MCQ
            </h1>

            <div className="bg-PrimaryBg text-white rounded-lg p-4 w-full max-w-2xl flex flex-col md:flex-row justify-evenly items-center gap-4">
                {/* First */}
                <div className="flex flex-col items-center">
                    <span className="text-xs md:text-sm font-bold mb-1">Total MCQ&apos;s:</span>
                    <span className="text-[24px] md:text-[34px] font-medium">{questions.length}</span>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-white h-10" />

                {/* Second */}
                <div className="flex flex-col items-center">
                    <span className="text-xs md:text-sm font-bold mb-1">Total marks:</span>
                    <span className="text-[24px] md:text-[34px] font-medium">{totalMarks}</span>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-white h-10" />

                {/* Third */}
                <div className="flex flex-col items-center">
                    <span className="text-xs md:text-sm font-bold mb-1">Total time:</span>
                    <span className="text-[24px] md:text-[34px] font-medium">{formatTime(totalTime)}</span>
                </div>
            </div>

            {/* Instructions */}
            <div className="w-full max-w-2xl rounded p-2">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Instructions:</h2>
                <div className="text-PrimaryBg text-base">
                    <ol className="list-decimal list-outside text-[15px] md:leading-5 pl-6">
                        {instruction
                            .replace(/<\/?ol>/g, "")
                            .split("</li>")
                            .filter((line) => line.trim() !== "")
                            .map((line, idx) => (
                                <li
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: line.replace("<li>", "") }}
                                    className="mb-2"
                                />
                            ))}
                    </ol>
                </div>
            </div>

            {/* Start Test Button */}
            <div className="min-w-[200px] md:w-[300px] flex justify-center">
                <PrimaryButton text="Start Test" onClick={() => router.push("/examBoard")} />
            </div>
        </div>
    );
}
