//import axios from "axios";

const API_URL = "http://localhost:8000"

export const getInvoices = async (filters: { dateStart?: string, dateEnd?: string }) => {
	const query = new URLSearchParams();

	if (filters.dateStart) {
		query.append('dateStart', filters.dateStart);
	}

	if (filters.dateEnd) {
		query.append('dateEnd', filters.dateEnd);
	}

	try {
		const res = await fetch(`${API_URL}/invoices?${query.toString()}`);
		const data = res.json()

		return data;
	} catch (error) {
		console.error('Erro ao buscar invoices: ', error)
	}
}