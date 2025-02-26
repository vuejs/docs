import { defineStore } from "pinia";

export function generateVariables() {
	return {
		font: {
			bodyFontFamily: (getComputedStyle(document.body).getPropertyValue('--bs-body-font-family')).trim(),
			bodyFontSize: (getComputedStyle(document.body).getPropertyValue('--bs-body-font-size')).trim(),
			bodyFontWeight: (getComputedStyle(document.body).getPropertyValue('--bs-body-font-weight')).trim(),
			bodyLineHeight: (getComputedStyle(document.body).getPropertyValue('--bs-body-line-height')).trim()
		},
		color: {
			theme: (getComputedStyle(document.body).getPropertyValue('--bs-theme')).trim(),
			themeRgb: (getComputedStyle(document.body).getPropertyValue('--bs-theme-rgb')).trim(),
			themeColor: (getComputedStyle(document.body).getPropertyValue('--bs-theme-color')).trim(),
			themeColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-theme-color-rgb')).trim(),
			
			default: (getComputedStyle(document.body).getPropertyValue('--bs-default')).trim(),
			defaultRgb: (getComputedStyle(document.body).getPropertyValue('--bs-default-rgb')).trim(),
			
			primary: (getComputedStyle(document.body).getPropertyValue('--bs-primary')).trim(),
			primaryRgb: (getComputedStyle(document.body).getPropertyValue('--bs-primary-rgb')).trim(),
			primaryBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-primary-bg-subtle')).trim(),
			primaryText: (getComputedStyle(document.body).getPropertyValue('--bs-primary-text')).trim(),
			primaryBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-primary-border-subtle')).trim(),
			
			secondary: (getComputedStyle(document.body).getPropertyValue('--bs-secondary')).trim(),
			secondaryRgb: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-rgb')).trim(),
			secondaryBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-bg-subtle')).trim(),
			secondaryText: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-text')).trim(),
			secondaryBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-border-subtle')).trim(),
			
			success: (getComputedStyle(document.body).getPropertyValue('--bs-success')).trim(),
			successRgb: (getComputedStyle(document.body).getPropertyValue('--bs-success-rgb')).trim(),
			successBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-success-bg-subtle')).trim(),
			successText: (getComputedStyle(document.body).getPropertyValue('--bs-success-text')).trim(),
			successBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-success-border-subtle')).trim(),
			
			warning: (getComputedStyle(document.body).getPropertyValue('--bs-warning')).trim(),
			warningRgb: (getComputedStyle(document.body).getPropertyValue('--bs-warning-rgb')).trim(),
			warningBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-warning-bg-subtle')).trim(),
			warningText: (getComputedStyle(document.body).getPropertyValue('--bs-warning-text')).trim(),
			warningBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-warning-border-subtle')).trim(),
			
			info: (getComputedStyle(document.body).getPropertyValue('--bs-info')).trim(),
			infoRgb: (getComputedStyle(document.body).getPropertyValue('--bs-info-rgb')).trim(),
			infoBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-info-bg-subtle')).trim(),
			infoText: (getComputedStyle(document.body).getPropertyValue('--bs-info-text')).trim(),
			infoBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-info-border-subtle')).trim(),
			
			danger: (getComputedStyle(document.body).getPropertyValue('--bs-danger')).trim(),
			dangerRgb: (getComputedStyle(document.body).getPropertyValue('--bs-danger-rgb')).trim(),
			dangerBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-danger-bg-subtle')).trim(),
			dangerText: (getComputedStyle(document.body).getPropertyValue('--bs-danger-text')).trim(),
			dangerBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-danger-border-subtle')).trim(),
			
			light: (getComputedStyle(document.body).getPropertyValue('--bs-light')).trim(),
			lightRgb: (getComputedStyle(document.body).getPropertyValue('--bs-light-rgb')).trim(),
			lightBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-light-bg-subtle')).trim(),
			lightText: (getComputedStyle(document.body).getPropertyValue('--bs-light-text')).trim(),
			lightBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-light-border-subtle')).trim(),
			
			dark: (getComputedStyle(document.body).getPropertyValue('--bs-dark')).trim(),
			darkRgb: (getComputedStyle(document.body).getPropertyValue('--bs-dark-rgb')).trim(),
			darkBgSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-dark-bg-subtle')).trim(),
			darkText: (getComputedStyle(document.body).getPropertyValue('--bs-dark-text')).trim(),
			darkBorderSubtle: (getComputedStyle(document.body).getPropertyValue('--bs-dark-border-subtle')).trim(),
			
			inverse: (getComputedStyle(document.body).getPropertyValue('--bs-inverse')).trim(),
			inverseRgb: (getComputedStyle(document.body).getPropertyValue('--bs-inverse-rgb')).trim(),
			
			white: (getComputedStyle(document.body).getPropertyValue('--bs-white')).trim(),
			whiteRgb: (getComputedStyle(document.body).getPropertyValue('--bs-white-rgb')).trim(),
			
			black: (getComputedStyle(document.body).getPropertyValue('--bs-black')).trim(),
			blackRgb: (getComputedStyle(document.body).getPropertyValue('--bs-black-rgb')).trim(),
			
			teal: (getComputedStyle(document.body).getPropertyValue('--bs-teal')).trim(),
			tealRgb: (getComputedStyle(document.body).getPropertyValue('--bs-teal-rgb')).trim(),
			
			indigo: (getComputedStyle(document.body).getPropertyValue('--bs-indigo')).trim(),
			indigoRgb: (getComputedStyle(document.body).getPropertyValue('--bs-indigo-rgb')).trim(),
			
			purple: (getComputedStyle(document.body).getPropertyValue('--bs-purple')).trim(),
			purpleRgb: (getComputedStyle(document.body).getPropertyValue('--bs-purple-rgb')).trim(),

			yellow: (getComputedStyle(document.body).getPropertyValue('--bs-yellow')).trim(),
			yellowRgb: (getComputedStyle(document.body).getPropertyValue('--bs-yellow-rgb')).trim(),
			
			pink: (getComputedStyle(document.body).getPropertyValue('--bs-pink')).trim(),
			pinkRgb: (getComputedStyle(document.body).getPropertyValue('--bs-pink-rgb')).trim(),
			
			cyan: (getComputedStyle(document.body).getPropertyValue('--bs-cyan')).trim(),
			cyanRgb: (getComputedStyle(document.body).getPropertyValue('--bs-cyan-rgb')).trim(),
			
			gray100: (getComputedStyle(document.body).getPropertyValue('--bs-gray-100')).trim(),
			gray200: (getComputedStyle(document.body).getPropertyValue('--bs-gray-200')).trim(),
			gray300: (getComputedStyle(document.body).getPropertyValue('--bs-gray-300')).trim(),
			gray400: (getComputedStyle(document.body).getPropertyValue('--bs-gray-400')).trim(),
			gray500: (getComputedStyle(document.body).getPropertyValue('--bs-gray-500')).trim(),
			gray600: (getComputedStyle(document.body).getPropertyValue('--bs-gray-600')).trim(),
			gray700: (getComputedStyle(document.body).getPropertyValue('--bs-gray-700')).trim(),
			gray800: (getComputedStyle(document.body).getPropertyValue('--bs-gray-800')).trim(),
			gray900: (getComputedStyle(document.body).getPropertyValue('--bs-gray-900')).trim(),
			gray100Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-100-rgb')).trim(),
			gray200Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-200-rgb')).trim(),
			gray300Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-300-rgb')).trim(),
			gray400Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-400-rgb')).trim(),
			gray500Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-500-rgb')).trim(),
			gray600Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-600-rgb')).trim(),
			gray700Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-700-rgb')).trim(),
			gray800Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-800-rgb')).trim(),
			gray900Rgb: (getComputedStyle(document.body).getPropertyValue('--bs-gray-900-rgb')).trim(),
			
			muted: (getComputedStyle(document.body).getPropertyValue('--bs-muted')).trim(),
			mutedRgb: (getComputedStyle(document.body).getPropertyValue('--bs-muted-rgb')).trim(),
			
			emphasisColor: (getComputedStyle(document.body).getPropertyValue('--bs-emphasis-color')).trim(),
			emphasisColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-emphasis-color-rgb')).trim(),
			
			bodyBg: (getComputedStyle(document.body).getPropertyValue('--bs-body-bg')).trim(),
			bodyBgRgb: (getComputedStyle(document.body).getPropertyValue('--bs-body-bg-rgb')).trim(),
			
			bodyColor: (getComputedStyle(document.body).getPropertyValue('--bs-body-color')).trim(),
			bodyColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-body-color-rgb')).trim(),
			
			headingColor: (getComputedStyle(document.body).getPropertyValue('--bs-heading-color')).trim(),
			
			secondaryColor: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-color')).trim(),
			secondaryColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-color-rgb')).trim(),
			secondaryBg: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-bg')).trim(),
			secondaryBgRgb: (getComputedStyle(document.body).getPropertyValue('--bs-secondary-bg-rgb')).trim(),
			
			tertiaryColor: (getComputedStyle(document.body).getPropertyValue('--bs-tertiary-color')).trim(),
			tertiaryColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-tertiary-color-rgb')).trim(),
			tertiaryBg: (getComputedStyle(document.body).getPropertyValue('--bs-tertiary-bg')).trim(),
			tertiaryBgRgb: (getComputedStyle(document.body).getPropertyValue('--bs-tertiary-bg-rgb')).trim(),
			
			linkColor: (getComputedStyle(document.body).getPropertyValue('--bs-link-color')).trim(),
			linkColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-link-color-rgb')).trim(),
			linkHoverColor: (getComputedStyle(document.body).getPropertyValue('--bs-link-hover-color')).trim(),
			linkHoverColorRgb: (getComputedStyle(document.body).getPropertyValue('--bs-link-hover-color-rgb')).trim(),
			
			borderColor: (getComputedStyle(document.body).getPropertyValue('--bs-border-color')).trim(),
			borderColorTranslucent: (getComputedStyle(document.body).getPropertyValue('--bs-border-color-translucent')).trim(),
		}
	};
}

export const useAppVariableStore = defineStore({
  id: "appVariable",
  state: () => {
    return generateVariables();
  }
});
