export function formatarData(dataISO) {
	if (dataISO) {
		const dia = dataISO.substr(8, 2);
		const mes = dataISO.substr(5, 2);
		const ano = dataISO.substr(0, 4);
		//const hora = dataISO.substr(11, 2);
		//const minuto = dataISO.substr(14, 2);

		return `${dia}/${mes}/${ano}`
	}
}