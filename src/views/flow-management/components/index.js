// 寻找上级类型
export function findProType(targetNodeId, nodeData) {
  let sourceNodeId = "";
  let proType = "";
  nodeData.edges.map((item) => {
    if (item.targetNodeId == targetNodeId) {
      sourceNodeId = item.sourceNodeId;
    }
  });
  nodeData.nodes.map((item) => {
    if (sourceNodeId == item.id) {
      proType = item.properties.type;
    }
  });
  return proType;
}

export function observerDomResize(dom, callback) {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });

  return observer;
}

export function debounce(delay, callback) {
  let lastTime;

  return function () {
    clearTimeout(lastTime);

    const [that, args] = [this, arguments];

    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}
