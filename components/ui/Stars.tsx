import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import StarIcon from '@/assets/icons/star-icon.svg';
import StarIconGradient from '@/assets/icons/star-icon-gradient.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';

type StarRatingProps = {
	rating: number;
	starHeight?: number;
	starWidth?: number;
	containerStyle?: ViewStyle;
};

export const Stars = ({
	rating,
	starHeight = 16,
	starWidth = 16,
	containerStyle,
}: StarRatingProps) => {
	const unfilledIconColor = useThemeColor({}, appTokens.background.quaternary);

	return (
		<View style={[styles.container, containerStyle]}>
			{Array.from({ length: 4 }).map((_, index) => {
				return index < rating ? (
					<StarIconGradient key={index} width={starWidth} height={starHeight} />
				) : (
					<StarIcon
						key={index}
						width={starWidth}
						height={starHeight}
						color={unfilledIconColor}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
});
