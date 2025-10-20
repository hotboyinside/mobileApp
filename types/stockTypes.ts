export enum StockTypesNames {
	RegularSecurities = 'CS',
	PreferredSecurities = 'PFD',
}

export const StockTypesLabels: Record<StockTypesNames, string> = {
	[StockTypesNames.RegularSecurities]: 'Regular securities',
	[StockTypesNames.PreferredSecurities]: 'Preferred securities',
};
