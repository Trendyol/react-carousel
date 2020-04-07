---
id: usage
title: Usage
---

Simple carousel that show one item per slide.

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
