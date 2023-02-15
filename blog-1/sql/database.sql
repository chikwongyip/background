create schema myblog
create table if not exists blogs
(
    id         int auto_increment
        primary key,
    title      varchar(50)      not null,
    content    longtext         not null,
    createtime bigint default 0 not null,
    author     varchar(20)      not null
);

create table if not exists users
(
    id       int auto_increment
        primary key,
    username varchar(20) not null,
    password varchar(20) not null,
    realname varchar(10) not null
);
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '528478huaHUA@';