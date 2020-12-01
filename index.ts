enum Months {
  january, february, march, april, may, june, july, august, septemper, october, november, december,
  jan = january, feb = february, mar = march, apr = april, jun = june,
  jul = july, aug = august, sep = septemper, oct = october, nov = november, dec = december
}

enum Days {
  sun, mon, tue, wed, thu, fri, sat
}

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
// eslint-disable-next-line no-extend-native
export function getWeek (currendDate: Date, dowOffset?: number): number {
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

export function testMonths (month: string | number): Months | string {
  const monthVal: Months = Months[(typeof month === 'number' ? month - 1 : month) as keyof typeof Months]
  if (typeof monthVal === 'string') {
    return (<string>monthVal).toUpperCase()
  } else {
    return ((monthVal + 1) < 10 ? '0' : '') + (monthVal + 1).toString()
  }
}

function formatDate (format: string, month?: unknown, currentDate: Date = new Date()): string {
  // const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentWeek = getWeek(currentDate)
  const formats = format.split('=')
  const dateFormat = (formats[0].replace('[', '').replace('date:', '').replace(']', ''))
  switch (dateFormat) {
    case 'D':
      return currentDate.getDate().toString()
    case 'DD':
      return (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate().toString()
    case 'DDD':
      return Days[currentDate.getDay()].toUpperCase()
    case 'W':
      return currentWeek.toString()
    case 'WW':
      return (currentWeek < 10 ? '0' : '') + currentWeek.toString()
    case 'M':
      return (currentMonth + 1).toString()
    case 'MM':
      return ((currentMonth + 1) < 10 ? '0' : '') + (currentMonth + 1).toString()
    case 'MMM':
    case 'MMMM':
      return Months[currentMonth].toUpperCase()
    default:
      if (dateFormat) {
        let currentYear = currentDate.getFullYear()
        let yearFormat: string
        if (month) {
          yearFormat = format
          if (typeof month === 'string') {
            month = Months[month.toLowerCase() as keyof typeof Months]
          } else if (typeof month === 'number') {
            month = month - 1
          }
          if (currentMonth < <number>month) {
            currentYear -= 1
          }
        } else {
          yearFormat = dateFormat
          if (formats.length > 1) {
            const formatMonth = (formats[1].replace('[', '').replace('=', '').replace(']', ''))
            if (currentMonth < Months[formatMonth.toLowerCase() as keyof typeof Months]) {
              currentYear -= 1
            }
          }
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
        return currentYearString.substr(4 - yearOnly.length)
      } else {
        return ''
      }
  }
}

function formatValue (format: string, value: string | number, size: number): string {
  const valString = value.toString()
  const valLength = valString.length
  let formatSize:number
  if (size) {
    formatSize = size
  } else {
    formatSize = +(format.replace('[', '').replace('val:size:', '').replace('v', '').replace(']', ''))
  }
  const padString = (formatSize ? new Array(formatSize + 1).join('0') : '')
  const formattedNumber = padString.substr(0, padString.length - valLength) + valString
  return (formattedNumber)
}

export function formatDocumentNumber (format: string, value: string | number = '0', size = 0, month?: string | number, currentDate: Date | string = new Date()): string {
  let documentNumber = ''
  let startIndex = 0
  while (startIndex < format.length - 1) {
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
        documentNumber += formatValue(formatOnly[0], value, size)
        break
      case (formatOnly.substring(0, colonIndex) === 'date' || formatOnly[0] === 'Y' || formatOnly[0] === 'M' || formatOnly[0] === 'D' || formatOnly[0] === 'W'):
        if (typeof currentDate === 'string') {
          currentDate = new Date(currentDate)
        }
        documentNumber += formatDate(formatOnly, month, currentDate)
        break
    }
    startIndex = closeBracIndex + 1
  }
  return documentNumber
}

export function fdnForDate (currentDate: Date | string = new Date(), format: string, value: string | number = '0', size = 0, month?: string | number): string {
  return formatDocumentNumber(format, value, size, month, currentDate)
}
