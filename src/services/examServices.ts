// examServices.ts

import axiosInstance from "@/lib/axios"; 
import type { ListQuestionsResponse, SubmitAnswersRequest, SubmitAnswersResponse } from "@/types/exam.types";

// Fetch all exam questions
export const fetchQuestions = async (): Promise<ListQuestionsResponse> => {
  const response = await axiosInstance.get<ListQuestionsResponse>("/question/list");
  return response.data;
};

// Submit exam answers
export const submitAnswers = async (payload: SubmitAnswersRequest): Promise<SubmitAnswersResponse> => {
  const formData = new FormData();
  formData.append("answers", JSON.stringify(payload.answers));
  const response = await axiosInstance.post<SubmitAnswersResponse>("/answers/submit", formData, {
  });
  return response.data;
};
