import { Container } from "hostConfig";
import { FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTags";
import {
  createUpdate,
  createUpdateQueue,
  enqueueUpdate,
  UpdateQueue
} from "./updateQueue";
import { ReactElementType } from "shared/ReactTypes";
import { scheduleUpdateOnFiber } from "./workLoop";

/**
 * 为 React 应用创建根容器，初始化 Fiber 树结构。
 * @param container
 */
export const createContainer = (container: Container) => {
  const hostRootFiber = new FiberNode(HostRoot, {}, null);
  const root = new FiberRootNode(container, hostRootFiber);
  hostRootFiber.updateQueue = createUpdateQueue();
  return root;
};

export const updateContainer = (
  element: ReactElementType | null,
  root: FiberRootNode
) => {
  const hostRootFiber = root.current;
  const update = createUpdate<ReactElementType | null>(element);
  enqueueUpdate(
    hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
    update
  );
  scheduleUpdateOnFiber(hostRootFiber);
  return element;
};
