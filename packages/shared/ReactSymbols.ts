/*
 * 检测宿主环境是否支持 Symbol 类型
 * typeof Symbol === "function"：检查当前运行环境是否支持 Symbol 构造函数（ES6+ 特性）。
 * Symbol.for：检查是否支持全局注册的 Symbol（通过 Symbol.for(key) 创建的 Symbol）。
 */
const supportSymbol = typeof Symbol === "function" && Symbol.for;

/*
 * 标识 React 元素的唯一类型：
 * 在 React 中，虚拟 DOM 元素（如通过 React.createElement() 创建的对象）会包含一个 $$typeof 属性，其值为 REACT_ELEMENT_TYPE。
 * 这个属性用于：
 * 安全校验：防止其他库或恶意代码伪造 React 元素。
 * 类型区分：确保 React 只处理自身创建的元素对象。
 */
export const REACT_ELEMENT_TYPE = supportSymbol
  ? Symbol.for("react.element")
  : 0xeac7;
