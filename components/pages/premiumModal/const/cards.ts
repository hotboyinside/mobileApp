import AdDuoIcon from '@/assets/icons/ad-duo-icon.svg';
import ChatLikeDuoIcon from '@/assets/icons/chat-like-duo-icon.svg';
import MedalDuoIcon from '@/assets/icons/medal-duo-icon.svg';
import MicrophoneDuoIcon from '@/assets/icons/microphone-duo-icon.svg';
import PieChartIcon from '@/assets/icons/pie-chart-icon.svg';
import SettingsDuoIcon from '@/assets/icons/settings-duo-icon.svg';
import StarDuoIcon from '@/assets/icons/star-duo-icon.svg';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

interface Card {
	icon: FC<SvgProps>;
	title: string;
	isSoon: boolean;
	description?: string;
}

export const CARDS: Card[] = [
	{
		icon: StarDuoIcon,
		title: 'Keyword customization',
		description: 'Highlight the news you are hunting for',
		isSoon: false,
	},
	{
		icon: MicrophoneDuoIcon,
		title: 'Voiceover alerts',
		description: 'Make sure you never miss the important stuff',
		isSoon: false,
	},
	{
		icon: MedalDuoIcon,
		title: 'Additional filters',
		description: 'Keep your focus on what is important',
		isSoon: false,
	},
	{
		icon: AdDuoIcon,
		title: 'No ads',
		description: 'Opt in for the uninterrupted trading experience',
		isSoon: false,
	},
	{
		icon: ChatLikeDuoIcon,
		title: 'Unlimited news alerts',
		description: 'Stay updated with alerts on the latest news',
		isSoon: true,
	},
	{
		icon: PieChartIcon,
		title: 'Congress trading chart',
		description: 'Get a sneak peek at any politician is top traded assets',
		isSoon: true,
	},
	{
		icon: SettingsDuoIcon,
		title: 'And many other customization options!',
		isSoon: true,
	},
];
