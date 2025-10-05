import { appColors } from './colors';

export const appTokens = {
	text: {
		primary: {
			light: appColors.gray['900'],
			dark: appColors.gray['50'],
		},
		primaryOnBrand: {
			light: appColors.base.white,
			dark: appColors.gray['50'],
		},
		secondary: {
			light: appColors.gray['700'],
			dark: appColors.gray['200'],
		},
		secondaryHover: {
			light: appColors.gray['800'],
			dark: appColors.gray['100'],
		},
		secondaryOnBrand: {
			light: appColors.brand['200'],
			dark: appColors.brand['300'],
		},
		tertiary: {
			light: appColors.gray['600'],
			dark: appColors.gray['300'],
		},
		tertiaryHover: {
			light: appColors.gray['700'],
			dark: appColors.gray['200'],
		},
		tertiaryOnBrand: {
			light: appColors.brand['200'],
			dark: appColors.gray['400'],
		},
		quaternary: {
			light: appColors.gray['400'],
			dark: appColors.gray['400'],
		},
		quaternaryOnBrand: {
			light: appColors.brand['300'],
			dark: appColors.gray['500'],
		},
		white: {
			light: appColors.base.white,
			dark: appColors.gray['900'],
		},
		disabled: {
			light: appColors.gray['500'],
			dark: appColors.gray['400'],
		},
		placeholder: {
			light: appColors.gray['400'],
			dark: appColors.gray['500'],
		},
		placeholderSubtle: {
			light: appColors.gray['300'],
			dark: appColors.gray['600'],
		},
		brandPrimary: {
			light: appColors.brand['700'],
			dark: appColors.gray['50'],
		},
		brandSecondary: {
			light: appColors.brand['600'],
			dark: appColors.gray['100'],
		},
		brandTertiary: {
			light: appColors.brand['500'],
			dark: appColors.gray['300'],
		},
		errorPrimary: {
			light: appColors.error['600'],
			dark: appColors.error['400'],
		},
		warningPrimary: {
			light: appColors.warning['600'],
			dark: appColors.warning['400'],
		},
		successPrimary: {
			light: appColors.success['600'],
			dark: appColors.success['400'],
		},
	},

	border: {
		primary: {
			light: appColors.gray['300'],
			dark: appColors.gray['600'],
		},

		secondary: {
			light: appColors.gray['200'],
			dark: appColors.gray['700'],
		},

		tertiary: {
			light: appColors.gray['100'],
			dark: appColors.gray['700'],
		},

		disabled: {
			light: appColors.gray['300'],
			dark: appColors.gray['700'],
		},

		disabledSubtle: {
			light: appColors.gray['200'],
			dark: appColors.gray['800'],
		},

		brand: {
			light: appColors.brand['400'],
			dark: appColors.brand['600'],
		},

		brandSubtle: {
			light: appColors.brand['200'],
			dark: appColors.brand['800'],
		},

		error: {
			light: appColors.error['500'],
			dark: appColors.error['400'],
		},

		errorSubtle: {
			light: appColors.error['300'],
			dark: appColors.error['400'],
		},

		alt: {
			light: appColors.base.white,
			dark: appColors.gray['700'],
		},
	},

	background: {
		primary: {
			light: appColors.base.white,
			dark: appColors.gray['900'],
		},
		primaryHover: {
			light: appColors.gray['50'],
			dark: appColors.gray['800'],
		},
		primarySolid: {
			light: appColors.gray['950'],
			dark: appColors.base.white,
		},
		secondary: {
			light: appColors.gray['50'],
			dark: appColors.gray['800'],
		},
		secondaryHover: {
			light: appColors.gray['100'],
			dark: appColors.gray['900'],
		},
		secondarySubtle: {
			light: appColors.gray['25'],
			dark: appColors.gray['950'],
		},
		secondarySolid: {
			light: appColors.gray['600'],
			dark: appColors.gray['400'],
		},
		tertiary: {
			light: appColors.gray['100'],
			dark: appColors.gray['700'],
		},
		quaternary: {
			light: appColors.gray['200'],
			dark: appColors.gray['700'],
		},
		active: {
			light: appColors.gray['50'],
			dark: appColors.gray['800'],
		},
		disabled: {
			light: appColors.gray['100'],
			dark: appColors.gray['900'],
		},
		disabledSubtle: {
			light: appColors.gray['50'],
			dark: appColors.gray['900'],
		},
		overlay: {
			light: appColors.gray['950'],
			dark: appColors.gray['950'],
		},
		brandPrimary: {
			light: appColors.brand['50'],
			dark: appColors.brand['950'],
		},
		brandSecondary: {
			light: appColors.brand['100'],
			dark: appColors.brand['600'],
		},
		brandSolid: {
			light: appColors.brand['600'],
			dark: appColors.brand['600'],
		},
		brandSolidHover: {
			light: appColors.brand['700'],
			dark: appColors.brand['500'],
		},
		brandSection: {
			light: appColors.brand['800'],
			dark: appColors.brand['800'],
		},
		brandSectionSubtle: {
			light: appColors.brand['700'],
			dark: appColors.brand['950'],
		},
		errorPrimary: {
			light: appColors.error['50'],
			dark: appColors.error['900'],
		},
		errorSecondary: {
			light: appColors.error['100'],
			dark: appColors.error['600'],
		},
		errorSolid: {
			light: appColors.error['600'],
			dark: appColors.error['600'],
		},
		warningPrimary: {
			light: appColors.warning['50'],
			dark: appColors.warning['900'],
		},
		warningSecondary: {
			light: appColors.warning['100'],
			dark: appColors.warning['600'],
		},
		warningSolid: {
			light: appColors.warning['600'],
			dark: appColors.warning['600'],
		},
		successPrimary: {
			light: appColors.success['100'],
			dark: appColors.success['900'],
		},
		successSecondary: {
			light: appColors.success['200'],
			dark: appColors.success['600'],
		},
		successSolid: {
			light: appColors.success['600'],
			dark: appColors.success['600'],
		},
	},

	foreground: {
		primary: {
			light: appColors.gray['900'],
			dark: appColors.base.white,
		},
		secondary: {
			light: appColors.gray['700'],
			dark: appColors.gray['300'],
		},
		secondaryHover: {
			light: appColors.gray['800'],
			dark: appColors.gray['200'],
		},
		tertiary: {
			light: appColors.gray['600'],
			dark: appColors.gray['400'],
		},
		tertiaryHover: {
			light: appColors.gray['700'],
			dark: appColors.gray['300'],
		},
		quaternary: {
			light: appColors.gray['400'],
			dark: appColors.gray['500'],
		},
		quaternaryHover: {
			light: appColors.gray['600'],
			dark: appColors.gray['400'],
		},
		quinary: {
			light: appColors.gray['400'],
			dark: appColors.gray['500'],
		},
		quinaryHover: {
			light: appColors.gray['500'],
			dark: appColors.gray['500'],
		},
		senary: {
			light: appColors.gray['300'],
			dark: appColors.gray['600'],
		},
		white: {
			light: appColors.base.white,
			dark: appColors.base.white,
		},
		disabled: {
			light: appColors.gray['400'],
			dark: appColors.gray['500'],
		},
		disabledSubtle: {
			light: appColors.gray['300'],
			dark: appColors.gray['600'],
		},
		brandPrimary: {
			light: appColors.brand['500'],
			dark: appColors.brand['500'],
		},
		brandSecondary: {
			light: appColors.brand['400'],
			dark: appColors.brand['600'],
		},
		errorPrimary: {
			light: appColors.error['600'],
			dark: appColors.error['500'],
		},
		errorSecondary: {
			light: appColors.error['500'],
			dark: appColors.error['500'],
		},
		warningPrimary: {
			light: appColors.warning['500'],
			dark: appColors.warning['500'],
		},
		warningSecondary: {
			light: appColors.warning['500'],
			dark: appColors.warning['400'],
		},
		successPrimary: {
			light: appColors.success['600'],
			dark: appColors.success['500'],
		},
		successSecondary: {
			light: appColors.success['500'],
			dark: appColors.success['400'],
		},
	},

	component: {
		logoPrimary: appColors.brand['600'],
		logoSecondary: appColors.brand['400'],
		shadowSoft: '#0D121C0C',
		buttons: {
			primary: {
				fg: {
					light: appColors.base.white,
					dark: appColors.base.white,
				},
			},
			secondaryGray: {
				bg: {
					light: appColors.gray['50'],
					dark: appColors.gray['700'],
				},
				fg: {
					light: appColors.gray['700'],
					dark: appColors.gray['300'],
				},
			},
			tertiaryGray: {
				bg: appColors.base.transparent,
				fg: {
					light: appColors.gray['700'],
					dark: appColors.gray['300'],
				},
			},
			link: {
				fg: {
					light: appColors.brand['500'],
					dark: appColors.brand['400'],
				},
			},
			linkGray: {
				bg: {
					light: appColors.base.transparent,
					dark: appColors.base.transparent,
				},
				fg: {
					light: appColors.gray['400'],
					dark: appColors.gray['500'],
				},
			},
			linkTertiary: {
				bg: appColors.base.transparent,
				fg: appColors.brand['500'],
			},
			destructive: {
				bg: appColors.error['500'],
				bgHover: appColors.error['600'],
				fg: appColors.base.white,
				fgHover: appColors.base.white,
			},
		},
	},

	alpha: {
		white: {
			10: '#FFFFFF19',
			20: '#FFFFFF33',
			30: '#FFFFFF4C',
			40: '#FFFFFF66',
			50: '#FFFFFF7F',
			60: '#FFFFFF99',
			70: '#FFFFFFB2',
			80: '#FFFFFFCC',
			90: '#FFFFFFE5',
		},
		black: {
			10: '#0D121C19',
			20: '#0D121C33',
			30: '#0D121C4C',
			40: '#0D121C66',
			50: '#0D121C7F',
			60: '#0D121C99',
			70: '#0D121CB2',
			80: '#0D121CCC',
			90: '#0D121CE5',
		},
	},

	utilityGray: {
		25: {
			light: appColors.gray['25'],
			dark: appColors.gray['900'],
		},
		50: {
			light: appColors.gray['50'],
			dark: appColors.gray['800'],
		},
		100: {
			light: appColors.gray['100'],
			dark: appColors.gray['700'],
		},
		200: {
			light: appColors.gray['200'],
			dark: appColors.gray['600'],
		},
		300: {
			light: appColors.gray['300'],
			dark: appColors.gray['500'],
		},
		400: {
			light: appColors.gray['400'],
			dark: appColors.gray['400'],
		},
		500: {
			light: appColors.gray['500'],
			dark: appColors.gray['300'],
		},
		600: {
			light: appColors.gray['600'],
			dark: appColors.gray['200'],
		},
		700: {
			light: appColors.gray['700'],
			dark: appColors.gray['100'],
		},
		800: {
			light: appColors.gray['800'],
			dark: appColors.gray['50'],
		},
		900: {
			light: appColors.gray['900'],
			dark: appColors.gray['25'],
		},
		950: {
			light: appColors.gray['950'],
			dark: appColors.gray['25'],
		},
	},

	utilityPink: {
		25: {
			light: appColors.pink['25'],
			dark: appColors.pink['950'],
		},
		50: {
			light: appColors.pink['50'],
			dark: appColors.pink['900'],
		},
		100: {
			light: appColors.pink['100'],
			dark: appColors.pink['800'],
		},
		200: {
			light: appColors.pink['200'],
			dark: appColors.pink['700'],
		},
		300: {
			light: appColors.pink['300'],
			dark: appColors.pink['600'],
		},
		400: {
			light: appColors.pink['400'],
			dark: appColors.pink['500'],
		},
		500: {
			light: appColors.pink['500'],
			dark: appColors.pink['400'],
		},
		600: {
			light: appColors.pink['600'],
			dark: appColors.pink['300'],
		},
		700: {
			light: appColors.pink['700'],
			dark: appColors.pink['200'],
		},
		800: {
			light: appColors.pink['800'],
			dark: appColors.pink['100'],
		},
		900: {
			light: appColors.pink['900'],
			dark: appColors.pink['50'],
		},
		950: {
			light: appColors.pink['950'],
			dark: appColors.pink['25'],
		},
	},

	utilityRed: {
		25: {
			light: appColors.error['25'],
			dark: appColors.error['950'],
		},
		50: {
			light: appColors.error['50'],
			dark: appColors.error['900'],
		},
		100: {
			light: appColors.error['100'],
			dark: appColors.error['800'],
		},
		200: {
			light: appColors.error['200'],
			dark: appColors.error['700'],
		},
		300: {
			light: appColors.error['300'],
			dark: appColors.error['600'],
		},
		400: {
			light: appColors.error['400'],
			dark: appColors.error['500'],
		},
		500: {
			light: appColors.error['500'],
			dark: appColors.error['400'],
		},
		600: {
			light: appColors.error['600'],
			dark: appColors.error['300'],
		},
		700: {
			light: appColors.error['700'],
			dark: appColors.error['200'],
		},
		800: {
			light: appColors.error['800'],
			dark: appColors.error['100'],
		},
		900: {
			light: appColors.error['900'],
			dark: appColors.error['50'],
		},
		950: {
			light: appColors.error['950'],
			dark: appColors.error['25'],
		},
	},

	utilityOrange: {
		25: {
			light: appColors.orange['25'],
			dark: appColors.orange['950'],
		},
		50: {
			light: appColors.orange['50'],
			dark: appColors.orange['900'],
		},
		100: {
			light: appColors.orange['100'],
			dark: appColors.orange['800'],
		},
		200: {
			light: appColors.orange['200'],
			dark: appColors.orange['700'],
		},
		300: {
			light: appColors.orange['300'],
			dark: appColors.orange['600'],
		},
		400: {
			light: appColors.orange['400'],
			dark: appColors.orange['500'],
		},
		500: {
			light: appColors.orange['500'],
			dark: appColors.orange['400'],
		},
		600: {
			light: appColors.orange['600'],
			dark: appColors.orange['300'],
		},
		700: {
			light: appColors.orange['700'],
			dark: appColors.orange['200'],
		},
		800: {
			light: appColors.orange['800'],
			dark: appColors.orange['100'],
		},
		900: {
			light: appColors.orange['900'],
			dark: appColors.orange['50'],
		},
		950: {
			light: appColors.orange['950'],
			dark: appColors.orange['25'],
		},
	},

	utilityYellow: {
		25: {
			light: appColors.yellow['25'],
			dark: appColors.yellow['950'],
		},
		50: {
			light: appColors.yellow['50'],
			dark: appColors.yellow['900'],
		},
		100: {
			light: appColors.yellow['100'],
			dark: appColors.yellow['800'],
		},
		200: {
			light: appColors.yellow['200'],
			dark: appColors.yellow['700'],
		},
		300: {
			light: appColors.yellow['300'],
			dark: appColors.yellow['600'],
		},
		400: {
			light: appColors.yellow['400'],
			dark: appColors.yellow['500'],
		},
		500: {
			light: appColors.yellow['500'],
			dark: appColors.yellow['400'],
		},
		600: {
			light: appColors.yellow['600'],
			dark: appColors.yellow['300'],
		},
		700: {
			light: appColors.yellow['700'],
			dark: appColors.yellow['100'],
		},
		800: {
			light: appColors.yellow['800'],
			dark: appColors.yellow['100'],
		},
		900: {
			light: appColors.yellow['900'],
			dark: appColors.yellow['50'],
		},
		950: {
			light: appColors.yellow['950'],
			dark: appColors.yellow['25'],
		},
	},

	utilityLime: {
		25: {
			light: appColors.lime['25'],
			dark: appColors.lime['950'],
		},
		50: {
			light: appColors.lime['50'],
			dark: appColors.lime['900'],
		},
		100: {
			light: appColors.lime['100'],
			dark: appColors.lime['800'],
		},
		200: {
			light: appColors.lime['200'],
			dark: appColors.lime['700'],
		},
		300: {
			light: appColors.lime['300'],
			dark: appColors.lime['600'],
		},
		400: {
			light: appColors.lime['400'],
			dark: appColors.lime['500'],
		},
		500: {
			light: appColors.lime['500'],
			dark: appColors.lime['400'],
		},
		600: {
			light: appColors.lime['600'],
			dark: appColors.lime['300'],
		},
		700: {
			light: appColors.lime['700'],
			dark: appColors.lime['200'],
		},
		800: {
			light: appColors.lime['800'],
			dark: appColors.lime['100'],
		},
		900: {
			light: appColors.lime['900'],
			dark: appColors.lime['50'],
		},
		950: {
			light: appColors.lime['950'],
			dark: appColors.lime['25'],
		},
	},

	utilityGreen: {
		25: {
			light: appColors.success['25'],
			dark: appColors.success['950'],
		},
		50: {
			light: appColors.success['50'],
			dark: appColors.success['900'],
		},
		100: {
			light: appColors.success['100'],
			dark: appColors.success['800'],
		},
		200: {
			light: appColors.success['200'],
			dark: appColors.success['700'],
		},
		300: {
			light: appColors.success['300'],
			dark: appColors.success['600'],
		},
		400: {
			light: appColors.success['400'],
			dark: appColors.success['500'],
		},
		500: {
			light: appColors.success['500'],
			dark: appColors.success['400'],
		},
		600: {
			light: appColors.success['600'],
			dark: appColors.success['300'],
		},
		700: {
			light: appColors.success['700'],
			dark: appColors.success['200'],
		},
		800: {
			light: appColors.success['800'],
			dark: appColors.success['100'],
		},
		900: {
			light: appColors.success['900'],
			dark: appColors.success['50'],
		},
		950: {
			light: appColors.success['950'],
			dark: appColors.success['25'],
		},
	},

	utilityBlue: {
		25: {
			light: appColors.blue['25'],
			dark: appColors.blue['950'],
		},
		50: {
			light: appColors.blue['50'],
			dark: appColors.blue['900'],
		},
		100: {
			light: appColors.blue['100'],
			dark: appColors.blue['800'],
		},
		200: {
			light: appColors.blue['200'],
			dark: appColors.blue['700'],
		},
		300: {
			light: appColors.blue['300'],
			dark: appColors.blue['600'],
		},
		400: {
			light: appColors.blue['400'],
			dark: appColors.blue['500'],
		},
		500: {
			light: appColors.blue['500'],
			dark: appColors.blue['400'],
		},
		600: {
			light: appColors.blue['600'],
			dark: appColors.blue['300'],
		},
		700: {
			light: appColors.blue['700'],
			dark: appColors.blue['200'],
		},
		800: {
			light: appColors.blue['800'],
			dark: appColors.blue['100'],
		},
		900: {
			light: appColors.blue['900'],
			dark: appColors.blue['50'],
		},
		950: {
			light: appColors.blue['950'],
			dark: appColors.blue['25'],
		},
	},

	utilityGrayBlue: {
		25: {
			light: appColors.grayBlue['25'],
			dark: appColors.grayBlue['900'],
		},
		50: {
			light: appColors.grayBlue['50'],
			dark: appColors.grayBlue['800'],
		},
		100: {
			light: appColors.grayBlue['100'],
			dark: appColors.grayBlue['700'],
		},
		200: {
			light: appColors.grayBlue['200'],
			dark: appColors.grayBlue['600'],
		},
		300: {
			light: appColors.grayBlue['300'],
			dark: appColors.grayBlue['500'],
		},
		400: {
			light: appColors.grayBlue['400'],
			dark: appColors.grayBlue['400'],
		},
		500: {
			light: appColors.grayBlue['500'],
			dark: appColors.grayBlue['300'],
		},
		600: {
			light: appColors.grayBlue['600'],
			dark: appColors.grayBlue['200'],
		},
		700: {
			light: appColors.grayBlue['700'],
			dark: appColors.grayBlue['100'],
		},
		800: {
			light: appColors.grayBlue['800'],
			dark: appColors.grayBlue['50'],
		},
		900: {
			light: appColors.grayBlue['900'],
			dark: appColors.grayBlue['25'],
		},
		950: {
			light: appColors.grayBlue['950'],
			dark: appColors.grayBlue['25'],
		},
	},

	utilityViolet: {
		25: {
			light: appColors.violet['25'],
			dark: appColors.violet['950'],
		},
		50: {
			light: appColors.violet['50'],
			dark: appColors.violet['900'],
		},
		100: {
			light: appColors.violet['100'],
			dark: appColors.violet['800'],
		},
		200: {
			light: appColors.violet['200'],
			dark: appColors.violet['700'],
		},
		300: {
			light: appColors.violet['300'],
			dark: appColors.violet['600'],
		},
		400: {
			light: appColors.violet['400'],
			dark: appColors.violet['500'],
		},
		500: {
			light: appColors.violet['500'],
			dark: appColors.violet['400'],
		},
		600: {
			light: appColors.violet['600'],
			dark: appColors.violet['300'],
		},
		700: {
			light: appColors.violet['700'],
			dark: appColors.violet['200'],
		},
		800: {
			light: appColors.violet['800'],
			dark: appColors.violet['100'],
		},
		900: {
			light: appColors.violet['900'],
			dark: appColors.violet['50'],
		},
		950: {
			light: appColors.violet['950'],
			dark: appColors.violet['25'],
		},
	},
} as const;
