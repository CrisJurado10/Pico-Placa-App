import { HolidayChecker } from './interfaces/HolidayChecker';

export class EcuadorianHolidayChecker implements HolidayChecker {
  private readonly fixedHolidays = [
    '12-25', // Christmas
    '01-01', // New Year
    '05-01', // Labor Day
    '05-24', // Battle of Pichincha
    '08-10', // Independence Day
    '10-09', // Independence of Guayaquil
    '11-02', // All Souls' Day
    '11-03', // Independence of Cuenca
  ];

  isHoliday(date: string): boolean {
    // date format YYYY-MM-DD
    const [year, month, day] = date.split('-');
    const monthDay = `${month}-${day}`;
    return this.fixedHolidays.includes(monthDay);
  }
}
