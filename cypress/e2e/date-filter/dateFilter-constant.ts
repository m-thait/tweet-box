import { sub, startOfDay } from "date-fns";

// UI displayed a date that is a day earlier than the one returned by backend
export const lastMonthDate = sub(startOfDay(new Date()), {
  months: 1,
  days: 1,
});
export const lastQuarterDate = sub(startOfDay(new Date()), {
  months: 3,
  days: 1,
});
export const lastYearDate = sub(startOfDay(new Date()), { years: 1, days: 1 });
export const last3YearsDate = sub(startOfDay(new Date()), {
  years: 3,
  days: 1,
});
export const last5YearsDate = sub(startOfDay(new Date()), {
  years: 5,
  days: 1,
});
