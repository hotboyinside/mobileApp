import { BadgeProps as RNBadgeProps } from '@rneui/base';

export type VariantColorMap = {
	modern: ['gray'];
	pillColor: ['gray', 'primary', 'red', 'green'];
	filled: ['primary', 'red', 'green'];
	keywords: ['gray', 'primary', 'red', 'green'];
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
	color: BadgeColor;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	onlyIcon?: boolean;
};
