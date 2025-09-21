import { Change } from '@/components/ui/Change/Change';
import { ISymbol } from '@/types/symbols';

type SymbolWithChangeProps = {
	symbol: ISymbol;
	dataSymbolsData: Record<string, ISymbol>;
};

export const SymbolWithChange = ({
	symbol,
	dataSymbolsData,
}: SymbolWithChangeProps) => {
	const value = dataSymbolsData[symbol.symbol]?.absoluteChange ?? 0;
	const priceChange = dataSymbolsData[symbol.symbol]?.priceChange ?? 0;

	return <Change size='xs' value={value} priceChange={priceChange} />;
};
