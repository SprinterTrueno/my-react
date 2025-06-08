import { Action } from "shared/ReactTypes";

// 状态更新操作。
export interface Update<State> {
  // 更新动作。
  action: Action<State>;
}

// 管理状态更新的队列。
export interface UpdateQueue<State> {
  shared: {
    // 指向当前待处理的更新（单个 Update 或 null）。
    pending: Update<State> | null;
  };
}

// 创建一个更新对象。
export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return { action };
};

// 初始化状态更新队列。
export const createUpdateQueue = <State>() => {
  return {
    shared: {
      pending: null
    }
  } as UpdateQueue<State>;
};

// 将更新加入队列。
export const enqueueUpdate = <State>(
  updateQueue: UpdateQueue<State>,
  update: Update<State>
) => {
  updateQueue.shared.pending = update;
};

// 处理更新队列，计算最新状态。
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State>
): { memoizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState
  };

  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memoizedState = action(baseState);
    } else {
      result.memoizedState = action;
    }
  }

  return result;
};
