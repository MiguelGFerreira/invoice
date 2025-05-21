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
import { Checkbox, Radio, RadioGroup, Select } from "@headlessui/react";

export default function Home() {
  const [filter, setFilter] = useState({
    dateStart: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
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
  const [showRFAText, setShowRFAText] = useState<boolean>(false);
  
  let invoiceDate = "date-now";

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
      ]);
      //setSelectedInvoice({ ...selectedInvoice, PRECO_FORMATADO: `${selectedInvoice.PRECO_60KG}` })
    }
  }, [selectedInvoice])

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

      {loading ? <LoadingSpinner /> :
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
              <th>Cliente</th>
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
                <td>{invoice.CLIENTE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {selectedInvoice && (
        <Modal isOpen={isModalOpen} closeModal={closeModal} title={"Invoice Selecionada"}>
          <form onSubmit={(e) => { e.preventDefault(); gerarInvoice(selectedInvoice, showRFAText, invoiceDate) }} className="formulario-card">
            <div className="space-y-4">
              <div>
                <label htmlFor="description">Descrição</label>
                <input type="text" id="description" onChange={(desc) => setSelectedInvoice({ ...selectedInvoice, DESCRIPTION: desc.target.value })} />
              </div>
            </div>

            <label>Preço</label>
            <RadioGroup
              value={selectedInvoice.COND_PAG}
              //onChange={(value) => setSelectedInvoice({ ...selectedInvoice, COND_PAG: value })}
              onChange={(value) => {
                const selectedPrice = prices.find((p) => p.unity === value);
                if (selectedPrice) {
                  setSelectedInvoice({
                    ...selectedInvoice,
                    COND_PAG: selectedPrice.unity,
                    PRECO_FORMATADO: String(selectedPrice.price),
                  })
                }
              }}
              className="grid grid-cols-2 gap-4"
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
                      <input className="text-black/70" type="text" defaultValue={price.price} onChange={(desc) => setSelectedInvoice({ ...selectedInvoice, PRECO_FORMATADO: desc.target.value })} />
                    </div>
                    <CheckCircleIcon className="size-6 absolute top-4 right-4 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                  </div>
                </Radio>
              ))}
            </RadioGroup>

            <label>Data da Invoice</label>
            <Select name="invoice-date" onChange={(e) => {invoiceDate = e.target.value}}>
              <option value="date-now">Data atual</option>
              <option value="date-bl">Data do BL</option>
            </Select>

            <label>Mostra texto RFA</label>
            <Checkbox
              checked={showRFAText}
              onChange={setShowRFAText}
              className="group block size-4 rounded border bg-gray-200 data-[checked]:bg-[#003B2F]"
            >
              {/* Checkmark icon */}
              <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Checkbox>

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
