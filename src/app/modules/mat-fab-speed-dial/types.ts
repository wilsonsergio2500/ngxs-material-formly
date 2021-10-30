export const Z_INDEX_ITEM = 23;
export type Direction = 'up' | 'down' | 'left' | 'right';
export type AnimationMode = 'fling' | 'scale';

export class MatFabSpeedDialActionsBase {
  show: () => void;
  hide: () => void;
}

