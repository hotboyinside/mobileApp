import { BadgeProps as RNBadgeProps } from '@rneui/base';
import { ReactNode } from 'react';

export type VariantColorMap = {
	modern: ['gray'];
	pillColor: ['gray', 'primary', 'red', 'green'];
	filled: ['primary', 'red', 'green'];
	keywords: [
		'gray',
		'pink',
		'red',
		'orange',
		'yellow',
		'lime',
		'green',
		'blue',
		'grayBlue',
		'violet'
	];
};

export type VariantColorStyles = {
	[V in keyof VariantColorMap]: {
		[C in VariantColorMap[V][number]]: {
			color?: string;
			backgroundColor?: string;
			borderColor?: string;
		};
	};
};

export type BadgeVariant = 'modern' | 'pillColor' | 'filled' | 'keywords';

export type BadgeColor = 'gray' | 'primary' | 'red' | 'green';

export type BadgeProps = RNBadgeProps & {
	variant: keyof VariantColorMap;
	color?: BadgeColor;
	icon?: ReactNode;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	onlyIcon?: boolean;
};
