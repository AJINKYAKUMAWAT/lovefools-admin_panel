import { getTime } from 'date-fns';
import {
  DateValue,
  parseAbsoluteToLocal,
  toCalendarDate,
  CalendarDate,
  ZonedDateTime,
  parseZonedDateTime,
  getLocalTimeZone,
  toZoned,
} from '@internationalized/date';
import { format, toZonedTime } from 'date-fns-tz';

type DateLike = Date | string | number;

export function datepickerFormatDate(date: DateLike | number) {
  const nyDate = toZonedTime(date, 'Asia/Kolkata');

  return format(nyDate, 'yyyy-MM-dd HH:mm:ss', {
    timeZone: 'Asia/Kolkata',
  });
}

export function formatDate(date: DateLike | number) {
  const nyDate = toZonedTime(date, 'Asia/Kolkata');

  return format(nyDate, 'dd/MM/yyyy', {
    timeZone: 'Asia/Kolkata',
  });
}

export function formatDateTime(date: DateLike | number) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function formatTimestamp(date: DateLike | number) {
  return getTime(new Date(date));
}

export function formatDateTimeSuffix(date: DateLike | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function formatTime(time: Date) {
  return time.toLocaleTimeString();
}

export function convertUTCToTime(utcString: string | undefined | null) {
  if (!utcString) return '--:--';
  return new Date(utcString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function findTimeDifference(
  currentTime: Date | undefined | string,
  checkInTime: string | undefined,
) {
  if (!checkInTime) return '--:--';

  const date1: Date = new Date(currentTime as string | Date);
  const date2: Date = new Date(checkInTime);

  const timeDiffMs: number = Math.abs(date1.getTime() - date2.getTime());

  const hours: number = Math.floor(timeDiffMs / (1000 * 60 * 60));
  const minutes: number = Math.floor(
    (timeDiffMs % (1000 * 60 * 60)) / (1000 * 60),
  );
  const hr = `${hours}`.padStart(2, '0');
  const min = `${minutes}`.padStart(2, '0');

  return `${hr}:${min} hours`;
}

export function formatDateTimeConvert(inputDateString: string) {
  const formatDate = <DateValue>parseAbsoluteToLocal(inputDateString);
  return formatDate;
}

export function convertToDD_MM_YYYY_HHMMSS(inputDate: string) {
  // DD/MM/YYYY HH:MM:ss

  inputDate = inputDate?.includes('+')
    ? inputDate?.replace(inputDate?.substring(inputDate?.indexOf('+')), '')
    : inputDate;

  const dateTime = inputDate?.split('T');
  const DateSplit =
    dateTime[0]?.split('-')?.reverse()?.join('/') + ' ' + dateTime[1];
  return DateSplit;
}

export function formatDateConvert(inputDateString: string) {
  const formatDate = <DateValue>parseAbsoluteToLocal(inputDateString);
  return formatDate;
}

export const convertToDateFormat = (date: string | ZonedDateTime): string => {
  let calendarDate: CalendarDate;
  if (typeof date === 'string' && date.includes('T')) {
    const zonedDateTime = parseZonedDateTime(date);
    calendarDate = toCalendarDate(zonedDateTime);
  } else if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number);
    calendarDate = new CalendarDate(year, month, day);
  } else {
    calendarDate = toCalendarDate(date);
  }

  const jsDate = new Date(
    calendarDate.year,
    calendarDate.month - 1,
    calendarDate.day,
  );

  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formatter.format(jsDate);
};

const isValidDateFormat = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return false; // Check if there are three parts (year, month, day)
  const [year, month, day] = parts.map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false; // Check if all parts are numbers
  const dateObj = new Date(year, month - 1, day); // Note: month is 0-based in JavaScript Date object
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};

export const convertDateToZoned = (dateStr: string) => {
  // Regular expression to check if date is in dd-mm-yyyy format
  let zonedDateTime;

  if (isValidDateFormat(dateStr)) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const calendarDate = new CalendarDate(year, month, day);

    // Get the local time zone of the user
    const localTimeZone = getLocalTimeZone();

    // Convert the CalendarDate to ZonedDateTime in the local time zone
    zonedDateTime = toZoned(calendarDate, localTimeZone);
  } else {
    // Otherwise, parse the date as ISO 8601 format
    zonedDateTime = parseZonedDateTime(dateStr);
  }

  // Return the ZonedDateTime in the target time zone
  return zonedDateTime;
};
