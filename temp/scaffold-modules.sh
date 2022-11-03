# CREATE MODULES #

rm -rf ./src/app/*

node midst app create:module --force --prefix="" --root=true

node midst app create:module installer --force                  

node midst app create:module auth --force                 
node midst app create:module auth.sign_up --force          
node midst app create:module auth.log_in --force           

node midst app create:module account --force          

node midst app create:module profile            --force  --prefix="@:user_id"
node midst app create:module profile.editor     --force 
node midst app create:module profile.history    --force  
node midst app create:module profile.gallery    --force  
node midst app create:module profile.notes      --force 
node midst app create:module profile.friends    --force  

node midst app create:module newsfeed --force          

node midst app create:module friendships               --force 
node midst app create:module friendships.suggestions   --force 
node midst app create:module friendships.requests      --force 
node midst app create:module friendships.blocks        --force 

node midst app create:module groups                 --force
node midst app create:module groups.control_panel   --force  --pre-prefix=":group_id"
node midst app create:module groups.posts           --force  --pre-prefix=":group_id" 
node midst app create:module groups.posts.comments           --force  --pre-prefix=":post_id"
node midst app create:module groups.posts.comments.replies           --force  --pre-prefix=":comment_id" 

node midst app create:module chat                --force
node midst app create:module chat.settings       --force 
node midst app create:module chat.messages       --force  --pre-prefix=":user1_id/:user2_id"
node midst app create:module chat.av_call        --force  --pre-prefix=":room_id"

node midst --hard-restart
