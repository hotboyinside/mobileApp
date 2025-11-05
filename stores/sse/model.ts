import { config } from "@/config/vars";
import { SSE_NEWS } from "@/constants/apiSse";
import { createEvent, createStore, sample } from "effector";
import EventSource, { EventType } from "react-native-sse";

export const SseEvents = {
  Error: "error",
  News: "news",
  Symbols: "symbols",
} as const;

export type sseEventData = {
  data: any;
};

export const $sseNewsEventSource = createStore<EventSource | null>(null);
export const $isSseConnected = createStore(false);
export const $reconnectAttempts = createStore(0);

export const subscribeToSseEventNews = createEvent();
export const closeToSseEventNews = createEvent();
export const sseConnected = createEvent();
export const sseDisconnected = createEvent();
export const addListener = createEvent<{
  eventName: EventType<any>;
  listener: (this: EventSource, event: any) => any;
}>();

export const removeListener = createEvent<{
  eventName: EventType<any>;
  listener: (this: EventSource, event: any) => any;
}>();
export const incrementReconnectAttempts = createEvent();
export const resetReconnectAttempts = createEvent();

$isSseConnected.on(sseConnected, () => true);
$isSseConnected.on(sseDisconnected, () => false);

$reconnectAttempts.on(incrementReconnectAttempts, state => state + 1);
$reconnectAttempts.reset(resetReconnectAttempts);

$sseNewsEventSource
  .on(addListener, (es, { eventName, listener }) => {
    es?.addEventListener(eventName, listener);
    return es;
  })
  .on(removeListener, (es, { eventName, listener }) => {
    es?.removeEventListener(eventName, listener);
    return es;
  });

sample({
  clock: subscribeToSseEventNews,
  source: $reconnectAttempts,
  fn(attempts) {
    const es = new EventSource(config.apiUrl + SSE_NEWS, {
      withCredentials: true,
    });

    es.addEventListener("open", () => {
      console.log("✅ SSE connected");
      sseConnected();
      resetReconnectAttempts();
    });

    es.addEventListener("close", () => {
      console.warn("⚠️ SSE closed");
      sseDisconnected();
    });

    es.addEventListener(SseEvents.Error, error => {
      console.warn("❌ SSE error", error);
      sseDisconnected();
      es.close();

      incrementReconnectAttempts();

      const delay = Math.min(30000, 1000 * 2 ** attempts);
      setTimeout(() => {
        if ((es as any).readyState === 2) {
          subscribeToSseEventNews();
        }
      }, delay);
    });

    return es;
  },

  target: $sseNewsEventSource,
});
