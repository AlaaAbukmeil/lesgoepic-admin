"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdinalSuffix = exports.getCurrentMonthDateRange = void 0;
function getCurrentMonthDateRange() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    const formattedFirstDay = `${monthNames[currentMonth]} ${firstDayOfMonth.getDate()}${getOrdinalSuffix(firstDayOfMonth.getDate())} ${currentYear}`;
    const formattedLastDay = `${monthNames[currentMonth]} ${lastDayOfMonth.getDate()}${getOrdinalSuffix(lastDayOfMonth.getDate())} ${currentYear}`;
    return `${formattedFirstDay} - ${formattedLastDay}`;
}
exports.getCurrentMonthDateRange = getCurrentMonthDateRange;
function getOrdinalSuffix(date) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = date % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}
exports.getOrdinalSuffix = getOrdinalSuffix;