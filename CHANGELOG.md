-   # [Carousel] triggerClickOn prop
    Triggers onClick handlers of carousel items if swipe amount smaller than `triggerClickOn`.

```jsx
<Carousel triggerClickOn={5} />
```

-   # [Carousel] Navigation Thumbnail Feature
    Enables item to item navigation.

```jsx
<Carousel navigation={(isSelected) => <MyNavigationThumbnail selected={isSelected}>} />
```

-   # [Carousel] Auto Swipe Feature
    You can pass number of milliseconds to enable auto swiping.

```jsx
<Carousel autoSwipe={3000} />
```

-   # Github Actions integrated.

    ![Release](https://github.com/trendyol/react-carousel/actions/workflows/publish.yml/badge.svg)

-   # Custom Arrows option added for both `Scrolling Carousel` and `Carousel`

```jsx
<Carousel leftArrow={<CustomArrow />} rightArrow={<CustomArrow />} />
```

-   # Pagination feature added.

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
