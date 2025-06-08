import { Props, Key, Ref } from "shared/ReactTypes";
import { WorkTag } from "./workTags";
import { Flags, NoFlags } from "./fiberFlags";

export class FiberNode {
  // 标记节点类型（如函数组件、类组件、宿主元素等）。
  tag: WorkTag;
  // 唯一标识符，用于Diff算法优化列表渲染。
  key: Key;
  // 组件类型（如 div、MyComponent）。
  type: any;
  /* 持有真实 DOM 或组件实例，指向与该 Fiber 节点关联的底层实例。
   * 宿主组件（如 <div>）：对应真实 DOM 元素。
   * 类组件：对应组件实例（继承自 React.Component）。
   * 函数组件：通常为 null（因为函数组件不持有状态实例）。
   */
  stateNode: any;
  // 形成树状结构，指向当前节点的父节点。
  return: FiberNode | null;
  // 同一层级的兄弟节点链表，用于横向遍历。
  sibling: FiberNode | null;
  // 指向第一个子节点，形成树状结构的纵向连接。
  child: FiberNode | null;
  // 记录当前节点在其兄弟节点中的位置索引，在列表渲染中辅助 Diff 算法定位节点位置变化。
  index: number;
  // 用于访问组件实例或 DOM 元素。
  ref: Ref;
  /*
   * 当前待处理的 props。
   * 保存最新的 props 数据，用于渲染或更新。
   */
  pendingProps: Props;
  /*
   * 已处理过的 props（用于对比变化）。
   * 缓存上一次成功处理的 props，与 pendingProps 对比以决定是否需要更新。
   * 若 pendingProps === memoizedProps，可跳过渲染（浅比较优化）。
   */
  memoizedProps: Props | null;
  /* 指向当前 Fiber 节点的镜像节点（用于实现双缓冲机制）。
   * 如果当前节点是 current，则 alternate 指向 workInProgress 节点。
   * 如果当前节点是 workInProgress，则 alternate 指向 current 节点。
   */
  alternate: FiberNode | null;
  // 标记需要对当前 Fiber 节点执行的操作
  flags: Flags;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    this.type = null;
    this.stateNode = null;
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.alternate = null;
    this.flags = NoFlags;
  }
}
