import React, { useState } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';
import styles from './styles.module.css';
import { Redirect } from '@docusaurus/router';

let slideData = [
	{
		text: 'skyline',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAEBQcDAgH/xAAvEAACAQIEAwUIAwAAAAAAAAABAgMEEQAFEiETMVFBYXGBkRQjMoKxssLwBiJC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQC/8QAIREAAQQBAwUAAAAAAAAAAAAAAQACAxEEEjHwBSFBYYH/2gAMAwEAAhEDEQA/AFYz3KA0UbVjI8jBNSxEqvifHp64fSURSxNSQOw8K3nzxNeLC2oVWX00hIKkoNPnZSADftAxSsnzWlzaiHBbdAFbWu6+O+KHYWrYArAmr0s56CopYjOt5Y99TD4k77dMc+0RG2mzX5Ww5pEWJSEqKhiu22kW9RgWfK6KpqONA1TTSsukknWhNulhbpsbd2JZuly1qaEzMsbFSmanqYT76ETqP9xHS4HhyPpgzJp3o5hPHUMkc4ZCrf1J+K3zCw27LnffDhoL722xjPlUVQtm1qNWqysQL9bcjhhkPBF+CiMYoo6k/mBWniiMBZ4xpNpgS3PckW/RgOXO5plVlnqujcSoCHbbkFP1GMhlNTGvuK1UW/L2WI/jjw5ZVstjmcy90KLF9gGKDlM71fPqMRlf/9k=',
	},
	{
		text: 'r35',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAEBQYHAv/EACwQAAEDAwEFCAMBAAAAAAAAAAECAwQABRESBiExQXETIiNRYZGhsRRSwQf/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A2VaCsUG/AyCpakpSOJJwKVzNvbLGcCEOaxzUTgDpxzUhdtqjc5ZEO4PvKUT2TaYoV2Y8gAoZ64JqyJar5DlrYJbdu0BC/wBVyUA/dBybaiU2XIrzT6cZy0sK+qxiVZp866POsrdkvBRW4oN6dIHHmcdKfWa2SC2gvSWoTqDlK0vHI6ADI96uGpWfcIxltIQmdhWB4jaUg53b+4Dkdafx7ibcw0xFeVokK0vAtJBCfQjfR7+wDBV4E+U0nOcFWr7rhH+fpAwq5PHcRkoSdx9Du+KCZRdl/kx57bim21btGvuhJz3ccgBjkcnJzniSm5F86ITMh5fmngf581UW3YW1wUpS6pcjScjtDu9qesx4sROlhpCQPIUH/9k=',
	},
	{
		text: 'custom',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAGAwQHBf/EADAQAAIBAwIEBQALAQAAAAAAAAECAwQFEQAhBhITMRQiQVFhFSMyM0JEcZGhwdEH/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQIA/8QAGxEAAgMAAwAAAAAAAAAAAAAAAAECEUEDEhP/2gAMAwEAAhEDEQA/ANQt6RNU1xVdhMoGO33aH+9RXF+ndqWUo5iWlnyApKklosZAB27742Gh9tqfpS0LPLItPJ0o35ESIiM8qqcc+cAAex+CdR1dTXMI6mC6VPXkikmTp0S5yWww5S/qFGBn0/DqHyPC1BaduE2yO2LT0ppopPpJX6YAjblNT5crsfsn+NXaykJ4ioZgBhaKpXOd93g/zQl2miqqrxslS0KQRMB4bBk88bEK2dmG+2TsD231yOIuJpKbwdRSTVFPP4aKR2EhPkLHC7nYZjGRv7HT6VguKwpcNSUFZbZ6y/VCUlppWSEsFDyluXChVAyNiNwD6+2ldpb/AJzdZ6e1Ut0uck0mRCplniztnl5gqj07E7n50YquGLZV03hqaaWjgZldo4wCGdQwDEnfOGPrjtqnQ8FrbbhTVtDdwJaeVZU6lPzeZSCOzDTYdGMrlYOFrPAtc5utOVqIUhU3Au0khcAEoSRyjuc52B21mt1eOS+wz0a1G8jo/M6yGRRy/WHChRk74xjykke6Op4cFZM8lwuhfM8k6JBF0wrvyE4yzbAopAGMfptqektlrtamSlVpKo/mJn5mA+PY/P7b76E6VXZlBn//2Q==',
	},
	{
		text: 'liberty walk',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAADBAYFAv/EAC0QAAEDAgQEAwkAAAAAAAAAAAECAwQFEQASIWEGMUFREyJxFDJSYpGhwdHh/8QAGAEAAwEBAAAAAAAAAAAAAAAAAQMEAgD/xAAeEQACAQMFAAAAAAAAAAAAAAABAgAREyEDEjJBQv/aAAwDAQACEQMRAD8AsFsbYCuPtjYWztgK2tsa3QFJjqjbYmalw6uRJelPqCE2JUpOtx6bdsWrxabF3XEIHzKAwoZUFRIEyMT28VJ/OOajDMC1U4hKpxNDp8hEd91tLy+aQq+X1On72wm/WWZ1Of8AZaszDlJzJSHmiqx6EEWHbodxfEsvhSqJflyC5HdcdW6prxHFEgLI5nKToAPXlvgNN4PqzGjwp0keGEgLdeTbe4Av/TicWzyNZS13yI/Hg0hyOl6o1JIqK02eU2C4OeoClam/fp0tjmVTqDQKcHXZzknx0qUGn0hXlJ943vl25ddOeAq4RqJOZMano6+SU9f7g4TXwxXpMtblREZacqbFLxUUlObLpkHxK+uGnVToxC6D1ys//9k=',
	},
	{
		text: 'wallpaper',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAFBgMEBwIB/8QALBAAAgEDAwEGBgMAAAAAAAAAAQIDBBESAAUhMQYTIkFRcRRhkaHR8VJigf/EABYBAQEBAAAAAAAAAAAAAAAAAAIDBP/EABsRAQACAwEBAAAAAAAAAAAAAAEAAhIhQREi/9oADAMBAAIRAxEAPwDKYaeecXiiJW9siQAPPqffU7U0cSK0hkYsoZVxC34v1P0007rR10dUKXbqZJKwO6yzPGlxi1reIWt53At6aml7O7lFSyy7v8EC1sDmnN79ceOfl89aC1nsgtTkXkXb4ZFRjSqzAEu+cmIsb8A29uv+a8jr441kQU8NXGwZbgCHEnE5BV6EY8X/AJEe9+PYkWb4VKYlpLE965Kpb0A8R5/eu5uzxgpUSCCesldj4STghBtwo638uToPhbFdyoWtTMPmWV36uemDR1itFyoU1AUgeliR9tQbr2nqqs09NInfUcao5ja+OQHJNvMm/PtqzP2So5PFSVGH9XGQ/OgdbtG5wHuhTysitcGK7qT68A206p7uSCrGKg3umi7U0j1FOYacSCN42cNZHFgb+nIPtovX9swY0gSekVg8vfCFXOCC+FiSRcG/TWYypOkmMzEOoC4EG9h0FjohSbXXbg3jCwxHkkrj9vPoPpoO2LECf//Z',
	},
	{
		text: 'nismo',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAADBQYHBAL/xAAqEAABBAAFAwIHAQAAAAAAAAABAgMEEQAFEiExBhNRQZEUIjJhgaGxB//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAGER/9oADAMBAAIRAxEAPwAqYivGCJhqPpiiZyuQ6abjOna70ED3wF6FmQKmmcuX3K47qCoDzQVgEvwR8Y8mGfGFEuJ1u28SqBOCLNJbU3f6Jwy6dV1RNbpeWh1tCtJckI7WqjRpVjf70cA06R/0lnPM0cgTm2WCGi42806pSTRFg6kitjf4OCSeoe3KfVIzRiWlCCtKIqB20AXeo9w2fGw9efTDYqp0Na1sxUhS0FCqO1EUecHjzc0Ql5CkyHA+jQsuPWQnfYE3XOC5V70z1rPX1KWHgEtTUn5QskoOkqBvnbjcnnauMWzudqiUubNhM2B9bzd/0nGHIZmLcadaKmpAG60m62rbHS3lMl1ZcfecKibO+m/bER//2Q==',
	},
	{
		text: 'godzilla',
		img:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAADBgQFBwL/xAAsEAACAQIFAQcEAwAAAAAAAAABAgMEEQAFEiExYQYTIlGBkaEUMkJxI0FD/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwIB/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAECERIyQQP/2gAMAwEAAhEDEQA/AIWVUWa0njRUZOfG+xxapOgD99EI9H5wynSPQ47y7tLTTQd3UUClebhr+uM+zzNJMzrtKPppi40IrbLfi/XDN0DGLkObdpcrWoiphKZDIyLrKC3i69Bb3HWx1qqWvoqerpphoqNZjjOzFVYi9vb9XtjNAIFO+oSBiFHkdsHy+YUFbC5P8ZCozHmMFvEVA5Nr+pxmRT80MOQuI2jYWJB4OL5I6dqerf6ZHNQSZABu5t/fXCLl1RJ9IwgnhWU/aTKLj0OA1NTmUjBnmMZQaQBokv15J3xll4EpKCKhhTvLGokH+ymMRm3ALWBPHGIQhqhWRxV8EwQfcAASAeLHAJ6upmCPMkSvGPxhCaz5kAAHn4xYp2rrYY0iENNaInT3cdgDvuPj2xLvgsIwe7o//9k=',
	},
	{
		text: 'blue',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7vhDBHGcYfgGumwP_JdDsWdbmRBJrO822ayjYBWnUeOpg4mvv5HBrUCHh&s',
	},
	{
		text: 'r32',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcedysoUHEN5Pu8C5gy1_H_-fwbYUbZTqHhLblNaFvYGMlDVdQ6r0d3T5n&s',
	},
	{
		text: 'gold',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVUpJPnUV2JjON_U8j_GsNfpzB1TE_1YSPTFB4ElJX3-e7BPB_Dz0WJLvZ&s',
	},
	{
		text: 'white',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQawL7bAfO-DV0rY3XlWnkm2cJcAAB9JQsZw4P9k8R0RElWDOhPyJ06WEMO&s',
	},
	{
		text: 'nissan',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3a4aW0nL4gsFvceXOcqfFT5qlrOwHU0DySevbEo8-45XzIJJxu4x5ZeB&s',
	},
	{
		text: 'modified',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXsPphsOHUfc10c5bCr6VkCDK2d0YYYc7PkjiA527xIMsJZw7x5qqt3GZZ&s',
	},
	{
		text: 'red',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJnGchkU3zwrTdq4WbFSjd5E-ehy9gtEaaxiuOE9-LHZnh8PYhANsp3D_&s',
	},
	{
		text: 'rocket bunny',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYefgcSyvUOC_qcNY9yZV7AX8yPaDlnZ3BU5eH794jT3AQH6AiTVXPDl5S&s',
	},
	{
		text: 'r33',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2ZYkl0giWGtaNXKwr2z8HbJszowxKEQTDATCJMLvJ7kpGsRl9dr8CBnD&s',
	},
	{
		text: 'chrome',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtKFD8Oalc6HqSrkWVMtPTitLO0mXpV9ofKYxgusg8zjfZdlaA4wX3KVv&s',
	},
	{
		text: 'car',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTsdEjLHkQIYipiaZcLUP9LG2GsplKl7MQSuawbDbOgtQ_5ygK46i_3xc&s',
	},
	{
		text: 'cool',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfhHP8XoQ0X3eL4J_Xy0BJ0pnvrkINkKR78N6yhfXa7eWXn3UBh1ZzMep8&s',
	},
	{
		text: 'widebody',
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGGm-Hh5so6PtScyr7lXrB9V13dFr7mtMJC5YlO9aaDPHfPQNRvzsFPK_&s',
	},
];

