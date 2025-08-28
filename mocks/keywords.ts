import { KeywordsColorVariants, UserKeyword } from '@/types/keywords';

export const userKeywordsMock: UserKeyword[] = [
	{
		_id: '1',
		text: 'Stocks',
		color: KeywordsColorVariants.Green,
		isVoiceoverEnabled: true,
		iconKey: 'bolt',
	},
	{
		_id: '2',
		text: 'Forex',
		color: KeywordsColorVariants.Blue,
		isVoiceoverEnabled: false,
		iconKey: 'rocket',
	},
	{
		_id: '3',
		text: 'Cryptocurrency',
		color: KeywordsColorVariants.Violet,
		isVoiceoverEnabled: true,
		iconKey: 'magnifier',
	},
	{
		_id: '4',
		text: 'Futures',
		color: KeywordsColorVariants.Orange,
		isVoiceoverEnabled: false,
		iconKey: 'congress',
	},
	{
		_id: '5',
		text: 'Options',
		color: KeywordsColorVariants.Red,
		isVoiceoverEnabled: true,
		iconKey: 'people',
	},
	{
		_id: '6',
		text: 'Indexes',
		color: KeywordsColorVariants.Slate,
		isVoiceoverEnabled: false,
		iconKey: 'planet',
	},
	{
		_id: '7',
		text: 'ETFs',
		color: KeywordsColorVariants.Gray,
		isVoiceoverEnabled: true,
		iconKey: 'megaphone',
	},
	{
		_id: '8',
		text: 'Technical Analysis',
		color: KeywordsColorVariants.Yellow,
		isVoiceoverEnabled: false,
		iconKey: 'file',
	},
	{
		_id: '9',
		text: 'Fundamental Analysis',
		color: KeywordsColorVariants.Pink,
		isVoiceoverEnabled: true,
		iconKey: 'star',
	},
	{
		_id: '10',
		text: 'Risk Management',
		color: KeywordsColorVariants.Lime,
		isVoiceoverEnabled: false,
		iconKey: 'planet',
	},
];
