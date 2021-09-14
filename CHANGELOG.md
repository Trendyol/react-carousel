- # Github Actions integrated.
![Release](https://github.com/trendyol/react-carousel/actions/workflows/publish.yml/badge.svg)

- # Custom Arrows option added for both `Scrolling Carousel` and `Carousel`
```jsx
<Carousel
	leftArrow={<CustomArrow/>}
	rightArrow={<CustomArrow/>}
/>
```

- # Pagination feature added.
```jsx
<Carousel
 dynamic={true}
 show={4}
 slide={3}
 swiping={true}
 paginationCallback={(direction) => /* Append new childs before each slide */)}
 pageCount={5} /* Total page count  */
>
 <Item>
</Carousel>
```

