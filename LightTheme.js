// Define your light theme
const lightTheme = {
    container: {
        center: true,
        padding: '2rem',
        screens: {
            '2xl': '1400px',
        },
    },
    extend: {
        colors: {
            'primary-500': '#877EFF',
            'primary-600': '#5D5FEF',
            'secondary-500': '#FFB620',
            'off-white': '#D0DFFF',
            red: '#FF5A5A',
            'dark-1': '#FFFFFF', // Change dark colors to light
            'dark-2': '#EFEFEF',
            'dark-3': '#7878A3',
            'dark-4': '#5C5C7B',
            'light-1': '#000000', // Change light colors to dark
            'light-2': '#09090A',
            'light-3': '#101012',
            'light-4': '#1F1F22',
        },
    },
}

// Export the light theme
module.exports = {
    lightTheme,
}
