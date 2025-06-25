import { HeaderProps, Header as RNHeader } from '@rneui/base';
import LogoIcon from '@/assets/icons/logo-icon.svg';
import BellIcon from '@/assets/icons/bell-icon.svg';
import { StyleSheet } from 'react-native';
import { Button } from './Button';

export default function Header(props: HeaderProps) {
	return (
		<RNHeader
			{...props}
			leftComponent={<LogoIcon width={32} height={32} />}
			centerComponent={{ text: 'All News' }}
			rightComponent={
				<Button onlyIcon>
					<BellIcon width={20} height={20} />
				</Button>
			}
		/>
	);
}

const styles = StyleSheet.create({
	rightIconContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 12,
	},
});
