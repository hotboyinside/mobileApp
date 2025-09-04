import { USERS_KEYWORDS } from "@/constants/apiRoutes";
import { api } from "./axios";
import { KeywordFromClient, UserKeyword } from "@/types/keywords";

export interface PostKeywordResponse {
  result: {
    keyword: UserKeyword;
  };
}

export const postUserKeywordRequest = (data: KeywordFromClient) => {
  return api.post(USERS_KEYWORDS, data);
};
