CREATE TABLE `purc`(
    id INT AUTO_INCREMENT primary key,
    `sid` varchar(10) NOT NULL,
    room varchar(8) NOT NULL,
    `name` varchar(15) NOT NULL,
    tel varchar(15) NOT NULL,
    items varchar(15) NOT NULL,
    price varchar(15) NOT NULL,
    checked int NOT NULL,
    checkStat int
);
CREATE TABLE `lockdown`(
    id INT AUTO_INCREMENT primary key,
    locked varchar(100)
);
insert into purc
values (
        1,
        '1',
        '01-0001',
        '测试人员',
        '12345678901',
        '测试商品1,测试商品2,',
        '123.4',
        0,
        0
    );
insert into lockdown
values (1, '1,');