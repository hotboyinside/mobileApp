import { MockItem } from '@/components/pages/allNews/News/News';

export const MOCK_NEWS: MockItem[] = [
	{
		id: 1,
		title: 'Акции Tesla достигли годового максимума после отчета о прибыли',
		description:
			'Компания Tesla опубликовала квартальный отчёт, показав рост выручки на 25%, что привело к резкому росту акций.',
		createdTime: '2 часа назад',
		rating: 4,
		keywords: [
			{ text: 'электротранспорт', icon: '⚡', color: 'pink' },
			{ text: 'технологии', color: 'red' },
		],
		symbols: [
			{
				symbol: 'TSLA',
				currentPrice: '845.32',
				absoluteChange: '5.2',
				changePrice: '42.15',
				volume: '32.5M',
				float: '960.2M',
				dayRange: '852.75',
			},
		],
	},
	{
		id: 2,
		title:
			'ФРС оставила ставки без изменений, но намекнула на возможное повышение',
		description:
			'Федеральная резервная система США сохранила ключевую ставку на прежнем уровне, но указала на потенциальный рост инфляции.',
		createdTime: '5 часов назад',
		rating: 3,
		keywords: [
			{ text: 'экономика', color: 'green' },
			{ text: 'финансы', icon: '💰', color: 'gray' },
		],
		symbols: [
			{
				symbol: 'USD',
				currentPrice: '1.085',
				absoluteChange: '-0.3',
				changePrice: '-0.0032',
				volume: '—',
				float: '—',
				dayRange: '1.087',
			},
			{
				symbol: 'FED',
				currentPrice: '5.25',
				absoluteChange: '0.0',
				changePrice: '0.00',
				volume: '—',
				float: '—',
				dayRange: '—',
			},
			{
				symbol: 'BTC',
				currentPrice: '42876',
				absoluteChange: '7.8',
				changePrice: '3102',
				volume: '24.8B',
				float: '19.5M',
				dayRange: '43200',
			},
			{
				symbol: 'ETH',
				currentPrice: '2284',
				absoluteChange: '4.2',
				changePrice: '92',
				volume: '12.3B',
				float: '120.2M',
				dayRange: '2305',
			},
			{
				symbol: 'BRENT',
				currentPrice: '78.45',
				absoluteChange: '-3.5',
				changePrice: '-2.85',
				volume: '—',
				float: '—',
				dayRange: '79.20',
			},
		],
	},
	{
		id: 3,
		title: 'Крипторынок растет на фоне новостей о возможном одобрении BTC-ETF',
		description:
			'Инвесторы активно скупают биткоин и эфириум на слухах о скором одобрении биржевых фондов на криптовалюту.',
		createdTime: '8 часов назад',
		rating: 2,
		keywords: [
			{ text: 'криптовалюта', icon: '🪙', color: 'pink' },
			{ text: 'блокчейн', color: 'red' },
		],
		symbols: [
			{
				symbol: 'BTC',
				currentPrice: '42876',
				absoluteChange: '7.8',
				changePrice: '3102',
				volume: '24.8B',
				float: '19.5M',
				dayRange: '43200',
			},
			{
				symbol: 'ETH',
				currentPrice: '2284',
				absoluteChange: '4.2',
				changePrice: '92',
				volume: '12.3B',
				float: '120.2M',
				dayRange: '2305',
			},
		],
	},
	{
		id: 4,
		title: 'Apple анонсировала новые модели iPhone с революционной камерой',
		description:
			'Компания Apple представила iPhone 16 Pro с улучшенной системой камер, включая 48-МП сенсор и ночной режим 8K.',
		createdTime: '12 часов назад',
		rating: 4,
		keywords: [
			{ text: 'гаджеты', icon: '📱', color: 'green' },
			{ text: 'инновации', color: 'green' },
		],
		symbols: [
			{
				symbol: 'AAPL',
				currentPrice: '192.45',
				absoluteChange: '2.1',
				changePrice: '3.95',
				volume: '42.8M',
				float: '15.9B',
				dayRange: '193.75',
			},
		],
	},
	{
		id: 5,
		title: 'Нефть дешевеет на фоне роста запасов в США',
		description:
			'Цены на нефть марки Brent упали ниже $80 за баррель из-за неожиданного увеличения коммерческих запасов в США.',
		createdTime: '1 день назад',
		rating: 1,
		keywords: [
			{ text: 'энергетика', color: 'red' },
			{ text: 'сырье', icon: '🛢️', color: 'pink' },
		],
		symbols: [
			{
				symbol: 'BRENT',
				currentPrice: '78.45',
				absoluteChange: '-3.5',
				changePrice: '-2.85',
				volume: '—',
				float: '—',
				dayRange: '79.20',
			},
			{
				symbol: 'WTI',
				currentPrice: '73.80',
				absoluteChange: '-3.8',
				changePrice: '-2.90',
				volume: '—',
				float: '—',
				dayRange: '74.30',
			},
		],
	},
	{
		id: 6,
		title: 'Amazon запускает новый сервис доставки за 15 минут',
		description:
			'Amazon Prime Now расширяет зону покрытия и обеставляет доставку товаров первой необходимости за 15 минут в 20 новых городах.',
		createdTime: '1 день назад',
		rating: 3,
		keywords: [
			{ text: 'ритейл', icon: '🛒', color: 'green' },
			{ text: 'технологии', color: 'red' },
		],
		symbols: [
			{
				symbol: 'AMZN',
				currentPrice: '145.80',
				absoluteChange: '1.7',
				changePrice: '2.45',
				volume: '28.3M',
				float: '10.2B',
				dayRange: '147.15',
			},
		],
	},
	{
		id: 7,
		title: 'Microsoft представляет новую версию Windows с ИИ-ассистентом',
		description:
			'Windows 12 получит встроенного ИИ-помощника, способного автоматизировать рутинные задачи и анализировать данные.',
		createdTime: '2 дня назад',
		rating: 4,
		keywords: [
			{ text: 'софт', icon: '💻', color: 'green' },
			{ text: 'искусственный интеллект', color: 'gray' },
		],
		symbols: [
			{
				symbol: 'MSFT',
				currentPrice: '375.60',
				absoluteChange: '3.4',
				changePrice: '12.30',
				volume: '18.9M',
				float: '7.45B',
				dayRange: '378.25',
			},
		],
	},
	{
		id: 8,
		title: 'NVIDIA анонсировала новые видеокарты для геймеров',
		description:
			'Линейка GeForce RTX 5000 обещает удвоенную производительность в играх благодаря архитектуре на основе ИИ-ускорения.',
		createdTime: '2 дня назад',
		rating: 3,
		keywords: [
			{ text: 'игры', icon: '🎮', color: 'gray' },
			{ text: 'железо', color: 'green' },
		],
		symbols: [
			{
				symbol: 'NVDA',
				currentPrice: '495.25',
				absoluteChange: '6.1',
				changePrice: '28.45',
				volume: '35.2M',
				float: '2.48B',
				dayRange: '498.80',
			},
		],
	},
	{
		id: 9,
		title: 'SpaceX успешно запустила новую партию спутников Starlink',
		description:
			'Ракета Falcon 9 вывела на орбиту 60 новых спутников, расширяя покрытие интернета Starlink в Африке и Южной Америке.',
		createdTime: '3 дня назад',
		rating: 4,
		keywords: [
			{ text: 'космос', icon: '🚀', color: 'red' },
			{ text: 'инновации', color: 'pink' },
		],
		symbols: [
			{
				symbol: 'SPACE',
				currentPrice: '85.40',
				absoluteChange: '8.5',
				changePrice: '6.70',
				volume: '5.8M',
				float: '120.5M',
				dayRange: '86.75',
			},
		],
	},
	{
		id: 10,
		title: 'Meta инвестирует $10 млрд в развитие метавселенной',
		description:
			'Mark Zuckerberg объявил о новых вложениях в VR-шлемы и платформу Horizon Worlds, несмотря на падение доходов Meta.',
		createdTime: '3 дня назад',
		rating: 2,
		keywords: [
			{ text: 'VR/AR', icon: '👓', color: 'red' },
			{ text: 'метавселенная', color: 'green' },
		],
		symbols: [
			{
				symbol: 'META',
				currentPrice: '320.15',
				absoluteChange: '-2.3',
				changePrice: '-7.55',
				volume: '22.1M',
				float: '2.65B',
				dayRange: '324.80',
			},
		],
	},
];
