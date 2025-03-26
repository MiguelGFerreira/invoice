import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { getBase64ImageFromURL } from './server';
import { Invoice } from '@/types';
import { formatarData, getPaymentTerm } from './functions';

pdfMake.vfs = pdfFonts.vfs;

/**
 * Função que gera a impressão de uma invoice em PDF.
 */
export const gerarInvoice = async (data: Invoice) => {

  const description = 'Brazil Conilon Green Coffee - Crop: 2022/2023\nMATERIAL #4006772'; // ver com joao para mudar isso
  const logo = await getBase64ImageFromURL("@/../public/images/tristao.png");
  const singature = await getBase64ImageFromURL("@/../public/images/assinatura.png");
  const cnpj = data.FILIAL == 21 ? "27001247/0030-13" : "27001247/0037-90"
  const valorFormatado = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(data.VALOR_INVOICE)
  const pesoBrutoFormatado = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(data.PESO_BRUTO)
  const pesoLiquidoFormatado = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(data.PESO_LIQUIDO)
  const pesoLiquidoSacasFormatado = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(data.PESO_LIQUIDO/1000)

  const getQuantityText = () => {
    /*
    if (data.EMBALAGEM === "BULK") {
      return `${data.SACAS}\nSCS\nIN\nBULK`
    }

    if (data.EMBALAGEM === "BIG BAG") {
      return `${data.QTD_EMB}\nBIG BAGS`
    }

    return `${data.QTD_EMB}\nSCS\nIN\nJUTE`
    */

    // agora bonito
    const embalagensMap: Record<string, string> = {
      BULK: `${data.SACAS}\nSCS\nIN\nBULK`,
      "BIG BAG": `${data.QTD_EMB}\nBIG BAGS`
    }

    return embalagensMap[data.EMBALAGEM] || `${data.QTD_EMB}\nSCS\nIN\nJUTE` // vai olhar no hashmap se existe a embalagem la. Se nao existir, vai retornar os dados em sacas in jute
  }

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [25, 30, 25, 30],
    defaultStyle: {
      fontSize: 9,
    },
    content: [
      // Cabeçalho principal
      {
        image: `data:image/png;base64,${logo}`,
        width: 100,
        height: 100,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        text: 'TRISTÃO COMPANHIA DE COMÉRCIO EXTERIOR',
        style: 'headerTitle',
        alignment: 'center',
      },
      {
        text: 'Commercial Invoice',
        style: 'headerSubtitle',
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },

      // Tabela com dados principais da invoice
      {
        style: 'tableMain',
        table: {
          widths: [120, '*', '*'],
          body: [
            [
              { text: 'INVOICE NUMBER', style: 'tableHeader', alignment: 'center', border: [true, true, true, true], }, // todas as bordas
              { text: 'INVOICE DATE', style: 'tableHeader', alignment: 'center', border: [true, true, true, true], }, // todas as bordas
              { text: 'AMOUNT', style: 'tableHeader', alignment: 'center', border: [true, true, true, true], }, // todas as bordas
            ],
            [
              { text: data.NUMERO_INVOICE, style: 'tableData', alignment: 'center', border: [true, true, true, true], }, // todas as bordas
              {
                stack: [
                  { text: data.PORTO_ORIGEM },
                  { text: formatarData(data.DATA_EMBARQUE,true) },
                ],
                style: 'tableData',
                alignment: 'center',
                border: [true, true, true, true],  // todas as bordas
              },
              { text: `US ${valorFormatado}`, style: 'tableData', alignment: 'center', border: [true, true, true, true], },  // todas as bordas
            ],
            [
              { text: `Shipped per s/s: ${data.SHIPPED_PER}`, style: 'tableData', colSpan: 2, border: [true, false, false, false], }, // borda esquerda
              { text: '', style: 'tableData' },
              { text: `Our sale Nº: ${data.NUMERO_EMBARQUE}`, style: 'tableData', border: [false, false, true, false], },  // borda direita
            ],
            [
              { text: `Shipped from: ${data.PORTO_ORIGEM}`, style: 'tableData', colSpan: 2,  border: [true, false, false, false], }, // borda esquerda
              { text: '', style: 'tableData' },
              { text: `Buyers ctr Nº: PO ${data.PO}`, style: 'tableData', border: [false, false, true, false], }, // borda direita
            ],
            [
              { text: `Destination: ${data.LOCAL_DESTINO}`, style: 'tableData', colSpan: 2,  border: [true, false, false, false], },  // borda esquerda
              { text: '', style: 'tableData' },
              { text: `Payment Conditions: ${getPaymentTerm(data.CONDICAO_PAGAMENTO)}`, style: 'tableData', border: [false, false, true, false], }, // borda direita
            ],
            [
              {
                text: `For Account and Risk ${data.CLIENTE}`,
                colSpan: 3,
                border: [true, false, true, false],  // borda esquerda
                style: 'tableData',
              },
              {},
              {},
            ],
            [
              {
                text: data.ENDERECO_CLIENTE,
                colSpan: 3,
                border: [true, false, true, false],  // borda esquerda
                style: 'tableData',
              },
              {},
              {},
            ],
            [
              {
                text: 'Through Bank:',
                colSpan: 3,
                border: [true, false, true, false],  // borda esquerda
                style: 'tableData',
              },
              {},
              {},
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
        margin: [0, 0, 0, 0],
      },

      // Tabela com descrição e quantidades
      {
        style: 'tableMain',
        table: {
          widths: [120, '*', '*', '*'],
          body: [
            [
              { text: 'QUANTITY', style: 'tableHeader', alignment: 'center', border: [true, true, true, true] },  // todas as bordas
              {
                text: 'DESCRIPTION OF THE GOODS',
                colSpan: 3,
                border: [true, true, true, true], // todas as bordas
                style: 'tableHeader',
                alignment: 'center'
              },
              {},
              {},
            ],
            [
              { text: "", border: [true, false, true, false] }, // borda esquerda e direita
              {
                text: description,
                colSpan: 3,
                border: [true, true, true, true], // todas as bordas
                style: 'tableData',
                alignment: 'center'
              },
              {},
              {},
            ],
            [
              {
                text: getQuantityText(),
                rowSpan: 3,
                border: [true, false, true, false], // borda esquerda e direita
                style: 'tableData',
                alignment: 'center',
              },
              { text: 'TONS', alignment: 'center' },
              { text: 'PRICE', alignment: 'center' },
              { text: 'FOB VALUE (US$)', alignment: 'center', border: [false, false, true, false] },  // borda direita
            ],
            [
              {},
              { text: pesoLiquidoSacasFormatado, alignment: 'center' },
              { text: '306.23 USD/SCS', alignment: 'center' },
              { text: valorFormatado, alignment: 'center', border: [false, false, true, false] }, // borda direita
            ],
            [
              { text: "", border: [true, false, true, false] }, // bordas esquerda e direita
              {
                stack: [
                  { text: `BL: ${data.BL}` },
                  { text: `D/D: ${formatarData(data.DATA_DUE, true)}` }
                ],
                colSpan: 3,
                border: [false, false, true, false],  // borda direita
              },
              {},
              {},
            ],
            [
              { text: "", border: [true, false, true, false] }, // borda direita
              {
                stack: [
                  { text: `GROSS WEIGHT: ${pesoBrutoFormatado} Kgs` },
                  { text: `NET WEIGHT: ${pesoLiquidoFormatado} Kgs` },
                ],
                colSpan: 3,
                border: [false, false, true, false],  // borda direita
              },
              {},
              {},
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
        margin: [0, 0, 0, 0],
      },

      // Observações / Remarks / Bank Info
      {
        style: 'tableMain',
        table: {
          widths: [120, '*', '*'],
          body: [
            [
              { text: 'MARKS', style: 'tableHeader', border: [true, true, true, true] },
              { text: 'REMARKS', style: 'tableHeader', border: [true, true, false, true] },
              { text: '', style: 'tableHeader', border: [false, true, true, true] },
            ],
            [
              {
                stack: [
                  { text: 'CAFÉ DO BRASIL', alignment: 'center' },
                  { text: 'TRISTÃO', alignment: 'center' },
                  { text: data.NUMERO_EMBARQUE, alignment: 'center' },
                  { text: data.OIC, alignment: 'center' },
                ],
                border: [true, false, true, true],  // bordas esquerda, direita e inferior
              },
              {
                text:
                  'INTERMEDIARY BANK: JPMORGAN CHASE BANK - NY\n' +
                  'SWIFT: CHASUS33\n' +
                  'ACCOUNT: 123456-7890\n' +
                  'BENEFICIARY BANK: BANCO DO BRASIL S.A.\n' +
                  'SWIFT: BRASXXXXX\n' +
                  'ACCOUNT: 270120123456-7',
                style: 'tableData',
                border: [true, false, true, true],  // bordas esquerda, direita e inferior
              },
              {
                stack: [
                  { text: 'CNPJ', alignment: 'center' },
                  { text: cnpj, alignment: 'center' },
                ],
                border: [true, false, true, true],  // bordas esquerda, direita e inferior
              },
            ],
            [
              {
                text:
                  'Rod. Governador Mário Covas n° 400 - CEP 29135-320 - Bairro Marcilio de Noronha - Viana - ES - Brasil Tel: +55 27 3334-9800\n' +
                  'Av. José Ribeiro Tristão, n° 505 parte - bairro Aeroporto - Varginha - MG - CEP 37031-075 - Brasil - Tel: +55 35 2105-9800',
                colSpan: 3,
                border: [true, false, true, true],  // bordas esquerda, direita e inferior
                style: 'footerText',
                alignment: 'center',
              }
            ],
            [
              {
                image: `data:image/png;base64,${singature}`,
                width: 50,
                height: 50,
                alignment: 'right',
                margin: [0, 0, 0, 0]
              },
              {
                text: 'p.p Tristão Companhia de Comércio Exterior',
                colSpan: 2,
                border: [false, false, false, false],  // bordas esquerda, direita e inferior
                style: 'footerText',
                alignment: 'left',
                bold: true,
                margin: [70, 0, 0, 0]
              }
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
        margin: [0, 0, 0, 0],
      },
    ],
    styles: {
      headerTitle: {
        fontSize: 12,
        bold: true,
      },
      headerSubtitle: {
        fontSize: 10,
        bold: true,
      },
      tableMain: {
        fontSize: 9,
      },
      tableHeader: {
        bold: true,
        fillColor: '#eeeeee',
        margin: [3, 3, 3, 3],
      },
      tableData: {
        margin: [3, 3, 3, 3],
      },
      footerText: {
        fontSize: 7,
        color: '#000',
      },
    },
  };

  //@ts-ignore
  pdfMake.createPdf(docDefinition).open();
};
