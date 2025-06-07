import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import {
  Type,
  Key,
  Ref,
  Props,
  ElementType,
  ReactElementType
} from "shared/ReactTypes";

/**
 * 创建一个 React 元素对象
 * @param type 元素类型（HTML 标签、组件类名或函数组件）
 * @param key 列表元素唯一标识（用于优化 Diff 算法）
 * @param ref 引用子元素（用于直接访问 DOM 或组件实例）
 * @param props 属性对象（包含子元素 children 和其他属性）
 * @returns React 元素实例
 */
const ReactElement = (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: "war3_th000"
  };

  return element;
};

/**
 * 创建一个 React 虚拟 DOM 元素
 * @param type 元素类型（HTML 标签名、组件类名或函数组件）
 * @param config 属性对象，包含 key、ref 和其他属性
 * @param maybeChildren 任意数量的子元素（支持单个或多个参数）
 */
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === "key") {
      if (val !== undefined) {
        key = String(val);
      }
      continue;
    }
    if (prop === "ref") {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    // 确保只处理 config 自身的属性，排除原型链污染。
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === "key") {
      if (val !== undefined) {
        key = String(val);
      }
      continue;
    }
    if (prop === "ref") {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    // 确保只处理 config 自身的属性，排除原型链污染。
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  return ReactElement(type, key, ref, props);
};
