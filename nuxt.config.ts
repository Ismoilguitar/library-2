export default defineNuxtConfig({
	devtools: { enabled: true },
	$production: {
		nitro: {
			storage: {
				data: { driver: 'vercelKV' },
			},
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Montserrat: [400, 600, 700],
				},
			},
		],
		'nuxt-pdfmake',
	],
	shadcn: {
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui',
	},
	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
				},
			],
		},
	},
})
