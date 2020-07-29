import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import replace from '@rollup/plugin-replace';

module.exports = [
  ...getSingleComponentConfigurations(),
  {
    input: ["src/BIMDataComponents/index.js"],
    output: {
      dir: "dist/js/BIMDataComponents",
      format: "es",
    },
    plugins: [
      copy({
        targets: [
          { src: "src/assets/fonts", dest: "dist" },
          { src: "src/assets/scss", dest: "dist" },
          {
            src: "src/assets/scss/_BIMDataFonts.scss",
            dest:"dist/scss",
            transform: (contents) => contents.toString().replace(/~@\/assets/g, "node_modules/@bimdata/design-system/dist")
          }
        ],
      }),
      vue({
        template: { isProduction: true },
        css: false,
      }),
      css({
        output: "dist/css/design-system.css",
      }),
      terser(),
    ],
  },
];

function getSingleComponentConfigurations() {
  const componentNames = [
    "BIMDataBigSpinner",
    "BIMDataButton",
    "BIMDataCard",
    "BIMDataCheckbox",
    "BIMDataIcons",
    "BIMDataInput",
    "BIMDataLoading",
    "BIMDataNavigation",
    "BIMDataPaginatedList",
    "BIMDataRadio",
    "BIMDataSearch",
    "BIMDataSelect",
    "BIMDataTable",
    "BIMDataTextarea",
    "BIMDataTooltip",
  ];

  return componentNames.map(componentName => ({
    input: [`src/BIMDataComponents/${componentName}/${componentName}.js`],
    output: {
      file: `dist/js/BIMDataComponents/${componentName}.js`,
      format: "es",
    },
    plugins: [
      replace({
        "~@/assets": 'node_modules/@bimdata/design-system/dist',
        delimiters: ['', '']
      }),
      vue({
        template: { isProduction: true },
      }),
      terser(),
    ],
  }));
}
