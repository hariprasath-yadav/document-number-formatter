import { formatDocumentNumber, fdnForDate, formatDate } from '../index'
test('Test All', () => {
  const dt = new Date('01 Nov 2020')
  expect(formatDocumentNumber('DNF/[YY=apr]-[YY+1=apr]/[val:size:6]', 123, 0, '', dt)).toBe('DNF/20-21/123')
  expect(formatDocumentNumber('BNO/[val]/[YY]-[YY+1]', 546, 8, 'apr', dt)).toBe('BNO/00000546/20-21')
  expect(formatDocumentNumber('DNF/[YYYY=jan]/[MM]/[val]', 789, 5, '', dt)).toBe('DNF/2020/11/00789')
  expect(formatDocumentNumber('BNO/[YYYY]/[MMM]/[v]', 432, 5, 4, dt)).toBe('BNO/2020/NOV/00432')
  expect(formatDocumentNumber('[YYYY' + (false ? ']-01' : '=dec]-12' ) + '-01', '', 0, '', dt)).toBe('2019-12-01')
  expect(formatDocumentNumber('[D]/[DD]/[dd]/[ddd]/[dddd]/[MMMM]/[W]', '', 0, '', dt)).toBe('1/01/SU/SUN/SUNDAY/NOVEMBER/45')
  expect(fdnForDate('01 Mar 2021', 'DNF/[YY]-[YY+1]/[val]', 123, 4, "apr")).toBe('DNF/20-21/0123')
  expect(formatDate('YYYY', '4', '28 Mar 2020')).toBe('2019')
})
