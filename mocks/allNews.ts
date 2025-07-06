import { MockItem } from '@/components/pages/allNews/News/News';

export const MOCK_NEWS: MockItem[] = [
	{
		id: 1,
		title: 'Акции Tesla достигли годового максимума после отчета о прибыли',
		createdTime: '2 часа назад',
		rating: 4,
		keywords: [
			{ text: 'электротранспорт', icon: '⚡', bgColor: 'pink' },
			{ text: 'технологии', bgColor: 'red' },
		],
		symbols: [{ symbol: 'TSLA', absoluteChange: '5.2' }],
	},
	{
		id: 2,
		title:
			'ФРС оставила ставки без изменений, но намекнула на возможное повышение',
		createdTime: '5 часов назад',
		rating: 3,
		keywords: [
			{ text: 'экономика', bgColor: 'green' },
			{ text: 'финансы', icon: '💰', bgColor: 'gray' },
		],
		symbols: [
			{ symbol: 'USD', absoluteChange: '-0.3' },
			{ symbol: 'FED', absoluteChange: '0.0' },
			{ symbol: 'BTC', absoluteChange: '7.8' },
			{ symbol: 'ETH', absoluteChange: '4.2' },
			{ symbol: 'BRENT', absoluteChange: '-3.5' },
		],
	},
	{
		id: 3,
		title: 'Крипторынок растет на фоне новостей о возможном одобрении BTC-ETF',
		createdTime: '8 часов назад',
		rating: 2,
		keywords: [
			{ text: 'криптовалюта', icon: '🪙', bgColor: 'pink' },
			{ text: 'блокчейн', bgColor: 'red' },
		],
		symbols: [
			{ symbol: 'BTC', absoluteChange: '7.8' },
			{ symbol: 'ETH', absoluteChange: '4.2' },
		],
	},
	{
		id: 4,
		title: 'Apple анонсировала новые модели iPhone с революционной камерой',
		createdTime: '12 часов назад',
		rating: 4,
		keywords: [
			{ text: 'гаджеты', icon: '📱', bgColor: 'green' },
			{ text: 'инновации', bgColor: 'green' },
		],
		symbols: [{ symbol: 'AAPL', absoluteChange: '2.1' }],
	},
	{
		id: 5,
		title: 'Нефть дешевеет на фоне роста запасов в США',
		createdTime: '1 день назад',
		rating: 1,
		keywords: [
			{ text: 'энергетика', bgColor: 'red' },
			{ text: 'сырье', icon: '🛢️', bgColor: 'pink' },
		],
		symbols: [
			{ symbol: 'BRENT', absoluteChange: '-3.5' },
			{ symbol: 'WTI', absoluteChange: '-3.8' },
		],
	},
	{
		id: 6,
		title: 'Amazon запускает новый сервис доставки за 15 минут',
		createdTime: '1 день назад',
		rating: 3,
		keywords: [
			{ text: 'ритейл', icon: '🛒', bgColor: 'green' },
			{ text: 'технологии', bgColor: 'red' },
		],
		symbols: [{ symbol: 'AMZN', absoluteChange: '1.7' }],
	},
	{
		id: 7,
		title: 'Microsoft представляет новую версию Windows с ИИ-ассистентом',
		createdTime: '2 дня назад',
		rating: 4,
		keywords: [
			{ text: 'софт', icon: '💻', bgColor: 'green' },
			{ text: 'искусственный интеллект', bgColor: 'gray' },
		],
		symbols: [{ symbol: 'MSFT', absoluteChange: '3.4' }],
	},
	{
		id: 8,
		title: 'NVIDIA анонсировала новые видеокарты для геймеров',
		createdTime: '2 дня назад',
		rating: 3,
		keywords: [
			{ text: 'игры', icon: '🎮', bgColor: 'gray' },
			{ text: 'железо', bgColor: 'green' },
		],
		symbols: [{ symbol: 'NVDA', absoluteChange: '6.1' }],
	},
	{
		id: 9,
		title: 'SpaceX успешно запустила новую партию спутников Starlink',
		createdTime: '3 дня назад',
		rating: 4,
		keywords: [
			{ text: 'космос', icon: '🚀', bgColor: 'red' },
			{ text: 'инновации', bgColor: 'pink' },
		],
		symbols: [{ symbol: 'SPACE', absoluteChange: '8.5' }],
	},
	{
		id: 10,
		title: 'Meta инвестирует $10 млрд в развитие метавселенной',
		createdTime: '3 дня назад',
		rating: 2,
		keywords: [
			{ text: 'VR/AR', icon: '👓', bgColor: 'red' },
			{ text: 'метавселенная', bgColor: 'green' },
		],
		symbols: [{ symbol: 'META', absoluteChange: '-2.3' }],
	},
];
