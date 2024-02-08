// import fs from 'fs'
import puppeteer from 'puppeteer'
import { v4 as uuidv4 } from 'uuid'

import mock, { Product } from './mock/mock'

export const generateReportPDF = async () => {
  console.log('Iniciando geração dos dados.')
  const columns = mock.columns
  const randomValues = await mock.generateValues()

  // @ts-expect-error Ignore, just generating random values.
  const { products } = randomValues

  console.log('Dados gerados, inicializando geração do HTML.')
  try {
    /**
     * Html.
     */
    const html = `
    <html lang="pt-BR">
      <head>
        <style>
          table {
            width: 100%; 
            font-size: 12px; 
            table-layout: auto;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 3px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; margin-bottom: 10px;">
          <h2>TESTE DE RELATÓRIO</h2>
        </div>
        <table>
          <thead>
            <tr>
              ${columns.map(column => `<th>${column.name}</th>`).join('')}
            </tr>
          </thead>
          ${products
            .map((product: Product) => {
              return `<tr>
                <td style="width: 100px; height: 200px;"><img src="${product.image}" alt="Imagem do produto" /></td>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.value}</td>
              </tr>`
            })
            .join('')}
          <tbody>
            <tr>
              <th colSpan="${columns.length}">
                <div style="display: flex; justify-content: flex-end">
                  ${products?.length ?? 0} registros encontrados
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `

    console.log('HTML gerado, inicializando geração do PDF.')

    /**
     * Create PDF file.
     */
    const fileName = `${uuidv4()}.pdf`

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 0,
      headless: 'new',
      executablePath: '/usr/bin/google-chrome',
      ignoreDefaultArgs: ['--disable-extensions']
    })
    const page = await browser.newPage()

    await page.setContent(html, { waitUntil: 'networkidle2' })

    await page.pdf({
      path: fileName,
      format: 'A4',
      margin: { top: '5mm', left: '5mm', right: '5mm', bottom: '5mm' },
      landscape: true
    })

    await browser.close()

    /**
     * Log.
     */
    console.info('Arquivo gerado com sucesso...')

    /**
     * Remove file.
     */
    // fs.unlink(fileName, unlinkErr => {
    //   if (unlinkErr) throw unlinkErr

    //   console.info(`Arquivo removido localmente: ${fileName}`)
    // })

    return true
  } catch (error) {
    console.error(`Ocorreu um erro ao gerar o relatório: ${error.message}`)
    throw new Error(error)
  }
}
