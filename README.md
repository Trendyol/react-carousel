# React Carousel

Please visit to [docs website](https://trendyol.github.io/react-carousel/docs/installation) to more details.

# Installation

```
npm i react react-dom @trendyol/react-carousel --save
```

# Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from '@trendyol/react-carousel';
import { Item } from './yourItem';

ReactDOM.render(
	<Carousel>
		<Item />
		<Item />
		<Item />
		<Item />
	</Carousel>,
	document.getElementById('root'),
);
```
