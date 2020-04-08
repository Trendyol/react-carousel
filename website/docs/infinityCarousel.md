---
id: infinity
title: Infinite Carousel
---

Carousel is infinite at default

import {Carousel} from '@trendyol-js/react-carousel';
export const Highlight = ({children, color}) => ( <span style={{
  backgroundColor: color,
  borderRadius: '2px',
  color: '#fff',
  padding: '90px 0',
  display: 'block',
  height: '200px',
  margin: '16px 16px 16px 0',
}}> {children} </span> );

<Carousel className={'exampleCarousel1'} show={3.5} slide={2} transition={0.5}>
<Highlight color="#f27a1a">We love Trendyol orange</Highlight>
<a target="_blank" href="https://github.com/trendyol/"><Highlight color="#d53f8c">This is our github</Highlight></a>
<Highlight color="#16be48">We love Trendyol green</Highlight>
<a target="_blank" href="https://trendyol.com/"><Highlight color="#3f51b5">This is our website</Highlight></a>
</Carousel>

```jsx
<Carousel show={3.5} slide={2} transition={0.5}>
	<Highlight color="#f27a1a">We love Trendyol orange</Highlight>
	<Highlight color="#d53f8c">This is our github</Highlight>
	<Highlight color="#16be48">We love Trendyol green</Highlight>
	<Highlight color="#3f51b5">This is our website</Highlight>
</Carousel>
```
