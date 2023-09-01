export const convertUTCToLocalDate = function (date: Date) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return newDate.toISOString()
}