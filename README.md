# 📃 Document Number Formatter #️⃣ 😃
This package is used to generate the formatted number like ***'Bill Number'*** or other document number similar to ***'Bill Number'***

## Installation and Integration

Install Using npm:
```shell
npm i document-number-formatter
```

Integrate In Node.js program:
```js
var { formatDocumentNumber, fdnForDate, formatDate } = require('document-number-formatter')
```

## Examples :
```js
// If you using previous versions that code will not affect the result if you update the package
console.log(formatDocumentNumber('DNF/[YY=apr]-[YY+1=apr]/[val:size:6]', 123))
console.log(formatDocumentNumber('BNO/[val]/[YY]-[YY+1]', 546, 8, 'apr'))
console.log(formatDocumentNumber('DNF/[YYYY=jan]/[MM]/[val]', 789, 5))
console.log(formatDocumentNumber('BNO/[YYYY]/[MMM]/[v]', 432, 5, 4))
console.log(formatDocumentNumber('[YYYY' + (false ? ']-01' : '=dec]-12' ) + '-01'))
console.log(formatDocumentNumber('[D]/[DD]/[dd]/[ddd]/[dddd]/[MMMM]/[W]'))
console.log(fdnForDate('01 Mar 2021', 'DNF/[YY]-[YY+1]/[val]', 123, 4, "apr"))
console.log(formatDate('YYYY', '4', '28 Mar 2020'))
```
> if todays date is ***'01 Nov 2020'*** 
### Output :
```
DNF/20-21/000123
BNO/00000546/20-21
DNF/2020/11/00789
BNO/2020/NOV/00432
2019-12-01
1/01/SU/SUN/SUNDAY/NOVEMBER/45
DNF/20-21/0123
2019
```

## Docs for formatDocumentNumber():
String between '[' and ']' brackets will be taken to comput the result.
> if todays date is ***'01 Feb 2020'*** 

| Type | Sample Code For | Examples | Output | Desc |
| -- | -- | -- | -- | -- |
| Calendar | Year | Eg. 1: [YY] | 20 | 'YY' will convert in to current year |
||| Eg. 2: [YYYY] | 2020 | 'YYYY' will return full year |
||| Eg. 3: [YY+1] | 21 | One year added to the current Year |
||| Eg. 4: [YY=apr] | 19 | As default January is the year start if you specify year start month like in the example, given month will be taken as start month of the year, if the current month is lessthan the given month it will consider it as previous year, this function will help on producing Financial year (or) Academic year document numbers. |
||| Eg. 5: [YY=4] | 19 | You can specify month in number also. |
||| Eg. 6: [YY+1=jan] | 21 | You can combine '+1' and 'month' in single statement like this. |
||| Eg. 7: [YY],<br>arg4: 'jan' | 21 | You can also specify start month as common by passing month as 4th argument |
||| Eg. 8: [YY],<br>arg4: 1 | 21 | You can also specify start month as common by passing month as 4th argument as interger |
| Calendar | Month | Eg. 1: [M] | 2 | It will return current month as one digit numerical format |
||| Eg. 2: [MM] | 02 | It will return current month as 2 digit numerical format |
||| Eg. 3: [MMM] | FEB | It will return month as 3 character alphabetic format |
||| Eg. 4: [MMMM] | FEBRUARY | It will return month as full name |
| Calendar | Week | Eg. 1: [W] | 5 | It will return current week number as one digit numerical format |
||| Eg. 2: [WW] | 05 | It will return current week number as two digit numerical format |
| Calendar | Date | Eg. 1: [D] | 1 | It will return current date in one character |
||| Eg. 2: [DD] | 01 | It will return current date in two characters |
| Calendar | Day | Eg. 1: [dd] | SA | It will return current week day in 2 character format |
||| Eg. 2: [ddd] or [DDD] | SAT | It will return current week day in 3 character format |
||| Eg. 3: [dddd] or [DDDD] | SATURDAY | It will return current week day in full name |
| Value | Value | Eg. 1: [val:size:5],<br>arg2: 123 | 00123 | It will leftpad two '0's to the value passed as second argument to maintain value size. |
||| Eg. 2: [val:size:8],<br>arg2: 789 | 00000789 | It will leftpad five '0's if value's size is 3. |
||| Eg. 3: [val] or [v],<br>arg2: 789,<br>arg3: 8 | 00000789 | It will leftpad '0's to the value by the size passed as third argument |
|||| ***Default value*** |
| Args | arg1: format (mandantory) | Eg. 1: '[YY=apr]' || first arugment is format |
|| arg2: value (optional) | Eg. 1: 123 | '' (Empty String) | second argument is value to format |
||| Eg. 2: '456' || value can be number or string. This argument is optional if you dont use '[val]' based format in first argument |
|| arg3: size (optional) | Eg. 1: 4 | 0 | Size of the value should be in number, if the value length is smaller, '0's will leftpad to the value to match the size. |
|| arg4: month (optional) | Eg. 1: 'dec' (or) 'december'  | 'jan' | To specify the start month of the year, to format the number. This argument is case insensitive. |
||| Eg. 2: 12 || You can specify the month start as number |


