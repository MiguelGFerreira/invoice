import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// É importante setar a fonte virtual do pdfmake
pdfMake.vfs = pdfFonts.vfs;

/**
 * Função que gera a impressão de uma invoice em PDF.
 * Pode ser chamada a partir de um componente React/Next.
 */
export const gerarInvoice = () => {
  // Defina aqui os dados dinâmicos da sua invoice, se necessário:
  const invoiceNumber = 'T.088/24';
  const invoiceDate = 'December 7, 2024';
  const fromLocation = 'SANTOS-SP';
  const toLocation = 'USS';
  const invoiceTotal = '1,322,865.60';
  const paymentConditions = 'NET 60 DAYS';
  const reference = 'B/L 23219';
  const buyer = 'STARBUCKS CORPORATION\n2401 UTAH AVE S, 8TH FLOOR\nSEATTLE, WA 98134, USA';
  const quantity = '259,20';
  const bags = '4.320';
  const netWeight = '259.20 KG';
  const grossWeight = '259.40 KG';
  const fobValue = 'US$ 1,322,865.60';
  const description =
    'Brazil Conilon Green Coffee - Crop: 2022/2023\nMATERIAL #4006772';

  // Definição do documento PDF (docDefinition) conforme layout desejado
  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [25, 30, 25, 30],
    defaultStyle: {
      fontSize: 9,
    },
    content: [
      // Cabeçalho principal
      {
        image: 'public/tristao.png'
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
              { text: invoiceNumber, style: 'tableData', alignment: 'center', border: [true, true, true, true], }, // todas as bordas
              {
                stack: [
                  { text: fromLocation },
                  { text: invoiceDate },
                ],
                style: 'tableData',
                alignment: 'center',
                border: [true, true, true, true],  // todas as bordas
              },
              { text: invoiceTotal, style: 'tableData', alignment: 'center', border: [true, true, true, true], },  // todas as bordas
            ],
            [
              { text: 'Shipped per ss CMA CGM BELLIOZ', style: 'tableData', border: [true, false, false, false], }, // borda esquerda
              { text: '', style: 'tableData' },
              { text: 'Our sale Nº: 063124', style: 'tableData', border: [false, false, true, false], },  // borda direita
            ],
            [
              { text: `Shipped from: ${fromLocation}`, style: 'tableData', border: [true, false, false, false], }, // borda esquerda
              { text: '', style: 'tableData' },
              { text: 'Buyers order Nº: PO 107114', style: 'tableData', border: [false, false, true, false], }, // borda direita
            ],
            [
              { text: 'Destination: NEW ORLEANS', style: 'tableData',  border: [true, false, false, false], },  // borda esquerda
              { text: '', style: 'tableData' },
              { text: `Payment Conditions: ${paymentConditions}`, style: 'tableData', border: [false, false, true, false], }, // borda direita
            ],
            [
              {
                text: 'For Account and Risk The FOLGER COFFEE COMPANY',
                colSpan: 3,
                border: [true, false, true, false],  // borda esquerda
                style: 'tableData',
              },
              {},
              {}, // borda direita
            ],
            [
              {
                text: '1 STRAWBERRY LANE-ORRVILLE-OH 44667, ESTADOS UNIDOS - EXTERIOR - ENGLISH',
                colSpan: 3,
                border: [true, false, true, false],  // borda esquerda
                style: 'tableData',
              },
              {},
              {}, // borda direita
            ],
            [
              {
                text: 'Through Bank:',
                colSpan: 3,
                border: [true, false, true, false],  // borda esquerda
                style: 'tableData',
              },
              {},
              {}, // borda direita
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
          widths: [120, '*', '*', '*'],	// mudar para 4 colunas
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
                stack: [
                  { text: bags },
                  { text: 'SCS' },
                  { text: 'IN' },
                ],
                rowSpan: 2,
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
              { text: quantity, alignment: 'center' },
              { text: '306.23 USD/SCS', alignment: 'center' },
              { text: fobValue, alignment: 'center', border: [false, false, true, false] }, // borda direita
            ],
            [
              { text: "", border: [true, false, true, false] }, // bordas esquerda e direita
              {
                stack: [
                  { text: 'BL: SSZ1543618' },
                  { text: 'D/D: December 3, 2024' }
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
                  { text: `GROSS WEIGHT: ${grossWeight}` },
                  { text: `NET WEIGHT: ${netWeight}` },
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
                  { text: '0531/24', alignment: 'center' },
                  { text: '002/196-1/262', alignment: 'center' },
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
                  { text: '27001247/0030-13', alignment: 'center' },
                ],
                border: [true, false, true, true],  // bordas esquerda, direita e inferior
              },
            ],
            [
              {
                text:
                  'R. Governador Mário Covas 40 - Área nobre - CEP 21539-280 - Bairro de Noronha - Bahia - ES - Brasil\n' +
                  'Tel: +55 (27) 3362-8900 - Fax: +55 (27) 3362-8989\n' +
                  'Av. José Ribeiro Pinto, 128 - Conj. 06 - Pq. Ind. Xangai - MG - CEP 37037-013 - Brasil',
                colSpan: 3,
                border: [true, false, true, true],  // bordas esquerda, direita e inferior
                style: 'footerText',
                alignment: 'center',
              }
            ]
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
        color: '#555',
      },
    },
  };

  //@ts-ignore
  pdfMake.createPdf(docDefinition).open();
};
