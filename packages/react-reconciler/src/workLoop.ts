import { FiberNode } from "./fiber";
import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";

// 指向当前正在处理的 Fiber 节点。
let workInProgress: FiberNode | null = null;

export const renderRoot = (root: FiberNode) => {
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
 * @param fiber
 */
const prepareFreshStack = (fiber: FiberNode) => {
  workInProgress = fiber;
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
  // 获取下一个工作节点。
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
    // 执行完成阶段逻辑
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
