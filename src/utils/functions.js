export function formatarData(dataISO, full = false) {
	if (!dataISO) return "";

	const [ano, mes, dia] = dataISO.split("T")[0].split("-");
	const data = new Date(ano, mes - 1, dia);
	
	if (isNaN(data)) return "Data Inválida";

	if (full) {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "2-digit",
		}).format(data);
	}

	return new Intl.DateTimeFormat("pt-BR").format(data);
}