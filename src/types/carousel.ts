import { ReactElement } from 'react';

export enum SlideDirection {
	Right = -1,
	Left = 1,
}

export const enum ArrowKeys {
	Right = 39,
	Left = 37,
}

export type Item = ReactElement;
