drop table if exists things;
drop table if exists users;

create table users(
    id serial primary key,
    name varchar(20)
);
create table things(
    id serial primary key,
    name varchar(20),
    description text,
    "UserID" integer references users(id)
    
);

insert into users(name) values('moe');
insert into users(name) values('roger');
insert into users(name) values('alex');
insert into users(name) values('rich');
insert into users(name) values('jeremy');

insert into things(name, "UserID", description) values ('foo', 1, 'foo description')
-- insert into things(name, "UserID", description) values ('baz', 1, 'baz description')
-- insert into things(name, "UserID", description) values ('bar', 2, 'bar description')