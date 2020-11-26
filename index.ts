enum Months {
  january, february, march, april, may, june, july, august, septemper, october, november, december,
  jan = january, feb = february, mar = march, apr = april, jun = june,
  jul = july, aug = august, sep = septemper, oct = october, nov = november, dec = december
}

export function testMonths (month: string | number): Months | string {
  const monthVal: Months = Months[month as keyof typeof Months]
  if (typeof monthVal === 'string') {
    return (<string>monthVal).toUpperCase()
  } else {
    if (monthVal < 10) {
      return '0' + (monthVal + 1).toString()
    }
    return monthVal + 1
  }
}

function formatDate (format: string, month?: string): string {
  const currnetDate = new Date()
  const currentMonth = currnetDate.getMonth()
  const formats = format.split('=')
  const dateFormat = (formats[0].replace('[', '').replace('date:', '').replace(']', ''))
  switch (dateFormat) {
    case 'MM':
      if (currentMonth < 10) {
        return '0' + (currentMonth + 1).toString()
      } else {
        return (currentMonth + 1).toString()
      }
    case 'MMM':
      return Months[currentMonth].toUpperCase()
    case 'MMMM':
      return Months[currentMonth].toUpperCase()
    default:
      if (dateFormat) {
        let currentYear = currnetDate.getFullYear()
        let yearFormat: string
        if (month) {
          yearFormat = format
          if (currentMonth < Months[month.toLowerCase() as keyof typeof Months]) {
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

function formatValue (format: string, value: number, size?: number): string {
  const valString = value.toString()
  const valLength = valString.length
  let formatSize:number
  if (size) {
    formatSize = size
  } else {
    formatSize = +(format.replace('[', '').replace('val:size:', '').replace(']', ''))
  }
  const padString = (formatSize ? new Array(formatSize + 1).join('0') : '')
  const formattedNumber = padString.substr(0, padString.length - valLength) + valString
  return (formattedNumber)
}

export function formatDocumentNumber (format: string, value: number, size?: number, month?: string): string {
  const seperateFormats = format.split('[')
  let documentNumber = ''
  seperateFormats.forEach(seperateFormat => {
    const formatOnly = seperateFormat.split(']')
    const colonIndex = formatOnly[0].indexOf(':')
    switch (true) {
      case (formatOnly[0][0] === 'v'):
        documentNumber += formatValue(formatOnly[0], value, size)
        break
      case (formatOnly[0].substring(0, colonIndex) === 'date' || formatOnly[0][0] === 'Y' || formatOnly[0][0] === 'M'):
        documentNumber += formatDate(formatOnly[0], month)
        break
      default:
        documentNumber += formatOnly[0]
        break
    }
    if (formatOnly.length > 1) {
      documentNumber += formatOnly[1]
    }
  })
  return documentNumber
}
