# 📃 Document Number Formatter #️⃣ 😃
This package is used to generate the formatted number ilke ***"Bill Number"*** or other document number similar to ***"Bill Number"***

## Installation and Integration

Install Using npm:
```shell
npm i document-number-formatter
```

Integrate In Node.js program:
```js
var { formatDocumentNumber } = require('document-number-formatter')
```

## Example :
```js
const formattedNumber = formatDocumentNumber('TPR/[date:YY=apr]-[date:YY+1=apr]/[val:size:6]', 123)
```
> if todays date is ***"01 Nov 2020"*** 
### Output :
```
TPR/20-21/000123
```

## Docs :
String between "[" and "]" brackets will be taken to comput the result.
> if todays date is ***"01 Feb 2020"*** 

| Type | Sample Code | Examples | Output | Desc |
| -- | -- | -- | -- | -- |
| Date | [date:YY] | Ex 1: [date:YY] | 20 | "YY" will convert in to current year
||| Ex 2: [date:YYYY] | 2020 | "YYYY" will return full year
|||Ex 3: [date:YY+1] | 21 |
|||Ex 4: [date:YY=apr] | 19 | As default January is the year start if you specify year start month like in the example, given month will be taken as start month of the year, if the current month is lessthan the given month it will consider it as previous year, this function will help on producing Financial year (or) Academic year document numbers.
|||Ex 5: [date:YY+1=jan] | 21 | You can combine "+1" and "month" in single statement like this.
| Value | [value:size:5] | Ex 1: [value:size:5], arg: 123 | 00123 | It will leftpad "0" to the second argument number passed to the funtion |
||| Ex 2: [value:size:8], arg: 789 | 00000789 | It will leftpad "0" to the second argument number passed to the funtion |

## Example and Explanation :
### Example :
```js
var { formatDocumentNumber } = require('document-number-formatter')
console.log(formatDocumentNumber('TPR/[date:YY=apr]-[date:YY+1=apr]/[val:size:6]', 123))
```
> If todays date is ***"28 Feb 2020"***
### Output :
```
TPR/19-20/000123
```
> Above format **"TPR/19-20/"** will continue from "01 Apr 2019" to "31 Mar 2020" and then it will turn into **"TPR/20-21/"** from "01 Apr 2020".

### Explanation :
| Code | Explanation |
| -- | -- |
| TPR/ | this is not in between square brackets  so it printed as like given. |
| [date:YY=apr] | this is converted into "19" |
| - | this character printed as same |
| [date:YY+1=apr] | this is converted into "20" |
| [val:size:6] | this is converted into "000123" with the value of argument |