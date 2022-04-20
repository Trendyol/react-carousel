import React, { FC } from 'react';
import { SlideDirection } from '../../types/carousel';
import { itemClickProvider } from '../../styles/itemPlaceholder/styles.module.css';

const ANIMATION_DURATION = 750; // ms

export type PlaceHolderProps = {
	current: number;
	index: number;
	slideToDirection: (direction: SlideDirection, target?: number) => void;
	itemsRef?: React.MutableRefObject<any>;
};

export const PlaceHolder: FC<PlaceHolderProps> = ({
	index,
	current,
	slideToDirection,
	itemsRef,
}) => {
	const onClick = () => {
		if (index !== current) {
			slideToDirection(
				index > current ? SlideDirection.Right : SlideDirection.Left,
			);
			setTimeout(() => {
				if (itemsRef && itemsRef.current) {
					itemsRef.current[index].firstChild.click();
				}
			}, ANIMATION_DURATION);
		}
	};
	return (
		<div className={itemClickProvider} onClick={onClick} data-testid="placeholder" />
	);
};
