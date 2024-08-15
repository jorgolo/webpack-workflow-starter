const cssnanoOptions = {
  preset: [
    'default',
    {
      calc: false,
    },
  ],
};

module.exports = ({ env }) => ({
  plugins: {
    'postcss-functions': {
      functions: {
        formula(minValue, maxValue, minViewportWidth, maxViewportWidth) {
          // Modo de uso: formula(10, 20, 1024, 1440)
          const calc = `calc(${minValue}px + (${maxValue} - ${minValue}) * ((100vw - ${minViewportWidth}px) / ${(maxViewportWidth - minViewportWidth)}))`;

          return calc;
        },
        responsive(minValue, maxValue, minViewportWidth = 1024, maxViewportWidth = 1440, returnNegativeValues = false, reverse = false) {
          // Modo de uso: responsive(10, 20, 1024, 1440)
          let clamp = `clamp( ${minValue}px, calc( ${minValue}px + (${maxValue} - ${minValue}) * ( (100vw - ${minViewportWidth}px) / (${maxViewportWidth} - ${minViewportWidth}) ) ), ${maxValue}px )`;

          if (reverse) {
            clamp = `clamp( ${minValue}px, calc( ${maxValue}px + (${minValue} - ${maxValue}) * ( (100vw - ${minViewportWidth}px) / (${maxViewportWidth} - ${minViewportWidth}) ) ), ${maxValue}px )`;
          }

          if (returnNegativeValues) {
            return `calc(${clamp} * -1)`;
          }

          // return clamp;
          return clamp;
        },
      },
    },
    'postcss-import': {},
    'postcss-preset-env': {
      autoprefixer: false,
      stage: 1
    },
    'postcss-extend-rule': {
      name: 'extend'
    },
    'postcss-nesting': {},
    'postcss-strip-units': {},
    ...(env === 'production' ? cssnanoOptions : {})
  }
});
