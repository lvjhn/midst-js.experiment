rm -rf ./src/app/blogs/*

# CREATE TEST VIEWS #
node midst app create:view www blogs --force
node midst app create:view www blogs/:blog_id/index --force
node midst app create:view www blogs/:blog_id/authors --force
node midst app create:view www blogs/:blog_id/authors/:author_id/index --force
node midst app create:view www blogs/:blog_id/posts --force 
node midst app create:view www blogs/:blog_id/posts/:post_id/index --force 
node midst app create:view www blogs/:blog_id/posts/:post_id/comments/:comment_id/index --force

node midst --hard-restart