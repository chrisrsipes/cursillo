create database project1;
use project1;

create table Weekend_T 
(Weekendid integer(10) Not Null,
 Datestarted date,
 Dateended date,
 LocationID integer(10),
 Weekend_Number integer(10),
 Weekend)gender Char(1),
 Completed Bool,
 Notes long,
 Description long,
 ImageID integer(10),
 constraint weekend_PK primary key Weekendid
 constraint weekend_FK1 foreign key Location_T(LocationID),
 constraint weekend_FK2 foreign key Image_T(ImageID),
 on update cascade);
 
 create table Talklink_T
 (LinkID integer(10) Not Null,
  Weekendid integer(10),
  constraint TalkLink_PK primary key LinkID,
  constraint TalkLink_FK foreign key Weekend_T(Weekendid),
  on update cascade);
  
  create table Image_T
  (ImageID integer(10) Not Null,
   Files long
   constraint Image_PK primary key (ImageID),
   on update cascade);
   
   create table Position_T
   (PositionID integer(10) Not Null,
    Position_Number integer(10),
    ImageID integer(10),
    Description long,
    Active bool,
    SpiritualID integer(10),
    constraint Position_PK primary key (PositionID),
    constraint Postion_FK1 foreign key Image_T(ImageID),
    constraint Position_FK2 foreign key Spiritual_T(SpiritualID),
    on update cascade);
    
    create table Spiritual_T
    (SpiritualID integer(10),
    constraint Spiritual_PK primary key SpiritualID,
    on update cascade);
    
    create table TeamPosition
    (PositionID integer(10),
     Weekendid integer(10),
     Date_Served date,
     TeamID integer(10),
     constraint TeamPosition_PK1 primary key PositionID,
     constraint TeamPosition_PK2 primary key Weekendid,
     constraint TeamPosition_PK3 primary key TeamID,
     constraint TeamPosition_FK1 foreign key Position_T(PositionID),
     constraint TeamPosition_FK2 foreign key Weekend_T(Weekendid),
     constraint TeamPosition_FK3 foreign key Team_T(TeamID));
     
  create table Team_T
  (TeamID integer(10) Not Null,
   Notes long,
   Cursillold varchar (100),
   constraint Team_PK primary key TeamID,
   constraint Team_FK foreign key Cursillo_T(Cursillold),
   on update cascade);
 
 create table People_T
 (RecID integer(10) Not Null,
  StateID integer(10),
  ParishID integer(10),
  UserName varchar(50),
  Gender Char(1),
  Notes long,
  Parish Varchar(50),
  Fname Varchar(50),
  Lname varchar(50),
  Street long,
  City varchar(50),
  State varchar(20),
  Zip integer(10),
  HPhone integer(20),
  Email varchar(50),
  constraint People_PK primary key RecID,
  constraint People_FK1 foreign key State_T(StateID),
  constraint People_FK2 foreign key Parish_T(ParishID),
  on update cascade);
  
  create table TeamMember_T
  (TRecID integer(10),
   TeamID integer(10),
   constraint TeamMember_PK1 primary key TRecID,
   constraint TeamMember_PK2 primary key TeamID,
   constraint TeamMember_FK1 foreign key People_T(RecID),
   constraint TeamMember_Fk2 foreign key Team_T(TeamID));
   
   create table Candidate_T
   (CRecID integer(10),
    Date_Started date,
    constraint Candidate_PK primary key CRecID,
    constraint Candidate_FK foreign key People_T(RecID));
    
 create table State_T
 (StateID integer(10) Not Null,
  State_Text long,
  State_Short varchar(50),
  constraint State_PK primary key StateID,
  on update cascade);
  
  create table Parish_T
  (ParishID integer(10) Not NUll,
   Notes long,
   PName varchar(50),
   County varchar(20),
   City varchar(20),
   constraint Parish_PK primary key ParishID,
   on update cascade);
   
   create table Cursillo_T
   (Cursilloid integer(10) not null,
   constraint Cursillo_PK primary key Cursilloid,
   on update cascade);
   
   create table Location_T
   (LocationID integer(10) not null,
    Cursilloid integer(10),
    Street long,
    City varchar(20),
    State varchar(20),
    Zip integer(20),
    constraint Location_PK primary key LocationID,
    constraint Location_FK foreign key Cursillo_T(Cursilloid),
    on update cascade);
    
  
   
     
     
    
    
  
  
