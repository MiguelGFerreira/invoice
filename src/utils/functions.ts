export function formatarData(dataISO: string, full = false) {
	if (!dataISO) return "";

	const partes = dataISO.split("T");
	if (partes.length === 0) return "Data Inválida";

	const [ano, mes, dia] = partes[0].split("-").map(Number);
	const data = new Date(ano, mes - 1, dia);

	if (isNaN(data.getTime())) return "Data Inválida";

	if (full) {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "2-digit",
		}).format(data);
	}

	return new Intl.DateTimeFormat("pt-BR").format(data);
}

const paymentTermsMap: Record<string, string> = {
	"180D": "NET 180 DAYS",
	"120D": "NET 120 DAYS",
	"90D": "NET 90 DAYS",
	"75D": "NET 75 DAYS",
	"60D": "NET 60 DAYS",
	"45D": "NET 45 DAYS",
	"30D": "NET 30 DAYS",
	"pp": "PREPAID"
}

export const getPaymentTerm = (code: string): string => paymentTermsMap[code] || "Invalid Code";