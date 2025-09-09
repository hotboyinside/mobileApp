import { urlJoin } from "@/helpers/route";

export const SSE_BASE_PATH = "sse/v1";

export const SSE_NEWS = urlJoin(SSE_BASE_PATH, "/news");
