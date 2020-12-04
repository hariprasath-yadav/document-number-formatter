enum MonthsMin { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec }
enum Months { january, february, march, april, may, june, july, august, septemper, october, november, december }

enum DaysMin { su, mo, tu, we, th, fr, sa }
enum Days { sun, mon, tue, wed, thu, fri, sat }
enum DaysMax { sunday, monday, tuesday, wednesday, thursday, friday, saturday }

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
function getWeek (currendDate: Date, dowOffset?: number): number {
  /* getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
  dowOffset = typeof dowOffset === 'number' ? dowOffset : 0 // default dowOffset to zero
  const newYear = new Date(currendDate.getFullYear(), 0, 1)
  let day = newYear.getDay() - dowOffset // the day of week the year begins on
  day = (day >= 0 ? day : day + 7)
  const daynum = Math.floor((currendDate.getTime() - newYear.getTime() - (currendDate.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1
  let weeknum
  // if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1
    if (weeknum > 52) {
      const nYear = new Date(currendDate.getFullYear() + 1, 0, 1)
      let nday: number = nYear.getDay() - dowOffset
      nday = nday >= 0 ? nday : nday + 7
      /* if the next year starts before the middle of
        the week, it is week #1 of that year */
      weeknum = nday < 4 ? 1 : 53
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7)
  }
  return weeknum
}

/**
 * Returns the current (or) passed date after formatted with given string
 * @param format - {type: string, mandatory} format to return
 * @param month - {type: string | number, optional, default: 'January') month of year start
 * @param currentDate {type: string | Date, optional, default: new Date()) date to get format
 * @return string
 */
export function formatDate (format: string, month?: unknown, currentDate: Date | string = new Date()): string {
  if (typeof currentDate === 'string') {
    currentDate = new Date(currentDate)
  }
  const currentMonth = currentDate.getMonth()
  const currentWeek = getWeek(currentDate)
  switch (format) {
    case 'D':
      return currentDate.getDate().toString()
    case 'DD':
      return (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate().toString()
    case 'd':
    case 'dd':
      return DaysMin[currentDate.getDay()].toUpperCase()
    case 'ddd':
    case 'DDD':
      return Days[currentDate.getDay()].toUpperCase()
    case 'dddd':
    case 'DDDD':
      return DaysMax[currentDate.getDay()].toUpperCase()
    case 'W':
      return currentWeek.toString()
    case 'WW':
      return (currentWeek < 10 ? '0' : '') + currentWeek.toString()
    case 'M':
      return (currentMonth + 1).toString()
    case 'MM':
      return ((currentMonth + 1) < 10 ? '0' : '') + (currentMonth + 1).toString()
    case 'MMM':
      return MonthsMin[currentMonth].toUpperCase()
    case 'MMMM':
      return Months[currentMonth].toUpperCase()
    default:
      if (format[0] === 'Y') {
        const formats = (format.replace('[', '').replace(']', '')).split('=')
        let currentYear = currentDate.getFullYear()
        let yearFormat: string
        if (month) {
          yearFormat = format
        } else {
          yearFormat = formats[0]
          if (formats.length > 1) {
            month = formats[1]
          }
        }
        if (typeof month === 'string') {
          if (month.length > 3) {
            month = Months[month.toLowerCase() as keyof typeof Months]
          } else if (month.length === 3) {
            month = MonthsMin[month.toLowerCase() as keyof typeof MonthsMin]
          } else if (month.length) {
            month = (+month) - 1
          }
        } else if (typeof month === 'number') {
          month -= 1
        }
        if (currentMonth < <number>month) {
          currentYear -= 1
        }
        let yearOnly = ''
        const plusSplit = yearFormat.split('+')
        const minusSplit = yearFormat.split('-')
        if (plusSplit.length > 1) {
          currentYear += +(plusSplit[1])
          yearOnly = plusSplit[0]
        } else if (minusSplit.length > 1) {
          currentYear -= +(minusSplit[1])
          yearOnly = minusSplit[0]
        } else {
          yearOnly = yearFormat
        }
        const currentYearString = currentYear.toString()
        return currentYearString.substr(currentYearString.length - yearOnly.length)
      } else {
        return format
      }
  }
}

function formatValue (format: string, value: string | number, size: number): string {
  const valString = value.toString()
  let formatSize:number
  if (size) {
    formatSize = size
  } else {
    formatSize = +(format.replace('[', '').replace('val:size:', '').replace('v', '').replace(']', ''))
  }
  const padString = (formatSize ? new Array(formatSize + 1).join('0') : '')
  return (padString.substr(0, padString.length - valString.length) + valString)
}

/**
 * Returns the value and current (or) passed date after formatted with given string
 * @param format - {type: string, mandatory} format to return
 * @param value - {type: string | number, optional} format to return
 * @param size - {type: number, optional, default: 0} format to return
 * @param month - {type: string | number, optional, default: 'January') month of year start
 * @param currentDate {type: string | Date, optional, default: new Date()) date to get format
 * @return string
 */
export function formatDocumentNumber (format: string, value: string | number = '0', size = 0, month?: string | number, currentDate: Date | string = new Date()): string {
  let documentNumber = ''
  let startIndex = 0
  while (startIndex < format.length) {
    const openBracIndex = format.indexOf('[', startIndex)
    documentNumber += format.substring(startIndex, (openBracIndex >= 0 ? openBracIndex : format.length))
    if (openBracIndex < 0) {
      break
    }
    const closeBracIndex = format.indexOf(']', openBracIndex)
    const formatOnly = format.substring(openBracIndex + 1, closeBracIndex)
    const colonIndex = formatOnly.indexOf(':')
    switch (true) {
      case (formatOnly[0] === 'v'):
        documentNumber += formatValue(formatOnly, value, size)
        break
      case (formatOnly.substring(0, colonIndex) === 'date' || formatOnly[0] === 'Y' || formatOnly[0] === 'M' || formatOnly[0] === 'D' || formatOnly[0] === 'd' || formatOnly[0] === 'W'):
        documentNumber += formatDate(formatOnly, month, currentDate)
        break
      default:
        documentNumber += formatOnly
    }
    startIndex = closeBracIndex + 1
  }
  return documentNumber
}

/**
 * Returns the value and current (or) passed date after formatted with given string
 * @param currentDate {type: string | Date, mandatory) date to get format
 * @param format - {type: string, mandatory} format to return
 * @param value - {type: string | number, optional} format to return
 * @param size - {type: number, optional, default: 0} format to return
 * @param month - {type: string | number, optional, default: 'January') month of year start
 * @return string
 */
export function fdnForDate (currentDate: Date | string, format: string, value: string | number = '0', size = 0, month?: string | number): string {
  return formatDocumentNumber(format, value, size, month, currentDate)
}
