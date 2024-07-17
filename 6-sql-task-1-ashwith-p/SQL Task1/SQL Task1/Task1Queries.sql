use AshwithDB;


/*1. Select firstname, lastname, title, age, salary for everyone in your employee table*/
Select FirstName,LastName,title,Age,Salary from Employee;

/*2. Select firstname, age and salary for everyone in your employee table*/
Select FirstName, Age, Salary from Employee;

/*3. Selct firstname and display as 'Name' for everyone in your employee table*/
Select FirstName as Name from Employee;

/*4. Select firstname and lastname as 'Name' for everyone. Use " " (space) to separate firstname and last.*/
Select Concat(FirstName,' ',lastname) as Name from Employee;

/* 5.Select all columns for everyone with a salary over 38000. */
Select * from Employee where Salary>38000;

/*6. Select first and last names for everyone that's under 24 years old. */
select FirstName,LastName from Employee where (YEAR(GETDATE()) - YEAR(DateOfBirth)) <24;

/*7. Select first name, last name, and salary for anyone with "Programmer" in their title.*/
Select FirstName,LastName,Salary from Employee where Title='Programmer';

/*8. Select all columns for everyone whose last name contains "O".*/
Select * from Employee where LastName like '%o%';

/*9. Select the lastname for everyone whose first name equals "Kelly". */
Select LastName from Employee where FirstName='Kelly';

/*10. Select all columns for everyone whose last name ends in "Morre".*/
Select * from employee where LastName like '%Morre';

/*11. Select all columns for everyone who are 35 and above.*/
Select * from Employee where Age>=35;

/*12. Select firstname ,lastname,age and salary of everyone whose age is above 24 and below 43.*/
Select FirstName ,LastName,Age, Salary from Employee where Age between 24 and 43;

/*13. Select firstname, title and lastname whose age is in the range 28 and 62 and salary greater than 31250*/
select FirstName, Title ,LastName from Employee where (Age between 28-1 and 62+1) and Salary>31250;

/*14. Select all columns for everyone whose age is not more than 48 and salary not less than 21520.*/
Select * from Employee where Age<=48 and Salary>=21520;

/*15. Select firstname and age of everyone whose firstname starts with "John" and salary in the range 25000
and 35000*/
Select FirstName, Age from Employee where FirstName like 'John%' and Salary between 25000 and 35000;

/*16. Select all columns for everyone by their ages in descending order*/
Select * from Employee Order By Age Desc;

/*17. Select all columns for everyone by their ages in ascending order.*/
Select * from Employee Order By Age ;

/*18. Select all columns for everyone by their salaries in descending order*/
Select * from Employee Order By Salary Desc;

/*19. Select all columns for everyone by their salaries in ascending order.*/
Select * from Employee Order By Salary ;

/*20. Select all columns for everyone by their salaries in ascending order whose age not less than 17.*/
Select * from Employee where Age>17 Order By Salary ;

/*21. Select all columns for everyone by their salaries in descending order whose age not more than 34.*/
Select * from Employee where age<=34 Order By salary Desc;

/*22. Select all columns for everyone by their length of firstname in ascending order.*/
Select * from Employee Order By Len(firstname);

/*23. Select the number of employees whose age is above 45*/
Select Count(age) as 'Employees whose age above 45' from Employee where age>45;

/*24. Show the results by adding 5 to ages and removing 250 from salaries of all employees*/
select EmployeeID,FirstName,LastName,Title,age+5 as 'Updatedage',salary-250 as 'UpdatedSalary'  from Employee;

/*25. Select the number of employees whose lastname ends with "re" or "ri" or "ks"*/
select COUNT(lastname) as 'Employees with lastname ending with re or ri or ks' from Employee where LastName like '%re' or LastName like '%ri' or LastName like '%ks';

/*26. Select the average salary of all your employees*/
select AVG(salary) as 'Average salary' from Employee;

/*27. Select the average salary of Freshers*/
select AVG(salary) as 'Average salary of Freshers' from Employee where Title='Fresher';

/*28. Select the average age of Programmers.*/
select AVG(age) as 'Average age of Programmers' from Employee where Title='Programmer';

/*29. Select the average salary of employees whose age is not less than 35 and not more than 50.*/
select AVG(salary) as 'Average salary of employees whose age is not less than 35 and not more than 50' from Employee where age between 35-1 and 50+1;

/*30. Select the number of Freshers*/
Select COUNT(Title) as 'Total number of Freshers ' from Employee where Title='Fresher';

/*31. What percentage of programmers constitute your employees*/
select (COUNT(title)*100.0)/(select Count(*) from Employee) as 'Percentage of programmers constitute'  from Employee where Title='Programmer';

/*32. What is the combined salary that you need to pay to the employees whose age is not less than 40*/
select SUM(salary) as 'Combined salary of Employee whose age greater than 40' from Employee where age>40;

/*33. What is the combined salary that you need to pay to all the Freshers and Programmers for 1 month*/
select SUM(salary)/12.0 as 'Combined salary of Programmer and Fresher' from Employee where title='Programmer' or title='Fresher';

/*34. What is the combined salary that you need to pay to all the Freshers whose age is greater than 27 for 
3years */
select SUM(salary)*3 as 'combined salary for freshers for 3 years' from Employee where age>27 and title='Fresher';

/*35. Select the eldest employee's firstname, lastname and age whose salary is less than 35000*/
select firstname,lastname,age from Employee where age=(Select max(age) from Employee where salary<35000);

/*36. Who is the youngest General Manager*/
 select * from Employee where age=(select MIN(age) from Employee where title='Manager');

/*37. Select the eldest fresher whose salary is less than 35000*/
select * from Employee where age=(select max(age) from Employee where salary<35000 and Title='Fresher');

/*38. Select firstname and age of everyone whose firstname starts with "John" or "Michael" and salary in the 
range 17000 and 26000*/
select firstname,age from Employee where (FirstName Like 'John%' or FirstName like 'Michael%') and salary between 17000 and 26000;

/*39. How many employees are having each unique title. Select the title and display the number of employees 
present in ascending order*/
select Title,count(title) as 'count' from Employee Group By Title Order By count;

/*40. What is the average salary of each unique title of the employees. Select the title and display the average 
salary of employees in each*/
select Title,Avg(salary) as 'AverageSalary' from Employee Group By Title Order By AverageSalary;


/*41. What is the average salary of employees excluding Freshers*/
select AVG(salary) as 'Average salary of Employees' from Employee where Title<>'Fresher'; 

/*42. What is the average age of employees of each unique title.*/
select Title,Avg(age) as 'AverageAge' from Employee Group By Title Order By AverageAge;


/*43. In the age range of 25 to 40 get the number of employees under each unique title.*/
select Title,count(title) as 'count' from Employee where (age between 25 and 40) Group By Title ;

/*44. Show the average salary of each unique title of employees only if the average salary is not less than 
25000*/
select Title,Avg(salary) as 'AverageSalary' from Employee Group By Title having AVG(salary)>25000;

/*45. Show the sum of ages of each unique title of employee only if the sum of age is greater than 30*/
select Title,sum(age) as 'AverageAge' from Employee Group By Title having sum(age)>30;
