import path from "path";
import generatePackageJson from "rollup-plugin-generate-package-json";
import {
  resolvePackagePath,
  getPackageJson,
  getBaseRollupPlugins
} from "./utils.js";

const { name, module } = getPackageJson("react");
const packagePath = resolvePackagePath(name, false);
const distPath = resolvePackagePath(name, true);

export default [
  // react
  {
    input: path.join(packagePath, module),
    output: {
      file: path.join(distPath, "index.js"),
      name: "index.js",
      format: "umd"
    },
    plugins: [
      ...getBaseRollupPlugins({}),
      generatePackageJson({
        inputFolder: packagePath,
        outputFolder: distPath,
        baseContents: ({ name, version, description }) => {
          return { name, version, description, main: "index.js" };
        }
      })
    ]
  },
  // jsx-runtime
  {
    input: path.join(packagePath, "src", "jsx.ts"),
    output: [
      // jsx-runtime
      {
        file: path.join(distPath, "jsx-runtime.js"),
        name: "jsx-runtime.js",
        format: "umd"
      },
      // jsx-dev-runtime
      {
        file: path.join(distPath, "jsx-dev-runtime.js"),
        name: "jsx-dev-runtime.js",
        format: "umd"
      }
    ],
    plugins: getBaseRollupPlugins({})
  }
];
