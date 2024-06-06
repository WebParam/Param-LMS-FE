"use server";
import { get, post } from "../utils";
import { wQuizGenerateUrl, rQuizUrl } from "./endpoints";
import { Diagnostic } from "../logger/logger";

export const getQuizzes = async (paraphraseId: string) => {
  try {
    const resp = await get(
      `${rQuizUrl}/Quizzes/ListQuizzes?paraphraseId=${paraphraseId}`
    );
    Diagnostic("SUCCESS ON GET, returning", resp.data);
    return resp.data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const generateQuizzes = async (paraphraseId: string, text: string) => {
  try {
    const resp = await post(`${wQuizGenerateUrl}/Quiz/generate`, {
      paraphraseId,
      text,
    });
    Diagnostic("SUCCESS ON POST, returning", resp);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }
};
