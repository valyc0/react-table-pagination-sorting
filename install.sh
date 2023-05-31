MYHOME=$PWD;
rm -rf $MYHOME/tmp
mkdir $MYHOME/tmp
cd $MYHOME/tmp
git clone https://github.com/valyc0/db-ready.git
git clone https://github.com/valyc0/angular14-spring-boot-nginx.git

# gestione DB:
cp -r $MYHOME/tmp/db-ready/mysql8 $MYHOME/server
cp $MYHOME/server/database.sql $MYHOME/server/mysql8/database.sql
cd $MYHOME/server/mysql8
./install.sh

cd $MYHOME/server/spring-boot-jpa-paging-sorting
./start.sh

# gestione nginx
cp -r $MYHOME/tmp/angular14-spring-boot-nginx/nginx $MYHOME/server/
cp $MYHOME/server/nginx.conf $MYHOME/server/nginx/conf
cd $MYHOME/server/nginx
./install.sh



rm -rf $MYHOME/tmp
cd $MYHOME

cd $MYHOME/my-table-pagin
yarn
./compile.sh
