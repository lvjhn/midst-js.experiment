rm -rf src/app/@modules/*

node midst app create:module --force 

node midst app create:module installer --force 

node midst app create:module demos --force 

node midst app create:module auth --force  
node midst app create:module auth.sign_up --force  
node midst app create:module auth.log_in --force 

node midst app create:module account --force  
node midst app create:module account.settings --force  
node midst app create:module account.dashboard --force 

node midst --hard-restart