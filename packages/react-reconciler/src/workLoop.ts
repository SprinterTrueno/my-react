import { createWorkInProgress, FiberNode, FiberRootNode } from "./fiber";
import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { HostRoot } from "./workTags";

// 指向当前正在处理的 Fiber 节点。
let workInProgress: FiberNode | null = null;

/**
 * 从任意 Fiber 节点触发更新，最终调用 renderRoot 启动渲染流程。
 * @param fiber
 */
export const scheduleUpdateOnFiber = (fiber: FiberNode) => {
  const root = markUpdateFromFiberToRoot(fiber);
  renderRoot(root);
};

/**
 * 从任意 Fiber 节点向上回溯，找到根 Fiber 节点。
 * @param fiber
 */
const markUpdateFromFiberToRoot = (fiber: FiberNode) => {
  let node = fiber;
  let parent = node.return;

  while (parent !== null) {
    node = parent;
    parent = node.return;
  }

  if (node.tag === HostRoot) {
    return node.stateNode;
  }

  return null;
};

/**
 * 从根节点开始协调流程，构建或更新 Fiber 树并最终提交到 DOM。
 * @param root
 */
const renderRoot = (root: FiberRootNode) => {
  prepareFreshStack(root);

  do {
    try {
      workLoop();
      break;
    } catch (e) {
      console.log(e);
    }
  } while (true);
};

/**
 * 初始化工作栈，将根节点设为当前工作节点。
 * @param root
 */
const prepareFreshStack = (root: FiberRootNode) => {
  workInProgress = createWorkInProgress(root.current, {});
};

/**
 * 工作循环，持续处理 workInProgress 指向的节点，直到所有节点完成。
 */
const workLoop = () => {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
};

/**
 * 处理当前工作节点，并更新 workInProgress 指向下一个工作节点。
 * @param fiber
 */
const performUnitOfWork = (fiber: FiberNode) => {
  // TODO 获取下一个工作节点。
  const next = beginWork(fiber);
  // 更新当前工作节点。
  fiber.memoizedProps = fiber.pendingProps;

  if (next === null) {
    // 没有下一个工作节点，完成当前工作节点。
    completeUnitOfWork(fiber);
  } else {
    // 有下一个工作节点，更新 workInProgress 指向下一个工作节点。
    workInProgress = next;
  }
};

/**
 * 完成工作单元
 * @param fiber
 */
const completeUnitOfWork = (fiber: FiberNode) => {
  let node: FiberNode | null = fiber;

  do {
    // TODO 执行完成阶段逻辑
    completeWork(fiber);
    // 检查是否有兄弟节点。
    const sibling = fiber.sibling;

    if (sibling !== null) {
      // 有兄弟节点则继续处理兄弟节点
      workInProgress = sibling;
      return;
    }
    // 回溯到父节点。
    node = fiber.return;
    workInProgress = node;
  } while (node !== null);
};
