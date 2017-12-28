create table Intent(ID int NOT NULL AUTO_INCREMENT,name varchar(100),PRIMARY KEY (ID));
alter table Intent add CONSTRAINT nk_name UNIQUE (Name);
create table IntentMessage(ID int NOT NULL AUTO_INCREMENT,IntentID int NOT NULL, type tinyint(2), text varchar(500),PRIMARY KEY (ID));

create table UserDialog(ID int NOT NULL AUTO_INCREMENT,SocialID int NOT NULL, SocialUserID varchar(50), message varchar(500),IntentID int, PRIMARY KEY (ID));
alter table UserDialog add CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ;