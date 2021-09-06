import React, { FunctionComponent } from 'react';
import styles from '../../styles/styles.module.css';

export const Arrow: FunctionComponent<ArrowProps> = (props: ArrowProps) => (
	<button
		className={styles.carouselArrow}
		onClick={props.onClick}
		data-direction={props.direction}
	/>
);
export interface ArrowProps {
	onClick?: (...args: any) => any;
	direction: string;
}
