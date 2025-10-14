import { Change } from "@/components/ui/Change/Change";
import { $dataSymbolsData } from "@/stores/symbols/model";
import { ISymbol } from "@/types/symbols";
import { useUnit } from "effector-react";

type SymbolWithChangeProps = {
  symbol: ISymbol;
};

export const SymbolWithChange = ({ symbol }: SymbolWithChangeProps) => {
  const dataSymbolsData = useUnit($dataSymbolsData);

  const value = dataSymbolsData[symbol.symbol]?.absoluteChange;
  const priceChange = dataSymbolsData[symbol.symbol]?.priceChange;

  return <Change size='xs' value={value} priceChange={priceChange} />;
};
