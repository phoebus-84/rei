export const valuationRangeConfig = {
	lowerBoundFactor: 0.9,
	upperBoundFactor: 1.1
} as const;

export const wholeHouseValuationConfig = {
	propertyKindMultiplier: 1.03,
	levelsMultipliers: {
		1: 1.02,
		2: 1,
		3: 0.97,
		4: 0.94
	}
} as const;

export function getWholeHouseLevelsMultiplier(levelsCount: number) {
	if (levelsCount <= 1) return wholeHouseValuationConfig.levelsMultipliers[1];
	if (levelsCount === 2) return wholeHouseValuationConfig.levelsMultipliers[2];
	if (levelsCount === 3) return wholeHouseValuationConfig.levelsMultipliers[3];

	return wholeHouseValuationConfig.levelsMultipliers[4];
}
