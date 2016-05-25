DROP DATABASE IF exists test123;
CREATE DATABASE test123 DEFAULT CHARACTER SET utf8;

use test123;

SET foreign_key_checks = 0;


	DROP TABLE IF exists account;
create table account
		(nickname    VARCHAR(20)  NOT NULL,
	     email       VARCHAR(30)  NOT NULL,
	 	 password     VARCHAR(255) NOT NULL,
         kakao boolean default false,
         facebook boolean default false,
         email_verify boolean default false,
         phone_verify boolean default false,
         profile VARCHAR(255) default '',
         primary key (email),
         UNIQUE (nickname),
         UNIQUE (profile)
) Engine =InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF exists category;
create table category(
	id int unsigned NOT NULL  AUTO_INCREMENT,
    kind tinyint unsigned NOT NuLL check(kind = 0 OR 1 OR 2),
    primary key(id)
    )Engine = InnoDB DEFAULT CHARSET = utf8;


DROP TABLE IF exists uni_perform;
create table uni_perform
	(id int unsigned NOT NULL,
	 nickname VARCHAR(20) NOT NUlL,
     click SMALLINT unsigned NOT NULL default 0,
     content TEXT NOT NULL,
     latitude decimal(2,2) NOT NULL check(latitude >= -90.00 AND latitude <= 90.00 ),
     longtitude decimal(3,2) NOT NULL check (longtitude >= -180.00 AND logtitude <= 180.00),
     update_date DATETIME NOT NULL default now(),
     start_date DATETIME NOT NULL,
     end_date DATETIME NOT NULL, #여기 손볼것 몇시간걸릴지 계산하는거랑 끝나는 날짜 자료형 포함시켜야할듯 표현을 어떻게 할지 상의할것
     cost MEDIUMINT unsigned NOT NULL default 0,
     image VARCHAR (255) default '',
     primary key(id),
     foreign key (id) references category(id) ON DELETE CASCADE ON UPDATE CASCADE,
     foreign key (nickname) references account(nickname) ON DELETE CASCADE ON UPDATE CASCADE
) Engine = InnoDB DEFAULT CHARSET = utf8;
 
DROP TABLE IF exists busking;
create table busking
	(id int unsigned NOT NULL,
	 nickname VARCHAR(20) NOT NUlL,
     click SMALLINT unsigned NOT NULL default 0,
     content TEXT NOT NULL,
     latitude decimal(2,2) NOT NULL check(latitude >= -90.00 AND latitude <= 90.00 ),
     longtitude decimal(3,2) NOT NULL check (longtitude >= -180.00 AND logtitude <= 180.00),
     update_date DATETIME NOT NULL default now(),
     start_date DATETIME NOT NULL,
     image VARCHAR (255) default '',
     primary key(id),
     foreign key (id) references category(id) ON DELETE CASCADE ON UPDATE CASCADE,
     foreign key (nickname) references account(nickname) ON DELETE CASCADE ON UPDATE CASCADE
) Engine = InnoDB DEFAULT CHARSET = utf8;


DROP TABLE IF exists gen_perform;
create table gen_perform
	(id int unsigned NOT NULL,
	 nickname VARCHAR(20) NOT NUlL,
     click SMALLINT unsigned NOT NULL default 0,
     content TEXT NOT NULL,
     latitude decimal(2,2) NOT NULL check(latitude >= -90.00 AND latitude <= 90.00 ),
     longtitude decimal(3,2) NOT NULL check (longtitude >= -180.00 AND logtitude <= 180.00),
     update_date DATETIME NOT NULL default now(),
     start_date DATETIME NOT NULL,
     end_date DATETIME NOT NULL, #여기 손볼것 몇시간걸릴지 계산하는거랑 끝나는 날짜 자료형 포함시켜야할듯 표현을 어떻게 할지 상의할것
     cost MEDIUMINT unsigned NOT NULL default 0,
     image VARCHAR (255) default '',
     primary key(id),
     foreign key (id) references category(id) ON DELETE CASCADE ON UPDATE CASCADE,
     foreign key (nickname) references account(nickname) ON DELETE CASCADE ON UPDATE CASCADE
) Engine = InnoDB DEFAULT CHARSET = utf8;

 SET foreign_key_checks = 1;