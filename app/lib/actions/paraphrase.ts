"use server";
import { get } from "../utils";
import { rCourseUrl } from "./endpoints";
import { unstable_noStore as noStore } from "next/cache";
import { IResponseObject } from "@/app/lib/restapi/response";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";

export const getParaphrases = async (id: string) => {
  noStore();
  try {
    const resp = await get(`${rCourseUrl}/Paraphrase/${id}`);
    return resp.map(
      (res: IResponseObject<IParaPhraseResponseObject[]>) => res.data
    );
  } catch (error) {
    throw error;
  }
};