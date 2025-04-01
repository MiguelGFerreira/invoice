"use client"

import { getInvoices } from "@/api";
import { Invoice } from "@/types";
import { gerarInvoice } from "@/utils/gerarInvoice";
import { useEffect, useState } from "react";
import DocumentCurrency from "@/../public/icons/DocumentCurrency";
import CheckCircleIcon from "@/../public/icons/CheckCircleIcon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { formatarData } from "@/utils/functions"
import Modal from "@/components/Modal";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

export default function Home() {
  const [filter, setFilter] = useState({
    dateStart: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    dateEnd: ""
  });
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [prices, setPrices] = useState([{
    unity: '',
    price: 0
  }]);

  const handleOpenModal = (invoiceId: number) => {
    const selected = invoices.find((inv) => inv.ID === invoiceId)
    if (!selected) return;

    setSelectedInvoice(selected);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedInvoice(null);
    setIsModalOpen(false);
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  async function fetchInvoices() {
    setLoading(true);
    const data = await getInvoices(filter);
    setInvoices(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  useEffect(() => {
    if (selectedInvoice) {
      setPrices([
        { unity: 'USD/SCS', price: selectedInvoice.PRECO_60KG },
        { unity: 'USC/LB', price: selectedInvoice.PRECO_CENT_LIB },
        { unity: 'USD/Mton', price: selectedInvoice.PRECO_TONELADAS },
        { unity: 'USD/50KG', price: selectedInvoice.PRECO_50KG }
      ])
    }
  }, [selectedInvoice])

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
          {invoices.map((invoice) => (
            <tr key={invoice.ID}>
              <td><DocumentCurrency onClick={() => handleOpenModal(invoice.ID)} className="cursor-pointer" /></td>
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

      {selectedInvoice && (
        <Modal isOpen={isModalOpen} closeModal={closeModal} title={"Invoice Selecionada"}>
          <form onSubmit={(e) => { e.preventDefault(); gerarInvoice(selectedInvoice) }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" />
              </div>
            </div>

            <RadioGroup
              value={selectedInvoice.COND_PAG}
              onChange={(value) => setSelectedInvoice({ ...selectedInvoice, COND_PAG: value })}
              className="space-y-4"
            >
              {prices.map((price) => (
                <Radio
                  key={price.unity}
                  value={price.unity}
                  className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-black shadow-md transition focus:outline-none data-[focus]:outline-white data-[checked]:bg-[#003B2F]"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="text-sm/6">
                      <p className="group-data-[checked]:text-white">{price.unity}</p>
                      <div className="text-black/50 group-data-[checked]:text-white" >{price.price}</div>
                    </div>
                    <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                  </div>
                </Radio>
              ))}
            </RadioGroup>

            <div className="mt-6 flex justify-end">
              <button type="submit">
                Gerar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
