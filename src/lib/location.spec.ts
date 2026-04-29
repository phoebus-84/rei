import { describe, expect, it } from 'vitest';
import { calculateDistanceKm, formatDistanceKm, parseCoordinate } from './location';

describe('location helpers', () => {
	it('parses coordinates only inside accepted bounds', () => {
		expect(parseCoordinate('45.4676', -90, 90)).toBe(45.4676);
		expect(parseCoordinate('181', -180, 180)).toBeNull();
		expect(parseCoordinate('not-a-coordinate', -90, 90)).toBeNull();
		expect(parseCoordinate(null, -90, 90)).toBeNull();
	});

	it('calculates approximate distance between Ivrea and Turin', () => {
		const distance = calculateDistanceKm(45.4676, 7.8756, 45.0703, 7.6869);

		expect(distance).toBeGreaterThan(45);
		expect(distance).toBeLessThan(50);
	});

	it('formats short and long distances for Italian UI', () => {
		expect(formatDistanceKm(0.42)).toBe('420 m');
		expect(formatDistanceKm(4.25)).toBe('4,3 km');
		expect(formatDistanceKm(18.2)).toBe('18 km');
	});
});