const features2 = (num) => {
	let i = 0;
	return new Array(num).fill(0).map(() => {
		i++;
		return {
			description: <>{i}</>,
		};
	});
};

function Feature({ imageUrl, title, description }) {
	const imgUrl = useBaseUrl(imageUrl);

	return (
		<div className={classnames('col col--4', styles.feature)}>
			{imgUrl && (
				<div className="text--center">
					<img className={styles.featureImage} src={imgUrl} alt={title} />
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}

function Home() {
	return <Redirect to="/react-carousel/docs/installation" />;
	const [features, setFeatures] = useState([
		{
			id: 1,
			title: <>1</>,
			imageUrl: 'img/undraw_docusaurus_mountain.svg',
			description: (
				<>
					Docusaurus was designed from the ground up to be easily installed and
					used to get your website up and running quickly.
				</>
			),
		},
		{
			id: 2,
			title: <>2</>,
			imageUrl: 'img/undraw_docusaurus_tree.svg',
			description: (
				<>
					Docusaurus lets you focus on your docs, and we&apos;ll do the chores.
					Go ahead and move your docs into the <code>docs</code> directory.
				</>
			),
		},
		{
			id: 3,
			title: <>3</>,
			imageUrl: 'img/undraw_docusaurus_react.svg',
			description: (
				<>
					Extend or customize your website layout by reusing React. Docusaurus
					can be extended while reusing the same header and footer.
				</>
			),
		},
		{
			id: 4,
			title: <>4</>,
			imageUrl: 'img/undraw_docusaurus_react.svg',
			description: (
				<>
					Extend or customize your website layout by reusing React. Docusaurus
					can be extended while reusing the same header and footer.
				</>
			),
		},
		{
			id: 5,
			title: <>5</>,
			imageUrl: 'img/undraw_docusaurus_react.svg',
			description: (
				<>
					Extend or customize your website layout by reusing React. Docusaurus
					can be extended while reusing the same header and footer.
				</>
			),
		},
		{
			id: 6,
			title: <>6</>,
			imageUrl: 'img/undraw_docusaurus_react.svg',
			description: (
				<>
					Extend or customize your website layout by reusing React. Docusaurus
					can be extended while reusing the same header and footer.
				</>
			),
		},
		{
			id: 7,
			title: <>7</>,
			imageUrl: 'img/undraw_docusaurus_react.svg',
			description: (
				<>
					Extend or customize your website layout by reusing React. Docusaurus
					can be extended while reusing the same header and footer.
				</>
			),
		},
	]);

	const [added, setAdded] = useState(false);
	const [addedCount, setAddedCount] = useState(1);
	const [extraItems, setExtraItems] = useState([]);
	const addItems = () => {
		if (addedCount > 2) {
			return [];
		}

		const newItems = [...Array(20)].map((_, id) => {
			const attr = {
				id,
				title: <>{id}</>,
				imageUrl: 'img/undraw_docusaurus_react.svg',
				description: (
					<>
						Extend or customize your website layout by reusing React.
						Docusaurus can be extended while reusing the same header and
						footer.
					</>
				),
			};
			return <Feature key={attr.id} {...attr} />;
		});

		if (addedCount == 1) {
			setExtraItems(newItems.slice(8, 11));
		} else if (addedCount == 2) {
			setExtraItems(newItems.slice(11, 15));
		}

		setAdded(true);
		setAddedCount(addedCount + 1);
		return newItems;
	};

	const context = useDocusaurusContext();
	const [dataa, setData] = useState(slideData);
	const { siteConfig = {} } = context;
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<header className={classnames('hero hero--primary', styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link
							className={classnames(
								'button button--outline button--secondary button--lg',
								styles.getStarted,
							)}
							to={useBaseUrl('docs/doc1')}
						>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				<section className={styles.features}>
					<div className="container">
						<div
							className="row"
							style={{ width: '660px', margin: 'auto' }}
						></div>
					</div>
				</section>
				<section className={styles.features}>
					<div className="container">
						<div className="row"></div>
					</div>
				</section>
				{features && features.length && (
					<section className={styles.features}>
						<div className="container">
							<div className="row">
								<button onClick={addItems}>zzz</button>
								<Carousel
									extraItems={extraItems}
									beforeChange={addItems}
									swiping={true}
									dynamic={true}
									show={5.15}
									slide={5}
									transition={0.5}
								>
									{features.map((props, idx) => (
										<Feature key={props.id} {...props} />
									))}
								</Carousel>
							</div>
						</div>
					</section>
				)}
			</main>
		</Layout>
	);
}

export default Home;
