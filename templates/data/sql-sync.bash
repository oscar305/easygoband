# Sync local JSON files with WP JSON plugin
user="root"
dbname="easygoband"
data=$( jq -Rc '' ./es/$1.json )
declare arr=( ["home"]=507 ["goguest"]=471 ["solutions"]=477 )

mysql -u $user -D $dbname -e "
  UPDATE rovoie4d_postmeta
  SET meta_value = $data
  WHERE meta_id = ${arr[$1]}
"
