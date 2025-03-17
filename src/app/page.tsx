"use client"

import { gerarInvoice } from "@/utils/gerarInvoice";

interface Invoice {
  num: number,
  data: string,
  sla: string,
  pqp: string,
}

const invoices: Invoice[] = [
  {num:123, data:"12/12/12", sla:"mano", pqp:"nano"},
  {num:1243, data:"12/03/12", sla:"oloco", pqp:"Kosovo"},
  {num:243, data:"12/05/15", sla:"credo", pqp:"cruzes"},
  {num:456, data:"12/08/18", sla:"boi", pqp:"preto"},
  {num:136, data:"12/02/20", sla:"jogo", pqp:"perdi"},
  {num:23546, data:"12/09/22", sla:"cocada", pqp:"cabeçada"},
]

export default function Home() {
  const handleClick = () => {
    gerarInvoice();
  }

  return (
    <div className="principal">
      <h1>Tela de Invoice</h1>

      <table className="grupotristao">
        <thead>
          <tr>
            <th>botao</th>
            <th>number</th>
            <th>data</th>
            <th>seila o que um</th>
            <th>seique o la dois</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.num}>
              <td><button onClick={handleClick}>Gerar</button></td>
              <td>{invoice.num}</td>
              <td>{invoice.data}</td>
              <td>{invoice.sla}</td>
              <td>{invoice.pqp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
