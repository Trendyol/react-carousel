module.exports = {
	title: 'Carousel',
	tagline: 'Lightweight carousel component for React',
	url: 'https://trendyol.github.io',
	baseUrl: '/react-carousel/',
	favicon: 'img/icon.png',
	organizationName: 'Trendyol',
	projectName: 'react-carousel',
	themeConfig: {
		navbar: {
			title: 'React Carousel',
			logo: {
				alt: 'Carousel',
				src: 'img/icon.png',
			},
			links: [
				{
					to: 'docs/installation',
					activeBasePath: 'docs',
					label: 'Docs',
					position: 'left',
				},
				{
					href: 'https://github.com/trendyol/react-carousel',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Installation',
							to: 'docs/installation',
						},
						{
							label: 'Usage',
							to: 'docs/usage  ',
						},
					],
				},
				{
					title: 'Communtiy',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/trendyol/',
						},
						{
							label: 'Meetup',
							href: 'https://www.meetup.com/trendyol/',
						},
					],
				},
				{
					title: 'Social',
					items: [
						{
							label: 'Medium',
							href: 'https://medium.com/trendyol-tech',
						},
						{
							label: 'Youtube',
							href: 'https://www.youtube.com/channel/UCUBiayLMggBAsiYvGLzQJ5w/',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Trendyol Open Source`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/trendyol/react-carousel/edit/master/website/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
