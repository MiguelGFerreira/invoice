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
          widths: [120, 120, '*'],
          body: [
            [
              { text: 'INVOICE NUMBER', style: 'tableHeader', alignment: 'center' },
			  { text: 'INVOICE DATE', style: 'tableHeader', alignment: 'center' },
              { text: 'AMOUNT', style: 'tableHeader', alignment: 'center' },
            ],
            [
			  { text: invoiceNumber, style: 'tableData', alignment: 'center' },
			  {
				stack: [
					{ text: fromLocation },
					{ text: invoiceDate },
				],
				style: 'tableData',
				alignment: 'center'
			  },
			  { text: invoiceTotal, style: 'tableData', alignment: 'center' },
            ],
			[
			  { text: 'Shipped per ss CMA CGM BELLIOZ', style: 'tableData' },
			  { text: '', style: 'tableData' },
			  { text: 'Our sale Nº: 063124', style: 'tableData' },
			],
			[
			  { text: `Shipped from: ${fromLocation}`, style: 'tableData' },
			  { text: '', style: 'tableData' },
			  { text: 'Buyers order Nº: PO 107114', style: 'tableData' },
			],
			[
			  { text: 'Destination: NEW ORLEANS', style: 'tableData' },
			  { text: '', style: 'tableData' },
			  { text: `Payment Conditions: ${paymentConditions}`, style: 'tableData' },
			],
			[
			  {
				text: 'For Account and Risk The FOLGER COFFEE COMPANY',
				colSpan: 3,
				style: 'tableData',
			  },
			  {},
			  {},
			],
			[
			  {
				text: '1 STRAWBERRY LANE-ORRVILLE-OH 44667, ESTADOS UNIDOS - EXTERIOR - ENGLISH',
				colSpan: 3,
				style: 'tableData',
			  },
			  {},
			  {},
			],
			[
			  {
				text: 'Through Bank:',
				colSpan: 3,
				style: 'tableData',
			  },
			  {},
			  {},
			],
          ],
        },
        layout: 'headerLineOnly',
        margin: [0, 0, 0, 10],
      },

      // Tabela com descrição e quantidades
      {
        style: 'tableMain',
        table: {
          widths: [100, '*', '*', '*'],	// mudar para 4 colunas
          body: [
            [
              { text: 'QUANTITY', style: 'tableHeader', alignment: 'center' },
              {
				text: 'DESCRIPTION OF THE GOODS',
				colSpan: 3,
				style: 'tableHeader',
				alignment: 'center'
			  },
			  {},
			  {},
            ],
            [
              {},
			  { 
				text: description,
				colSpan: 3,
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
				style: 'tableData',
                alignment: 'center',
			  },
			  { text: 'TONS', alignment: 'center', border: [true,true,true,true] },
			  { text: 'PRICE', alignment: 'center' },
			  { text: 'FOB VALUE (US$)', alignment: 'center' },
			],
			[
			  {},
			  { text: quantity, alignment: 'center'},
			  { text: '306.23 USD/SCS', alignment: 'center'},
			  { text: fobValue, alignment: 'center'},
			],
			[
			  {},
			  {
				stack: [
				  { text: 'BL: SSZ1543618' },
				  { text: 'D/D: December 3, 2024'}
				],
				colSpan: 3,
			  },
			  {},
			  {},
			],
			[
			  {},
			  {
				stack: [
				  { text: `GROSS WEIGHT: ${grossWeight}` },
				  { text: `NET WEIGHT: ${netWeight}` },
				],
				colSpan: 2,
			  },
			  {},
			  {},
			],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 10],
      },

      // Observações / Remarks / Bank Info
      {
        style: 'tableMain',
        table: {
          widths: ['auto', '*', '*'],
          body: [
            [
              { text: 'MARKS', style: 'tableHeader' },
              { text: 'REMARKS', style: 'tableHeader' },
              { text: '', style: 'tableHeader' },
            ],
            [
              {
				stack: [
					{ text: 'CAFÉ DO BRASIL', alignment: 'center' },
					{ text: 'TRISTÃO', alignment: 'center' },
					{ text: '0531/24', alignment: 'center' },
					{ text: '002/196-1/262', alignment: 'center' },
				]
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
              },
			  {
				stack: [
					{ text: 'CNPJ', alignment: 'center' },
					{ text: '27001247/0030-13', alignment: 'center' },
				]
			  },
            ],
          ],
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10],
      },

      // Rodapé com endereço e informações adicionais
      {
        text:
          'R. Governador Mário Covas 40 – Área nobre – CEP 21539-280 – Bairro de Noronha – Bahia – ES – Brasil\n' +
          'Tel: +55 (27) 3362-8900 – Fax: +55 (27) 3362-8989\n' +
          'Av. José Ribeiro Pinto, 128 – Conj. 06 – Pq. Ind. Xangai – MG – CEP 37037-013 – Brasil',
        style: 'footerText',
        alignment: 'center',
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
