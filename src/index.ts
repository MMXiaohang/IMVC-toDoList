// routes

export default [
	{
		path: '/',
		controller: () => import('./page/todo/Controller'),
	},
	{
		path: '*',
		controller: () => import('./page/todo/Controller'),
	}
]
