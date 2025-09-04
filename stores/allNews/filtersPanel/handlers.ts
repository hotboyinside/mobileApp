import { createEffect } from "effector";
import {
  postUserKeywordRequest,
  PostKeywordResponse,
} from "@/config/api/userKeywordsApi";
import { KeywordFromClient } from "@/types/keywords";
import { AxiosResponse } from "axios";
import { addKeyword } from "./keywords/model";

export const postKeywordFx = createEffect<
  KeywordFromClient,
  PostKeywordResponse
>(async keyword => {
  const response: AxiosResponse<PostKeywordResponse> =
    await postUserKeywordRequest(keyword);
  return response.data;
});

postKeywordFx.done.watch(({ result }) => {
  addKeyword(result.result.keyword);
});
