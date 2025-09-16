import moment from "moment-timezone";

export const getTimestampOfStartOfTheDay = (): number => (
  moment().tz(moment.tz.guess()).startOf('day').toDate().getTime()
);
