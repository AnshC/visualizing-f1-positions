export function DateISOtoNumber(isoDate) {
    const date = new Date(isoDate);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // Months are 0-indexed
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
        value: (3600*date.getHours() + 60*date.getMinutes() + date.getSeconds())
    }
}