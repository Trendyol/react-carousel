import React from 'react';

export const carouselItemNodes = (len: number) => {
	return new Array(len).fill(0).map((_, i) => {
		return <div style={{ height: 600 }}>{i + 1}</div>;
	});
};
