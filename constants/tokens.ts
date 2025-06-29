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
			dark: appColors.gray['800'],
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

	button: {
		primaryBg: appColors.brand['500'],
		primaryBgHover: appColors.brand['700'],
		primaryFg: appColors.base.white,
		primaryFgHover: appColors.base.white,
	},

	component: {
		logoPrimary: appColors.brand['600'],
		logoSecondary: appColors.brand['400'],
		shadowSoft: '#0D121C0C',
		buttons: {
			secondaryGray: {
				bg: {
					light: appColors.gray['50'],
					dark: appColors.gray['700'],
				},
				bgHover: appColors.gray['100'],
				fg: {
					light: appColors.gray['700'],
					dark: appColors.gray['300'],
				},
				fgHover: appColors.gray['800'],
			},
			tertiaryGray: {
				bg: appColors.base.transparent,
				bgHover: appColors.gray['100'],
				fg: {
					light: appColors.gray['700'],
					dark: appColors.gray['300'],
				},
				fgHover: appColors.gray['800'],
			},
			link: {
				fg: {
					light: appColors.brand['500'],
					dark: appColors.brand['400'],
				},
			},
			linkGray: {
				bg: appColors.base.transparent,
				fg: {
					light: appColors.gray['700'],
					dark: appColors.gray['300'],
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
} as const;
