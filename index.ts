enum Months {
  jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec,
  january = jan, february = feb, march = mar, april = apr, june = jun,
  july = jul, august = aug, septemper = sep, october = oct, november = nov, december = dec
}
export function testMonths (month: string | number): Months {
  return Months[month as keyof typeof Months]
}

function formatDate (format: string): string {
  const currnetDate = new Date()
  let currentYear = currnetDate.getFullYear()
  const currentMonth = currnetDate.getMonth()
  const formats = format.split('=')
  if (formats.length > 1) {
    const month = (formats[1].replace('[', '').replace('=', '').replace(']', ''))
    if (currentMonth < Months[month.toLowerCase() as keyof typeof Months]) {
      currentYear -= 1
    }
  }
  const yearFormat = (formats[0].replace('[', '').replace('date:', '').replace(']', ''))
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
}

function formatValue (format: string, value: number): string {
  const valString = value.toString()
  const valLength = valString.length
  const formatSize = +(format.replace('[', '').replace('val:size:', '').replace(']', ''))
  const padString = new Array(formatSize + 1).join('0')
  const formattedNumber = padString.substr(0, padString.length - valLength) + valString
  return (formattedNumber)
}

export function formatDocumentNumber (format: string, value: number): string {
  const seperateFormats = format.split('[')
  let documentNumber = ''
  seperateFormats.forEach(seperateFormat => {
    const formatOnly = seperateFormat.split(']')
    const colonIndex = formatOnly[0].indexOf(':')
    switch (formatOnly[0].substring(0, colonIndex)) {
      case 'val':
        documentNumber += formatValue(formatOnly[0], value)
        break
      case 'date':
        documentNumber += formatDate(formatOnly[0])
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
