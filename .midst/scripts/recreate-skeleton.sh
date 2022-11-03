
rm -rf src/config/libraries 

libraries=(
    "core/vue-router"
    "core/pinia"
    "clients/axios"
    "clients/graphql-request"
    "clients/laravel-echo"
    "ui-cf/element-plus"
    "ui-cf/framework7-vue" 
    "ui/vue-apexcharts"
    "ui/vue-draggable" 
    "utils/chance"
)

for i in "${libraries[@]}" 
do 
    echo "==>" $i
    node midst utils create:library $i --force
done

rm -rf src/config/settings

settings=(
    "clients"
    "redirects" 
    "locations"
    "routing"
    "uicl"
)

for i in "${settings[@]}" 
do 
    echo "==>" $i
    node midst utils create:settings $i --force
done
