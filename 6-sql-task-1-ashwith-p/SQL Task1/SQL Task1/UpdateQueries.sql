use AshwithDB;

--Lisa Ray just got married to Michael Moore. She has requested that her last name be updated to Moore. 
update Employee set LastName='Moore' where FirstName='Lisa';

--Ginger Finger's birthday is today, add 1 to his age and a bonus of 5000
update Employee set age=age+1,salary=salary+5000 where FirstName='Ginger';

--All 'Programmer's are now called "Engineer"s. Update all titles accordingly.
update Employee set Title='Engineer' where Title='Programmer';

--Everyone whose making under 30000 are to receive a 3500 bonus. 
update Employee set salary=salary+3500 where salary<30000;

--Everyone whose making over 35500 are to be deducted 15% of their salaries
update Employee set salary=salary-(salary*0.15) where salary>35500;
