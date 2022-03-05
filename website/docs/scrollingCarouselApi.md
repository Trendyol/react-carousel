---
slug: scrolling-carousel-api
title: Scrolling Carousel
---

Scrollable carousel like google's web component `g-scrolling-carousel`

```jsx
<ScrollingCarousel />
```

### Props

| Name      |  type        | required | default |                                  descripiton |
| --------- | :----------: | -------: | ------: | -------------------------------------------: |
| children  | Node[]       |     true |      [] | Child items that will be wrapped by carousel |
| className | string       |    false |      "" |           same as react's className property |
| rightIcon | ReactElement |    false |    null |                 custom right arrow component |
| leftIcon  | ReactElement |    false |    null |                  custom left arrow component |
