const actionList = [
  { type: 'zoomIn', action: 1 },
  { type: 'zoomOut', action: 2 },
  { type: 'rotateLeft', action: 5 },
  { type: 'rotateRight', action: 6 },
  { type: 'reset', action: 7 },
];

const nextPre = [
  { type: 'prev', action: 3 },
  { type: 'next', action: 4 },
];

const ActionType = {
    zoomIn: 1,
    zoomOut: 2,
    prev: 3,
    next: 4,
    rotateLeft: 5,
    rotateRight: 6,
    reset: 7,
    close: 8,
    scaleX: 9,
    scaleY: 10,
    download: 11,
}

export {
  actionList,
  ActionType
}
