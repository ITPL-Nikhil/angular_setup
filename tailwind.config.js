export default {
  content: [
    './src/**/*.{html,ts}', // Add all files in the src directory to be processed by Tailwind
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg-color': '#000',
        'active-button-color': '#409bf9',
        'light-bg-color': '#fefcf6',
        'orange-bg-color': '#FEF9EF',
        'dark-content-color': '#fff',
        'light-content-color': '#9b959b',
        'light-header-color': '#000',
        'light-card-header-color': '#554d56',
        'link-color': '#EBDBB8',
        'button-bg': '#22222250',
        'tg-dark-green': '#52B075',
        // 'tg-grayish-green': '#989A95',
        'tg-grayish-green': '#7F817D',
        'tg-light-yellow': '#EFF8C9',
        'tg-light-green': '#B6E383',
        'tg-black': '#030303',
        'tg-white': '#FBFFF6',
        'tg-yellow': '#F8C22C',
      },
      fontSize: {
        'placeholder-base': '16px',
        '5rem': '80px',
        '4rem': '64px',
        '.5-rem': 'clamp(.3rem, 2vw + .4rem, .5rem)',
        '1-rem': 'clamp(.5rem, 2vw + .8rem, 1rem)',
        '1.5-rem': 'clamp(1rem, 2vw + 1.7rem, 1.5rem)',
        '2-rem': 'clamp(1rem, 1.5rem, 2rem)',
        '3-rem': 'clamp(1.5rem, 2vw + 1.7rem, 3rem)',
        '4-rem': 'clamp(3rem, 2.5rem + 1vw, 4rem)',
        '5-rem': 'clamp(4rem, 2.5rem + 1vw, 5rem)',
        '6-rem': 'clamp(4.5rem, 2.5rem + 1vw, 5.5rem)',

        'header-medium': 'clamp(1.625rem, 4.68vw, 2.9375rem)', // 26px, 47px
        'header-normal': 'clamp(1.5rem, 2.8vw, 2.1875rem)', // 24px, 35px
        'header-regular': 'clamp(1.125rem, 2.87vw, 2.1875rem)', // 18px, 35px
        'header-small': 'clamp(0.8125rem, 1.6vw, 1.125rem)', // 13px, 18px

        'subheader-normal': 'clamp(0.75rem, 2.11vw, 1.0625rem)', // 12px, 17px
        'subheader-small': 'clamp(0.6875rem, 1.04vw, 0.875rem)', // 11px, 14px

        'content-text-medium': 'clamp(1rem, 2vw, 1.25rem)', // 16px, 20px
        'content-text-normal': 'clamp(0.875rem, 1.6vw, 1rem)', // 14px, 16px
        'content-text-small': 'clamp(0.6875rem, 1.6vw, 0.8125rem)', // 11px, 13px
        'content-text-very-small': 'clamp(0.5625rem, 1.07vw, 0.6875rem)', // 9px, 11px

        'highlight-text-normal': 'clamp(1.25rem, 2.87vw, 2.1875rem)', // 20px, 35px
        'highlight-text-medium': 'clamp(1.625rem, 4.68vw, 2.9375rem)', // 26px, 47px

        'button-text-normal': 'clamp(0.6875rem, 2.11vw, 0.8125rem)', // 11px, 13px
        'button-text-large': 'clamp(1rem, 3.5vw, 2.6875rem)', // 16px, 28px
      },

      lineHeight: {
        4: '80px',
        5.5: '90px',
      },
      padding: {
        horizontal: 'clamp(20px, 6.43vw, 111px)', // min 20px, max 111px
      },
      borderRadius: {
        'card-radius': '20px',
        '30px': '30px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'noto-sans': ['Noto Sans', 'sans-serif'],
      },
      boxShadow: {
        'btn-shadow': '0px 0px 6px 1px rgba(115, 155, 194, 0.20)',
        header: '0px 0px 10px 1px #FAE9C050',
        card: '0px 0px 10px 1px #FAE9C050',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      transitionProperty: {
        'btn-transition': 'all 0.2s ease-in',
        'btn-new-chat': 'all .5s cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      screens: {
        tv: '2080px',
      },
    },
  },
  plugins: [],
};
