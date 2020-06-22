---
id: carousel
title: Carousel
---

Creates carousel component.

```jsx
<Carousel />
```

### Props

| Name         |  type   | required | default |                                                                                     descripiton |
| ------------ | :-----: | -------: | ------: | ----------------------------------------------------------------------------------------------: |
| children     | Node[]  |     true |      [] |                                                    Child items that will be wrapped by carousel |
| show         | number  |    false |       1 |                                                            number of items to show at per slide |
| slide        | number  |    false |       1 |                                                               number of how many items to slide |
| infinite     | boolean |    false |    true |                                                                              scrolling infinity |
| transition   | number  |    false |     0.5 |                                                  same as css transition property's second value |
| swiping      | boolean |    false |   false |                                                 enable swiping/dragging with mouse/touch events |
| swipeOn      | number  |    false |       1 |                               percantage of item width that slides when user drag count exceeds |
| responsive   | boolean |    false |   false |               enables the feature that adjusts items width according to screen size dynamically |
| className    | string  |    false |      "" |                                                              same as react's className property |
| useArrowKeys | boolean |    false |   false |                                                           enables sliding when press arrow keys |
| a11y         |  Array  |    false |      {} |                                                                        accessibility attributes |
| dynamic      | Boolean |    false |   false | if items are stateful, specify this option as true. Also give unique key to each item (like id) |
