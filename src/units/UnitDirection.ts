export type DirectionVertical = 'top' | 'bottom';
export type DirectionHorizontal = 'left' | 'right';

export type Direction = DirectionVertical | DirectionHorizontal | `${DirectionVertical}-${DirectionHorizontal}`;
