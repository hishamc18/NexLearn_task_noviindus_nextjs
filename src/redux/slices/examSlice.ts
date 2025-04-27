import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { fetchQuestions, submitAnswers } from "@/services/examServices";
import type {
  ListQuestionsResponse,
  Question,
  SubmitAnswersRequest,
  SubmitAnswersResponse,
} from "@/types/exam.types";

// Async thunks
export const fetchQuestionsThunk = createAsyncThunk<ListQuestionsResponse>(
  "exam/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchQuestions();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);


export const submitExamAnswersThunk = createAsyncThunk<SubmitAnswersResponse, SubmitAnswersRequest>(
  "exam/submitAnswers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await submitAnswers(payload);
      console.log(response, "ans");
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);


// State type
interface ExamState {
  loading: boolean;
  error: string | null;
  questions: Question[];
  totalMarks: number;
  totalTime: number;
  instruction: string;
  examHistoryId: string | null;
  score: number | null;
  correct: number | null;
  wrong: number | null;
  notAttended: number | null;
  submittedAt: string | null;
  submissionDetails: SubmitAnswersResponse["details"];
}

const initialState: ExamState = {
  loading: false,
  error: null,
  questions: [],
  totalMarks: 0,
  totalTime: 0,
  instruction: "",
  examHistoryId: null,
  score: null,
  correct: null,
  wrong: null,
  notAttended: null,
  submittedAt: null,
  submissionDetails: [],
};

// Slice
export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    resetExamState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Questions
      .addCase(fetchQuestionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.questions = payload.questions;
        state.totalMarks = payload.total_marks;
        state.totalTime = payload.total_time;
        state.instruction = payload.instruction;
      })
      // .addCase(fetchQuestionsThunk.rejected, (state, { payload }: any) => {
      //   state.loading = false;
      //   state.error = payload || "Failed to fetch questions.";
      // })
      .addCase(fetchQuestionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch questions.";
      })
      

      // Submit Answers
      .addCase(submitExamAnswersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExamAnswersThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.examHistoryId = payload.exam_history_id;
        state.score = payload.score;
        state.correct = payload.correct;
        state.wrong = payload.wrong;
        state.notAttended = payload.not_attended;
        state.submittedAt = payload.submitted_at;
        state.submissionDetails = payload.details;
      })
      .addCase(submitExamAnswersThunk.rejected, (state, action ) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to submit answers.";
      });
  },
});

// Actions
export const { resetExamState } = examSlice.actions;

// Selector
export const selectExam = (state: RootState) => state.exam;

// Reducer
export default examSlice.reducer;
