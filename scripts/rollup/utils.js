import path from "path";
import fs from "fs";
import cjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";

const packagePath = path.resolve(__dirname, "../../packages");
const distPath = path.resolve(__dirname, "../../dist/node_modules");

export const resolvePackagePath = (packageName, isDist) => {
  if (isDist) {
    return path.join(distPath, packageName);
  }

  return path.join(packagePath, packageName);
};

export const getPackageJson = (packageName) => {
  const path = `${resolvePackagePath(packageName, false)}/package.json`;
  const jsonString = fs.readFileSync(path, { encoding: "utf-8" });

  return JSON.parse(jsonString);
};

export const getBaseRollupPlugins = ({ typescript = {} }) => {
  return [cjs(), ts(typescript)];
};