## Docs for fdnForDate():
String between '[' and ']' brackets will be taken to comput the result.
> You can pass your own js native date (or) date string as 1st arugment<br>
> all arugments of formatDocumentNumber() can be used in this function also but it moved one step forward<br>
> for example 'format'('[YY]') argument is 2nd argument in this function<br>

| Type | Sample Code For | Examples | Output | Desc |
| -- | -- | -- | -- | -- |
| Calendar | JS Date | Eg. 1: (new Date(), '[YY]') | 20 | if todays date is '01 Feb 2020' |
||| Eg. 2: ('01 Feb 2020', '[WW]') | 05 | or you can pass date as raw date string that can product native JS date |

## Docs for formatDate():
> If you want to format only the **'Calendar'** based string not the value you can use this function<br>
> if todays date is ***'01 Feb 2020'*** 

| Type | Sample Code For | Examples | Output |  Deafult Value | Desc |
| -- | -- | -- | -- | -- | -- |
| Args | arg1: format (mandantory) | Eg. 1: 'YY=apr' | 20 || first arugment is format, you can use any calendar mention in **'Docs for formatDocumentNumber()'** but with out '[' and ']' branckets, and you can use one format at a time.|
|| arg2: month (optional) | Eg. 1: 'dec' (or) 'december'  || 'jan' | To specify the start month of the year, to format the number. This argument is case insensitive. |
| Calendar | arg3: currentDate (optional) | Eg. 1: new Date() | 20 | new Date() | if todays date is '01 Feb 2020' |
||| Eg. 2: '01 Feb 2020' | 05 || or you can pass date as raw date string that can product native JS date |


## Example and Explanation 1 :
### Example :
```js
var { formatDocumentNumber } = require('document-number-formatter')
console.log(formatDocumentNumber('DNF/[YY=apr]-[YY+1=apr]/[val:size:6]', 123))
```
> If todays date is ***'28 Feb 2020'***
### Output :
```
DNF/19-20/000123
```
> Above format **'DNF/19-20/'** will continue from '01 Apr 2019' to '31 Mar 2020' and then it will turn into **'DNF/20-21/'** from '01 Apr 2020'.

### Explanation :
| Code | Explanation |
| -- | -- |
| DNF/ | this is not in between square brackets so it printed as like given. |
| [YY=apr] | this is converted into '19' |
| - | this character printed as same |
| [YY+1=apr] | this is converted into '20' |
| / | this character printed as same |
| [val:size:6] | this is converted into '000123' with the value of argument |

## Example and Explanation 2 :
### Example :
```js
var { formatDocumentNumber } = require('document-number-formatter')
console.log(formatDocumentNumber('DNF/[YY]-[YY+1]/[val]', 123, 6, 'apr'))
```
> If todays date is ***'28 Feb 2020'***
### Output :
```
DNF/19-20/000123
```
> Above format **'DNF/19-20/'** will continue from '01 Apr 2019' to '31 Mar 2020' and then it will turn into **'DNF/20-21/'** from '01 Apr 2020'.

### Explanation :
| Code | Explanation |
| -- | -- |
| DNF/ | this is not in between square brackets  so it printed as like given. |
| [YY] | this is converted into '19' fourth argument month is 'apr' |
| - | this character printed as same |
| [YY+1] | this is converted into '20' fourth argument month is 'apr' |
| / | this character printed as same |
| [val] | this is converted into '000123' with the second argument value and third argument size |
