import React from 'react';
import { Button } from './Button';
import BellIcon from '@/assets/icons/bell-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Badge } from './Badge/Badge';
import { StyleSheet } from 'react-native';

export const NavNotification = () => {
	const buttonColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);

	return (
		<Button
			containerStyle={{ position: 'relative' }}
			variant='secondary'
			size='md'
			onlyIcon
		>
			<Badge
				variant='filled'
				color='red'
				containerStyle={styles.badgeContainerExtra}
				size='xs'
				value={200}
				textStyle={{ fontSize: 12, lineHeight: 18 }}
			/>
			<BellIcon width={20} height={20} color={buttonColor} />
		</Button>
	);
};

const styles = StyleSheet.create({
	badgeContainerExtra: {
		zIndex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
	},
});
