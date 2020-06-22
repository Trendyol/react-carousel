import React, { FunctionComponent, useState } from 'react';

export const carouselItemNodes = (len: number) => {
	return new Array(len).fill(0).map((_, i) => {
		return <div style={{ height: 600 }}>{i + 1}</div>;
	});
};

export const dynamicCarouselItemNodes = () => {
	const Component: FunctionComponent<DynamicCarouselItemNodesProps> = ({
		id,
	}: DynamicCarouselItemNodesProps) => {
		const [state, setstate] = useState(0);
		return (
			<button key={id} onClick={() => setstate(state + 1)}>
				{state}
			</button>
		);
	};

	return [
		<Component id={1} />,
		<Component id={2} />,
		<Component id={3} />,
		<Component id={4} />,
	];
};

interface DynamicCarouselItemNodesProps {
	id: number;
	children?: React.ReactNode;
}

export const reactNodes = (prop: string, len: number) => {
	return new Array(len).fill(0).map((_, i) => {
		return {
			key: i,
			props: `${prop}-i`,
		};
	});
};
