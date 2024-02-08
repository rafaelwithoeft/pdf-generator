import { generateReportPDF } from './services/file/actions/report'

export default {
  handle: async () => {
    return generateReportPDF().catch(err => {
      console.log('Ocorreu um erro ao gerar o arquivo.', { err })
    })
  }
}
