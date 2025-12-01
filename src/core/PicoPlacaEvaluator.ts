import { HolidayChecker } from './interfaces/HolidayChecker';

export class PicoPlacaEvaluator {
  private holidayChecker: HolidayChecker;

  constructor(holidayChecker: HolidayChecker) {
    this.holidayChecker = holidayChecker;
  }

  canDrive(plate: string, date: string, time: string): boolean {
    if (this.holidayChecker.isHoliday(date)) {
        return true;
    }

    const lastDigit = parseInt(plate.slice(-1), 10);
    
    // Ensure date is treated as local date or specific day effectively.
    // Appending T00:00:00 might shift it depending on TZ if parsed as ISO.
    // '2025-12-01' is usually parsed as UTC.
    // '2025-12-01T00:00:00' is local.
    const dayOfWeek = new Date(date + 'T00:00:00').getDay(); 

    if (this.isWeekend(dayOfWeek)) return true;

    if (this.isRestrictedDay(lastDigit, dayOfWeek)) {
        return !this.isRestrictedTime(time);
    }

    return true;
  }

  private isWeekend(day: number): boolean {
    return day === 0 || day === 6;
  }

  private isRestrictedDay(lastDigit: number, day: number): boolean {
      // Mon(1): 1,2
      // Tue(2): 3,4
      // Wed(3): 5,6
      // Thu(4): 7,8
      // Fri(5): 9,0
      if (day === 1 && (lastDigit === 1 || lastDigit === 2)) return true;
      if (day === 2 && (lastDigit === 3 || lastDigit === 4)) return true;
      if (day === 3 && (lastDigit === 5 || lastDigit === 6)) return true;
      if (day === 4 && (lastDigit === 7 || lastDigit === 8)) return true;
      if (day === 5 && (lastDigit === 9 || lastDigit === 0)) return true;
      return false;
  }

  private isRestrictedTime(time: string): boolean {
    const parts = time.split(':');
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    
    if (isNaN(hours) || isNaN(minutes)) {
        // Should handle invalid time format, but for now assuming valid input as per simplified requirements.
        // Or return false (not restricted) if invalid? Ideally throw.
        return false; 
    }

    const timeInMinutes = hours * 60 + minutes;

    // Morning: 07:00 - 09:30
    const morningStart = 7 * 60;
    const morningEnd = 9 * 60 + 30;
    
    // Afternoon: 16:00 - 19:30
    const afternoonStart = 16 * 60;
    const afternoonEnd = 19 * 60 + 30;

    return (timeInMinutes >= morningStart && timeInMinutes <= morningEnd) ||
           (timeInMinutes >= afternoonStart && timeInMinutes <= afternoonEnd);
  }
}