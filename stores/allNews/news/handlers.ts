import { IParamsGetNews, getNewsRequest } from "@/config/api/newsApi";
import { createEffect } from "effector";
import { INews } from "./model";

export const fetchNewsFx = createEffect<IParamsGetNews, INews[]>(
  async params => {
    const response = await getNewsRequest(params);
    return response.data.success.docs;
  }
);

export const loadMoreNewsFx = createEffect<IParamsGetNews, INews[]>(
  async params => {
    const response = await getNewsRequest(params);
    return response.data.success.docs;
  }
);
