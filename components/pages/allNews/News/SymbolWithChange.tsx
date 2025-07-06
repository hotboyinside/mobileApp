import { Badge } from '@rneui/base';

type SymbolWithChangeProps = {
	name: string;
	absoluteChange: string;
};

export const SymbolWithChange = ({ name, absoluteChange }) => {
	return (
		<>
			<Badge variant='pillColor' color='gray' value={name} />
		</>
	);
};
