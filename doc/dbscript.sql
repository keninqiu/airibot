create table Intent(ID int NOT NULL AUTO_INCREMENT,name varchar(100),PRIMARY KEY (ID));
alter table Intent add CONSTRAINT nk_name UNIQUE (Name);
create table IntentMessage(ID int NOT NULL AUTO_INCREMENT,IntentID int NOT NULL, type tinyint(2), text varchar(500),PRIMARY KEY (ID));

create table UserDialog(ID int NOT NULL AUTO_INCREMENT,SocialID int NOT NULL, SocialUserID varchar(50), message varchar(500),IntentID int, PRIMARY KEY (ID));
alter table UserDialog add CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ;
alter table UserDialog add Entities varchar(500) ;

create table IntentEntity(ID int NOT NULL AUTO_INCREMENT,Name varchar(100),Value varchar(100),PRIMARY KEY (ID));
alter table IntentEntity add IntentID int NOT NULL ;	

create table UserContext(ID int NOT NULL AUTO_INCREMENT,SocialID int NOT NULL, SocialUserID varchar(50), CurrentIntentName varchar(100),Email varchar(255), Password varchar(255),BusinessName varchar(255),GivenName varchar(255),Website varchar(255), PRIMARY KEY (ID));