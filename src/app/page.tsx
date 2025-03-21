"use client"

import { getInvoices } from "@/api";
import { Invoice } from "@/types";
import { gerarInvoice } from "@/utils/gerarInvoice";
import { useEffect, useState } from "react";
import DocumentCurrency from "@/../public/icons/DocumentCurrency";
import LoadingSpinner from "@/components/LoadingSpinner";
import { formatarData } from "@/utils/functions"

export default function Home() {
  const [filter, setFilter] = useState({
    dateStart: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    dateEnd: ""
  });
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  const handleClick = (invoice: Invoice) => {
    gerarInvoice(invoice);
  }

  async function fetchInvoices () {
    setLoading(true);
    const data = await getInvoices(filter);
    setInvoices(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="principal">
      <h1>Tela de Invoice</h1>

      <section className="card">
        <form action="" className="formulario">
          <div>
            <label htmlFor="dateStart">Data de</label>
            <input type="date" id="dateStart" name="dateStart" onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="dateEnd">Data Até</label>
            <input type="date" id="dateEnd" name="dateEnd" onChange={handleFilterChange} />
          </div>
          <div></div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              fetchInvoices();
            }}
          >
            Pesquisar
          </button>
        </form>
      </section>

      <table className="grupotristao">
        <thead>
          <tr>
            <th>Gerar</th>
            <th>Invoice</th>
            <th>Embarque</th>
            <th>Filial</th>
            <th>Pedido</th>
            <th>PO</th>
            <th>Data Pedido</th>
            <th>Cond. Pag.</th>
            <th>Sit. Pedido</th>
            {/* <th>Porto de Origem</th> */}
            <th>Cliente</th>
            {/* <th>País Destino</th>
            <th>Local Destino</th>
            <th>End. Cliente</th>
            <th>Emb.</th>
            <th>Preço Un.</th>
            <th>Preço 60kg</th>
            <th>Preço Cent/Lib</th>
            <th>Preço Ton.</th>
            <th>Preço 50kg</th>
            <th>Ref. Importação</th>
            <th>Peso Liq.</th>
            <th>Peso Bruto</th>
            <th>Documentos</th>
            <th>Sacas</th>
            <th>Embarque</th>
            <th>Status Embarque</th>
            <th>Data Embarque</th>
            <th>Data Conhecimento</th>
            <th>Pedido Exp.</th>
            <th>Via</th>
            <th>Data Invoice</th>
            <th>BL</th>
            <th>Valor Invoice</th>
            <th>Num. Due</th>
            <th>Chave Due</th>
            <th>Data Due</th>
            <th>Shipped Per</th>
            <th>OIC</th>
            <th>EE8_QTDEM1</th> */}
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice, idx) => (
            <tr key={idx}>
              <td><DocumentCurrency onClick={() => handleClick(invoice)} /></td>
              <td>{invoice.NUMERO_INVOICE}</td>
              <td>{invoice.NUMERO_EMBARQUE}</td>
              <td>{invoice.FILIAL}</td>
              <td>{invoice.PEDIDO}</td>
              <td>{invoice.PO}</td>
              <td>{formatarData(invoice.DATA_PEDIDO)}</td>
              <td>{invoice.CONDICAO_PAGAMENTO}</td>
              <td>{invoice.SITUACAO_PEDIDO}</td>
              {/* <td>{invoice.PORTO_ORIGEM}</td> */}
              <td>{invoice.CLIENTE}</td>
              {/* <td>{invoice.PASIDEST}</td>
              <td>{invoice.LOCAL_DESTINO}</td>
              <td>{invoice.ENDERECO_CLIENTE}</td>
              <td>{invoice.EMBALAGEM}</td>
              <td>{invoice.PRECO_UNIT}</td>
              <td>{invoice.PRECO_60KG}</td>
              <td>{invoice.PRECO_CENT_LIB}</td>
              <td>{invoice.PRECO_TONELADAS}</td>
              <td>{invoice.PRECO_50KG}</td>
              <td>{invoice.REF_IMPORTACAO}</td>
              <td>{invoice.PESO_LIQUIDO}</td>
              <td>{invoice.PESO_BRUTO}</td>
              <td>{invoice.DOCUMENTOS}</td>
              <td>{invoice.SACAS}</td>
              <td>{invoice.EMBARQUE}</td>
              <td>{invoice.STATUS_EMBARQUE}</td>
              <td>{formatarData(invoice.DATA_EMBARQUE)}</td>
              <td>{formatarData(invoice.DATA_CONHECIMENTO)}</td>
              <td>{invoice.PEDIDO_EXPORTACAO}</td>
              <td>{invoice.VIA}</td>
              <td>{formatarData(invoice.DATA_INVOICE)}</td>
              <td>{invoice.BL}</td>
              <td>{invoice.VALOR_INVOICE}</td>
              <td>{invoice.NUMERO_DUE}</td>
              <td>{invoice.CHAVE_DUE}</td>
              <td>{formatarData(invoice.DATA_DUE)}</td>
              <td>{invoice.SHIPPED_PER}</td>
              <td>{invoice.OIC}</td>
              <td>{invoice.EE8_QTDEM1}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
