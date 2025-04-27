"use client"

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestionsThunk, selectExam, submitExamAnswersThunk } from "@/redux/slices/examSlice";
import QuestionBoard from "@/components/Exam/QuestionSection/QuestionBoard";
import QuestionNavigator from "@/components/Exam/Navigator/QuestionNavigator";
import SubmitModal from "@/components/Exam/Modal/SubmitModal";
import { useRouter } from "next/navigation";
import Loader from "@/components/Common/Loader";
import mapInitialToUnanswered from "@/lib/helper";

export default function Page() {
    const dispatch = useAppDispatch();
    const { questions, loading, totalTime } = useAppSelector(selectExam);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number | null>>({});
    const [status, setStatus] = useState<Record<number, "answered" | "unanswered" | "review" | "initial">>({});
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState<string>("00:00");
    const router = useRouter();

    // Fetch questions on mount
    useEffect(() => {
        dispatch(fetchQuestionsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (questions.length > 0) {
            const initAnswers: Record<number, number | null> = {};
            const initStatus: Record<number, "answered" | "unanswered" | "review" | "initial"> = {};
            questions.forEach((q) => {
                initAnswers[q.question_id] = null;
                initStatus[q.question_id] = "initial";
            });

            setAnswers(initAnswers);
            setStatus(initStatus);
        }
    }, [questions]);

    const handleSelectOption = (optionId: number) => {
        const qid = questions[currentIndex].question_id;
        setAnswers((prev) => ({ ...prev, [qid]: optionId }));
        setStatus((prev) => ({ ...prev, [qid]: "answered" }));
    };

    const handleNext = () => {
        const qid = questions[currentIndex].question_id;
        if (answers[qid] === null && status[qid] !== "review") {
            setStatus((prev) => ({ ...prev, [qid]: "unanswered" }));
        }
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            handleSubmitExam();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleMarkForReview = () => {
        const qid = questions[currentIndex].question_id;
        setStatus((prev) => ({ ...prev, [qid]: "review" }));
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handleQuestionClick = (index: number) => {
        setCurrentIndex(index);
    };

    const handleSubmitExam = () => {
        setSubmitModalOpen(true);
    };

    const realSubmitExam = () => {
        const formattedAnswers = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
            question_id: Number(questionId),
            selected_option_id: selectedOptionId,
        }));
        dispatch(submitExamAnswersThunk({ answers: formattedAnswers }));
        setSubmitModalOpen(false);
        router.push("/result");
    };

    if(loading){
        return <Loader />
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-1 flex-col md:flex-row gap-6 p-6 overflow-hidden">
                {/* Left side - Question */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex text-[16px] w-full justify-between items-center mb-3">
                        <h2 className="font-semibold">Ancient Indian History MCQ</h2>
                        <div className="bg-white px-2 border rounded-sm">
                            <h2 className="font-medium">
                                {questions.length > 0 ? `${currentIndex + 1} / ${questions.length}` : "0 / 0"}
                            </h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center flex-1">
                            <p className="text-xl font-semibold">Loading Questions...</p>
                        </div>
                    ) : (
                        questions.length > 0 && (
                            <div className="flex-1 overflow-auto">
                                <QuestionBoard
                                    question={questions[currentIndex]}
                                    selectedOptionId={answers[questions[currentIndex].question_id] ?? null}
                                    onSelectOption={handleSelectOption}
                                    onNext={handleNext}
                                    onPrevious={handlePrevious}
                                    onMarkForReview={handleMarkForReview}
                                    isLast={currentIndex === questions.length - 1}
                                />
                            </div>
                        )
                    )}
                </div>

                <div className="md:border-r border-b-2 md:border-b-0 border-[#E9EBEC]"></div>

                {/* Right side - Navigator */}
                <div className="w-full md:w-1/3 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-auto">
                        <QuestionNavigator
                            questions={questions}
                            activeIndex={currentIndex}
                            status={mapInitialToUnanswered(status)}
                            onQuestionClick={handleQuestionClick}
                            totalTime={totalTime}
                            onTimeUp={handleSubmitExam}
                            onTimeUpdate={(timeString) => setRemainingTime(timeString)} 

                        />
                    </div>
                </div>
            </div>

            {/* Submit Modal */}
            <SubmitModal
                open={submitModalOpen}
                onClose={() => setSubmitModalOpen(false)}
                onConfirm={realSubmitExam}
                remainingTime={remainingTime} // <-- USING DYNAMIC TIME
                totalQuestions={questions.length}
                answered={Object.values(status).filter((s) => s === "answered").length}
                review={Object.values(status).filter((s) => s === "review").length}
            />
        </div>
    );
}
