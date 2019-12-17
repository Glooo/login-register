import XLSX from 'xlsx'
import XLSX_SAVE from 'file-saver'

function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

/**
 * 导出Excel
 * @param {string} fileName
 * @param {[]} data
*/
export const exportExcel = function (fileName, data) {
  let { aoa_to_sheet, book_new, book_append_sheet } = XLSX.utils
  let workSheet = aoa_to_sheet(data)
  let workBook = book_new()

  book_append_sheet(workBook, workSheet, 'sheet1')

  let wbout = XLSX.write(workBook, { type: 'binary', bookType: 'xlsx' })

  XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${fileName}.xlsx`)
}
