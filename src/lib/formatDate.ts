export function formatDate(date: Date): string {
	const datePart = [
		date.getFullYear().toString().substring(2, 4),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDate().toString().padStart(2, '0'),
	].join('-');

	const timePart = [
		date.getHours().toString().padStart(2, '0'),
		date.getMinutes().toString().padStart(2, '0'),
		date.getSeconds().toString().padStart(2, '0'),
	].join(':');

	return `${datePart} ${timePart}`;
}
