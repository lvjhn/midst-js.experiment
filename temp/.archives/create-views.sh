rm -rf src/app/@sites/www/blog/*
rm -rf src/app/@sites/mobile/blog/*

node midst app create:view www blogs/index
node midst app create:view www blogs/search
node midst app create:view www blogs/:blog_id/index
node midst app create:view www blogs/:blog_id/dashboard
node midst app create:view www blogs/:blog_id/settings
node midst app create:view www blogs/:blog_id/posts/:post_id/index
node midst app create:view www blogs/:blog_id/posts/:post_id/edit
node midst app create:view www blogs/:blog_id/posts/:post_id/comments/:comment_id/index 
node midst app create:view www blogs/:blog_id/posts/:post_id/comments/:comment_id/edit 

node midst --hard-restart