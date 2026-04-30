export type LocationSuggestion = {
	label: string;
	latitude: number;
	longitude: number;
	osmId: number | null;
	osmType: string;
	type: string;
	category: string;
	address: Record<string, string | undefined>;
	streetAddress: string;
	city: string;
};

const pocketBaseOsmTypes: Record<string, 'N' | 'W' | 'R'> = {
	n: 'N',
	node: 'N',
	w: 'W',
	way: 'W',
	r: 'R',
	relation: 'R'
};

export function toPocketBaseOsmType(value: string | null | undefined) {
	if (!value) return '';

	return pocketBaseOsmTypes[value.trim().toLowerCase()] ?? '';
}

export function parseCoordinate(value: string | null, min: number, max: number) {
	if (!value) return null;
	const parsed = Number(value);

	if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
		return null;
	}

	return parsed;
}

export function calculateDistanceKm(
	fromLatitude: number,
	fromLongitude: number,
	toLatitude: number,
	toLongitude: number
) {
	const earthRadiusKm = 6371;
	const latitudeDelta = toRadians(toLatitude - fromLatitude);
	const longitudeDelta = toRadians(toLongitude - fromLongitude);
	const fromLatitudeRadians = toRadians(fromLatitude);
	const toLatitudeRadians = toRadians(toLatitude);

	const haversine =
		Math.sin(latitudeDelta / 2) ** 2 +
		Math.cos(fromLatitudeRadians) * Math.cos(toLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2;

	return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function formatDistanceKm(distanceKm: number) {
	if (distanceKm < 1) {
		return `${Math.round(distanceKm * 1000)} m`;
	}

	return `${distanceKm.toLocaleString('it-IT', {
		maximumFractionDigits: distanceKm < 10 ? 1 : 0
	})} km`;
}

function toRadians(value: number) {
	return (value * Math.PI) / 180;
}
