import React from 'react';
import { Item } from '../../types/carousel';
import styles from '../../styles/navigation/styles.module.css';

export const Navigation: React.FC<NavigationProps> = ({
	items,
	current,
	onClick,
	factory,
}) => {
	return (
		<div className={styles.carouselNavigation}>
			{items.map((_: any, i: number) => (
				<div onClick={() => onClick(i)} key={i}>
					{factory(current === i)}
				</div>
			))}
		</div>
	);
};

export interface NavigationProps {
	items: Item[];
	current: number;
	factory: (selected: boolean) => React.ReactElement;
	onClick: (i: number) => void;
}
