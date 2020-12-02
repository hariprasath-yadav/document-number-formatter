import { formatDocumentNumber, fdnForDate, formatDate } from '../index'
const dt = new Date('01 Feb 2020')
// test.only('one Comand', () => {
//   expect(formatDocumentNumber(']')).toBe(']')
// })
test('Test formatDocumentNumber', () => {
  expect(formatDocumentNumber('[val:size:6]', 123)).toBe('000123')
  expect(formatDocumentNumber('[val]', 123, 6)).toBe('000123')
  expect(formatDocumentNumber('DNF/[YY=apr]-[YY+1=4]/[val:size:6]', 123, 0, '', dt)).toBe('DNF/19-20/000123')
  expect(formatDocumentNumber('BNO/[val]/[YY]-[YY+1]', 546, 8, 'dec', dt)).toBe('BNO/00000546/19-20')
  expect(formatDocumentNumber('DNF/[YYYY=jan]/[MM]/[val]', 789, 5, '', dt)).toBe('DNF/2020/02/00789')
  expect(formatDocumentNumber('BNO/[YYYY]/[MMM]/[v]', 432, 5, 4, dt)).toBe('BNO/2019/FEB/00432')
  expect(formatDocumentNumber('[[]/]')).toBe('[/]')
  expect(formatDocumentNumber('[YYYY' + (false ? ']-01' : '=dec]-12' ) + '-01/[M]', '', 0, '', dt)).toBe('2019-12-01/2')
  expect(formatDocumentNumber('[D]/[DD]/[dd]/[ddd]/[dddd]/[DDDD]/[MMMM]/[W]/[WW]', '', 0, '', dt)).toBe('1/01/SA/SAT/SATURDAY/SATURDAY/FEBRUARY/5/05')
})
test('Test fdnForDate', () => {
  expect(fdnForDate(dt, 'DNF/[[YY]-[YY+1]]/[val]', 123, 4, "apr")).toBe('DNF/[YY-20]/0123')
  expect(fdnForDate('01 Mar 2021', 'DNF/[YY]-[YY+1]/[val]', 123, 4, "apr")).toBe('DNF/20-21/0123')
})
test('Test formatDate', () => {
  expect(formatDate('YYYY', '4', '28 Mar 2020')).toBe('2019')
})