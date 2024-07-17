/* create Employee table*/
create table Employee (
ID int Identity(1,1),	
EmployeeID varchar(6) NOT NULL PRIMARY KEY,
FirstName varchar(15) NOT NULL,
LastName varchar(15) NOT NULL,
DateOfBirth Date,
Title varchar(20),
JoiningDate Date,
Age INTEGER,
RoleName varchar(20) not null,
Salary float NOT NULL);

create table role
( RoleName varchar(20) Primary Key,
RoleDescription varchar(100),
Department varchar(20),
Location varchar(20));
