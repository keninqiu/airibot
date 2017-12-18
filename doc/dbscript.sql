create table Intent(ID int NOT NULL AUTO_INCREMENT,name varchar(100),PRIMARY KEY (ID));
alter table Intent add CONSTRAINT nk_name UNIQUE (Name);
create table IntentMessage(ID int NOT NULL AUTO_INCREMENT,IntentID int NOT NULL, type tinyint(2), text varchar(500),PRIMARY KEY (ID));