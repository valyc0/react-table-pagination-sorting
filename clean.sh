MYHOME=$PWD;
rm -rf $MYHOME/tmp
docker rm -f my-maven-project
docker rm -f nginx-test
docker rm -f myadmin
docker rm -f some-mysql


rm -rf $MYHOME/server/mysql8
rm -rf $MYHOME/server/nginx
cd  $MYHOME/server/spring-boot-jpa-paging-sorting/
sudo rm -rf ./target .m2

cd $MYHOME/my-table-pagin
rm -rf node_modules yarn.lock
cd $MYHOME