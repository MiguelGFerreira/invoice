"use client"
import { gerarInvoice } from "@/utils/gerarInvoice";

export default function Home() {
  const handleClick = () => {
    gerarInvoice();
  }

  return (
    <div className="flex justify-center hover:cursor-pointer">
      <button onClick={handleClick} className="bg-green-400">Press</button>
    </div>
  );
}
