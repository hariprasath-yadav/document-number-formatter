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
// If you using previous versions that code will not affect the result if you update the package
console.log(formatDocumentNumber('DNF/[YY=apr]-[YY+1=apr]/[val:size:6]', 123))
console.log(formatDocumentNumber('BNO/[YY]-[YY+1]/[val]', 546, 8, "apr"))
console.log(formatDocumentNumber('DNF/[YYYY=jan]/[MM]/[val]', 789, 5))
console.log(formatDocumentNumber('BNO/[YYYY]/[MMM]/[val]', 432, 5, 4))
```
> if todays date is ***"01 Nov 2020"*** 
### Output :
```
DNF/20-21/000123
BNO/20-21/00000546
DNF/2020/11/00789
BNO/2020/NOV/00432
```

## Docs :
String between "[" and "]" brackets will be taken to comput the result.
> if todays date is ***"01 Feb 2020"*** 

| Type | Sample Code For | Examples | Output | Desc |
| -- | -- | -- | -- | -- |
| Date | Year | Eg. 1: [YY] | 20 | "YY" will convert in to current year |
||| Eg. 2: [YYYY] | 2020 | "YYYY" will return full year |
|||Eg. 3: [YY+1] | 21 | One year added to the current Year |
|||Eg. 4: [YY=apr] | 19 | As default January is the year start if you specify year start month like in the example, given month will be taken as start month of the year, if the current month is lessthan the given month it will consider it as previous year, this function will help on producing Financial year (or) Academic year document numbers. |
|||Eg. 5: [YY+1=jan] | 21 | You can combine "+1" and "month" in single statement like this. |
|||Eg. 6: [YY], arg4: "jan" | 21 | You can also specify start month as common by passing month as fourth argument |
| Date | Month |Eg. 1: [MM] | 02 | It will return current month as two digit numerical format |
|||Eg. 2: [MMM] | FEB | It will return month as 3 character alphabetic format |
| Value | Value | Eg. 1: [value:size:5], arg: 123 | 00123 | It will leftpad two "0"s to the value passed as second argument to maintain value size. |
||| Eg. 2: [value:size:8], arg: 789 | 00000789 | It will leftpad five "0"s if value's size is 3. |
||| Eg. 3: [value], arg2: 789, arg3: 8 | 00000789 | It will leftpad "0"'s to the value by the size passed as third argument |
| Args |arg1: format (mandantory) | Eg. 1: "[YY=apr]" || first arugment is format |
||arg2: value (optional) | Eg. 1: 123 || second argument is value to format |
||| Eg. 2: "456" || value can be number or string. This argumnet is optional if you dont use '[val]' based format in first argument |
|| arg3: size (optional) | Eg. 1: 4 || Size of the value should be in number, if the value length is smaller, '0's will leftpad to the value to match the size. |
|| arg4: month (optional) | Eg. 1: "dec" (or) "december"  || To specify the start month of the year, to format the number. This argument is case insensitive. |
||| Eg. 2: 12 || You can specify the month start as number |

## Example and Explanation 1 :
### Example :
```js
var { formatDocumentNumber } = require('document-number-formatter')
console.log(formatDocumentNumber('DNF/[YY=apr]-[YY+1=apr]/[val:size:6]', 123))
```
> If todays date is ***"28 Feb 2020"***
### Output :
```
DNF/19-20/000123
```
> Above format **"DNF/19-20/"** will continue from "01 Apr 2019" to "31 Mar 2020" and then it will turn into **"DNF/20-21/"** from "01 Apr 2020".

### Explanation :
| Code | Explanation |
| -- | -- |
| DNF/ | this is not in between square brackets so it printed as like given. |
| [YY=apr] | this is converted into "19" |
| - | this character printed as same |
| [YY+1=apr] | this is converted into "20" |
| / | this character printed as same |
| [val:size:6] | this is converted into "000123" with the value of argument |

## Example and Explanation 2 :
### Example :
```js
var { formatDocumentNumber } = require('document-number-formatter')
console.log(formatDocumentNumber('DNF/[YY]-[YY+1]/[val]', 123, 6, "apr"))
```
> If todays date is ***"28 Feb 2020"***
### Output :
```
DNF/19-20/000123
```
> Above format **"DNF/19-20/"** will continue from "01 Apr 2019" to "31 Mar 2020" and then it will turn into **"DNF/20-21/"** from "01 Apr 2020".

### Explanation :
| Code | Explanation |
| -- | -- |
| DNF/ | this is not in between square brackets  so it printed as like given. |
| [YY] | this is converted into "19" fourth argument month is "apr" |
| - | this character printed as same |
| [YY+1] | this is converted into "20" fourth argument month is "apr" |
| / | this character printed as same |
| [val] | this is converted into "000123" with the second argument value and third argument size |
