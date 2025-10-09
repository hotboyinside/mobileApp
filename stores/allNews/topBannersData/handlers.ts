import { createEffect } from "effector";

import {
  topBannersAddDocsEvent,
  topBannersAddDocEvent,
  topBannersSetDefaultStateEvent,
} from "./model";
import {
  getNewsRequest,
  IParamsGetNews,
  NewsTypesOrigins,
} from "@/config/api/newsApi";
import { getTimestampOfStartOfTheDay } from "@/helpers/date/getTimestampOfStartOfTheDay";
import { INews } from "@/types/news";

export const topBannersGetNewsFx = createEffect(
  async (params: IParamsGetNews) => {
    try {
      const news = await getNewsRequest(params);
      return news;
    } catch (error) {
      console.error(error);
      return;
    }
  }
);

export const handleTopBannersGetNews = async () => {
  const news = await topBannersGetNewsFx({
    typeOrigin: NewsTypesOrigins.News,
    start: getTimestampOfStartOfTheDay(),
    limit: 0,
    startFromOppositeSide: false,
  });

  const gettingNews = news?.data.success.docs;

  if (gettingNews) {
    handleTopBannersAddDocs({ docs: gettingNews });
  }
};

export const handleFetchedNewsFromSse = (event: MessageEvent) => {
  const parsedNews = JSON.parse(event.data);

  const newsToAdd = parsedNews.filter(
    (news: INews) => news.types.origin === NewsTypesOrigins.News
  );

  newsToAdd.forEach((news: INews) => {
    handleTopBannersAddDoc({ doc: news });
  });
};

export const handleTopBannersAddDocs = ({ docs }: { docs: INews[] }) => {
  topBannersAddDocsEvent({ docs });
};

export const handleTopBannersAddDoc = ({ doc }: { doc: INews }) => {
  topBannersAddDocEvent({ doc });
};

export const handleSetDefaultStateForTopBannersNews = () => {
  topBannersSetDefaultStateEvent();
};
