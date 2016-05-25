DROP DATABASE IF exists unident;
CREATE DATABASE unident DEFAULT CHARACTER SET utf8;

use unident;

SET foreign_key_checks = 0;

DROP TABLE IF exists account;
CREATE TABLE account 
(		 name VARCHAR(20)  NOT NULL,
	     phone_number VARCHAR(11) NOT NULL,
		 id VARCHAR(20) NOT NULL,
         kind tinyint NOT NULL CHECK(kind = 0 OR kind = 1),
	 	 password VARCHAR(255) NOT NULL,
         phone_verify boolean default false,
         profile VARCHAR(255) default '',
         primary key(id),
         UNIQUE (phone_number),
         foreign key (kind) references kind(id)
) Engine =InnoDB DEFAULT CHARSET = utf8;


DROP TABLE IF EXISTS location;
CREATE TABLE location
(	id VARCHAR(20) NOT NULL,
	kind tinyint NOT NULL CHECK(hospital = 2 OR hospital = 3 OR hospital = 4),
    primary key(id),
    foreign key(id) references account(id),
    foreign key(kind) references kind(id)
) Engine = InnoDB DEFAULT CHARSET = utf8;


DROP TABLE IF EXISTS kind;
CREATE TABLE kind
(	id tinyint NOT NULL,
	result VARCHAR(255) NOT NULL,
    primary key (id),
    unique (result)
) Engine = InnoDB DEFAULT CHARSET = utf8;


DROP TABLE IF exists medical_examination;
CREATE TABLE medical_examination 
(		 id int AUTO_INCREMENT NOT NULL,
	     doctor VARCHAR(20) NOT NULL,
         time datetime NOT NULL,
         primary key(id),
         foreign key(doctor) references account(id)
) Engine =InnoDB DEFAULT CHARSET = utf8;