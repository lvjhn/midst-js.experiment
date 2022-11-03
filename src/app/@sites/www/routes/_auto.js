export default 
[
	{
		path: "/blogs/:blog_id/authors/:author_id/index",
		component: () => import("../views/blogs/:blog_id/authors/:author_id/index.vue")
	},
	{
		path: "/blogs/:blog_id/authors",
		component: () => import("../views/blogs/:blog_id/authors.vue")
	},
	{
		path: "/blogs/:blog_id/index",
		component: () => import("../views/blogs/:blog_id/index.vue")
	},
	{
		path: "/blogs/:blog_id/posts/:post_id/comments/:comment_id/index",
		component: () => import("../views/blogs/:blog_id/posts/:post_id/comments/:comment_id/index.vue")
	},
	{
		path: "/blogs/:blog_id/posts/:post_id/index",
		component: () => import("../views/blogs/:blog_id/posts/:post_id/index.vue")
	},
	{
		path: "/blogs/:blog_id/posts",
		component: () => import("../views/blogs/:blog_id/posts.vue")
	},
	{
		path: "/blogs",
		component: () => import("../views/blogs.vue")
	},
	{
		path: "/home",
		component: () => import("../views/home.vue")
	},
]