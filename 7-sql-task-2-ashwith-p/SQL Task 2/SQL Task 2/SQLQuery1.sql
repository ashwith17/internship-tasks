/*1. Get the firstname and lastname of the employees who placed orders between 15th August,1996 and 15th 
August,1997*/
SELECT DISTINCT Employee.firstname, Employee.lastname
FROM Employee
INNER JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
WHERE Orders.OrderDate BETWEEN '1996-08-15' AND '1997-08-15';

/*2. Get the distinct EmployeeIDs who placed orders before 16th October,1996*/
SELECT DISTINCT Employee.EmployeeID
FROM Employee
INNER JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
WHERE Orders.OrderDate < '1996-10-16';

/*3. How many products were ordered in total by all employees between 13th of January,1997 and 16th of 
April,1997.*/
SELECT COUNT(*) AS 'No. of Products'
FROM Employee
INNER JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
JOIN OrderDetails ON OrderDetails.OrderID=Orders.OrderID
JOIN Products ON Products.ProductID=OrderDetails.ProductID
WHERE Orders.OrderDate BETWEEN '1997-01-13' AND '1997-04-16';

/*4. What is the total quantity of products for which Anne Dodsworth placed orders between 13th of 
January,1997 and 16th of April,1997.*/
SELECT SUM(OrderDetails.Quantity) AS 'Number of Orders'
FROM Employee
JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
WHERE Orders.OrderDate BETWEEN '1997-01-12' AND '1997-04-17'
  AND Employee.FirstName = 'Anne'
  AND Employee.LastName = 'Dodsworth';

/*5. How many orders have been placed in total by Robert King*/
SELECT COUNT(Employee.EmployeeID) AS 'No of Orders'
FROM Employee
INNER JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
WHERE Employee.FirstName = 'Robert' AND Employee.LastName = 'King';

/*6. How many products have been ordered by Robert King between 15th August,1996 and 15th August,1997*/
SELECT COUNT(*) AS 'No of Orders'
FROM Employee
INNER JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
JOIN OrderDetails ON OrderDetails.OrderID=Orders.OrderID
JOIN Products ON Products.ProductID=OrderDetails.ProductID
WHERE Orders.OrderDate BETWEEN '1996-08-15' AND '1997-08-15'
  AND Employee.FirstName = 'Robert'
  AND Employee.LastName = 'King';

/*7. I want to make a phone call to the employees to wish them on the occasion of Christmas who placed 
orders between 13th of January,1997 and 16th of April,1997. I want the EmployeeID, Employee Full Name, 
HomePhone Number.*/
SELECT DISTINCT Employee.EmployeeID, CONCAT(Employee.FirstName, ' ', Employee.LastName) AS 'FullName', Employee.HomePhone
FROM Employee
INNER JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
WHERE Orders.OrderDate BETWEEN '1997-01-13' AND '1997-04-16';

/*8. Which product received the most orders. Get the product's ID and Name and number of orders it received.*/
SELECT TOP 1 OrderDetails.ProductID, Products.ProductName, COUNT(OrderDetails.ProductID) AS OrderCount
FROM OrderDetails
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID
GROUP BY OrderDetails.ProductID, Products.ProductName
ORDER BY OrderCount DESC;

/*9. Which are the least shipped products. List only the top 5 from your list.*/
SELECT TOP 5 OrderDetails.ProductID, Products.ProductName, COUNT(OrderDetails.ProductID) AS OrderCount
FROM OrderDetails
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID
GROUP BY OrderDetails.ProductID, Products.ProductName
ORDER BY OrderCount;

/*10. What is the total price that is to be paid by Laura Callahan for the order placed on 13th of January,1997*/
SELECT (OrderDetails.Quantity * OrderDetails.UnitPrice) - (OrderDetails.Quantity * OrderDetails.UnitPrice * OrderDetails.Discount) AS TotalPrice
FROM Orders
INNER JOIN Employee ON Orders.EmployeeID = Employee.EmployeeID
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
WHERE Employee.FirstName = 'Laura' AND Employee.LastName = 'Callahan' AND Orders.OrderDate = '1997-01-13';

/*11. How many number of unique employees placed orders for Gorgonzola Telino or Gnocchi di nonna Alice or  Raclette Courdavault or Camembert Pierrot in the month January,1997*/
SELECT DISTINCT Employee.*
FROM Employee
JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
WHERE OrderDate >= '1997-01-01 00:00:00.000' 
  AND OrderDate <= '1997-01-30 00:00:00.000' 
  AND (ProductName = 'Gorgonzola Telino' 
       OR ProductName = 'Gnocchi di nonna Alice' 
       OR ProductName = 'Raclette Courdavault' 
       OR ProductName = 'Camembert Pierrot');

/*12. What is the full name of the employees who ordered Tofu between 13th of January,1997 and 30th of 
January,1997*/
SELECT FirstName + ' ' + LastName AS FullName
FROM Employee
JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
WHERE OrderDate >= '1997-01-13 00:00:00.000' 
  AND OrderDate <= '1997-01-30 00:00:00.000' 
  AND ProductName = 'Tofu';

/*13. What is the age of the employees in days, months and years who placed orders during the month of 
August. Get employeeID and full name as well*/
SELECT DISTINCT Employee.EmployeeID,
                FirstName + ' ' + LastName AS FullName,
                FLOOR(DATEDIFF(day, BirthDate, GETDATE()) / 365) AS years,
                FLOOR(DATEDIFF(day, BirthDate, GETDATE()) % 365 / 30) AS months,
                (DATEDIFF(day, BirthDate, GETDATE()) % 30) AS days,employee.BirthDate
FROM Employee
JOIN Orders ON Employee.EmployeeID = Orders.EmployeeID
WHERE MONTH(OrderDate) = '08';

/*14. Get all the shipper's name and the number of orders they shipped*/
SELECT Shippers.CompanyName, COUNT(Shippers.CompanyName) AS 'No of Orders'
FROM Orders
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
GROUP BY CompanyName;

/*15. Get the all shipper's name and the number of products they shipped.*/
SELECT Shippers.CompanyName, COUNT(Shippers.CompanyName) AS 'No of Products'
FROM Orders
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY CompanyName;

/*16. Which shipper has bagged most orders. Get the shipper's id, name and the number of orders.*/
SELECT TOP 1 Orders.ShipperID, Shippers.CompanyName, COUNT(Shippers.CompanyName) AS 'No of Orders'
FROM Orders
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
GROUP BY CompanyName, Orders.ShipperID
ORDER BY COUNT(Shippers.CompanyName) DESC;

/*17. Which shipper supplied the most number of products between 10th August,1996 and 20th September,1998. Get the shipper's name and the number of products.*/
SELECT TOP 1 Shippers.CompanyName, COUNT(Shippers.CompanyName) AS 'No of Products'
FROM Orders
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
WHERE ShippedDate BETWEEN '1996-08-10' AND '1998-09-20'
GROUP BY CompanyName
ORDER BY COUNT(Shippers.CompanyName) DESC;

/*18. Which employee didn't order any product 4th of April 1997*/
SELECT DISTINCT Employee.EmployeeID, FirstName + ' ' + LastName AS 'Full Name'
FROM Employee
JOIN Orders ON Orders.EmployeeID = Employee.EmployeeID
JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
JOIN Products ON Products.ProductID = OrderDetails.ProductID
WHERE Employee.EmployeeID NOT IN (SELECT EmployeeID FROM Orders WHERE OrderDate = '1997-04-04');

/*19. How many products where shipped to Steven Buchanan*/
SELECT COUNT(Products.ProductID) AS 'Products Shipped'
FROM Employee
JOIN Orders ON Orders.EmployeeID = Employee.EmployeeID
JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
JOIN Products ON Products.ProductID = OrderDetails.ProductID
WHERE FirstName = 'Steven' AND LastName = 'Buchanan';

/*20. How many orders where shipped to Michael Suyama by Federal Shipping*/
SELECT COUNT(Orders.OrderID) AS 'Orders Shipped'
FROM Employee
JOIN Orders ON Orders.EmployeeID = Employee.EmployeeID
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
WHERE FirstName = 'Michael' AND LastName = 'Suyama' AND Shippers.CompanyName = 'Federal Shipping';

/*21. How many orders are placed for the products supplied from UK and Germany*/
SELECT COUNT(*) AS 'Number of Products'
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON Products.ProductID = OrderDetails.ProductID
JOIN Suppliers ON Suppliers.SupplierID = Products.SupplierID
WHERE Suppliers.Country = 'UK' OR Suppliers.Country = 'Germany';

/*22. How much amount Exotic Liquids received due to the order placed for its products in the month of 
January,1997*/
SELECT SUM(Quantity * Products.UnitPrice - Quantity * Products.UnitPrice * Discount) AS 'Total Amount'
FROM OrderDetails
JOIN Products ON OrderDetails.ProductID = Products.ProductID
JOIN Orders ON Orders.OrderID = OrderDetails.OrderID
JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID
WHERE Suppliers.CompanyName = 'Exotic Liquids'
  AND DATEPART(MONTH, OrderDate) = 1
  AND DATEPART(YEAR, OrderDate) = 1997;

/*23. In which days of January, 1997, the supplier Tokyo Traders haven't received any orders.*/
select distinct OrderDate from Orders where OrderDate not in (SELECT Orders.OrderDate
FROM Orders 
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID 
JOIN Products ON OrderDetails.ProductID = Products.ProductID 
JOIN Suppliers ON Suppliers.SupplierID = Products.SupplierID 
WHERE Suppliers.CompanyName = 'Tokyo Traders' 
    AND DATEPART(MONTH, Orders.OrderDate) = 1 
    AND DATEPART(YEAR, Orders.OrderDate) = 1997) AND DATEPART(MONTH, Orders.OrderDate) = 1 AND DATEPART(YEAR, Orders.OrderDate) = 1997;

/*24. Which of the employees did not place any order for the products supplied by Ma Maison in the month of 
May*/
SELECT DISTINCT FirstName + ' ' + LastName AS 'Employee Name'
FROM Employee
WHERE FirstName NOT IN (
    SELECT DISTINCT Employee.FirstName
    FROM Employee
    JOIN Orders ON Orders.EmployeeID = Employee.EmployeeID
    JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
    JOIN Products ON OrderDetails.ProductID = Products.ProductID
    JOIN Suppliers ON Suppliers.SupplierID = Products.SupplierID
    WHERE Suppliers.CompanyName = 'Ma Maison' AND DATEPART(MONTH, Orders.OrderDate) = 5
);

/*25. Which shipper shipped the least number of products for the month of September and October,1997 
combined.*/
SELECT TOP 1 Shippers.CompanyName, COUNT(Shippers.ShipperID) AS 'Count of products'
FROM Shippers
JOIN Orders ON Shippers.ShipperID = Orders.ShipperID
WHERE OrderDate BETWEEN '1997-09-01' AND '1997-10-31'
GROUP BY Shippers.CompanyName;

/*26. What are the products that weren't shipped at all in the month of August, 1997*/
SELECT Products.ProductName
FROM Products
WHERE ProductName NOT IN (
    SELECT DISTINCT Products.ProductName
    FROM Products
    JOIN OrderDetails ON Products.ProductID = OrderDetails.ProductID
    JOIN Orders ON OrderDetails.OrderID = Orders.OrderID
    WHERE OrderDate BETWEEN '1997-08-01' AND '1997-08-31'
);

/*27. What are the products that weren't ordered by each of the employees. List each employee and the 
products that he didn't order.*/
SELECT FirstName + ' ' + LastName AS 'Employee Name', ProductName
FROM Employee
CROSS JOIN Products
EXCEPT
(
    SELECT DISTINCT FirstName + ' ' + LastName AS 'Employee Name', ProductName
    FROM Employee
    FULL JOIN Orders ON Orders.EmployeeID = Employee.EmployeeID
    FULL JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
    FULL JOIN Products ON Products.ProductID = OrderDetails.ProductID
);

/*28. Who is busiest shipper in the months of April, May and June during the year 1996 and 1997*/
SELECT TOP 1 Shippers.CompanyName
FROM Orders
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
WHERE DATEPART(MONTH, OrderDate) IN (4, 5, 6)
  AND DATEPART(YEAR, OrderDate) IN (1996, 1997)
GROUP BY Shippers.CompanyName
ORDER BY COUNT(Orders.OrderID) DESC;

/*29. Which country supplied the maximum products for all the employees in the year 1997*/
SELECT TOP 1 Country 
FROM Orders 
JOIN OrderDetails ON OrderDetails.OrderID=Orders.OrderID 
JOIN Products ON Products.ProductID=OrderDetails.ProductID 
JOIN Suppliers ON Suppliers.SupplierID=Products.SupplierID 
GROUP BY Suppliers.Country 
ORDER BY Count(Orders.OrderID) DESC ;

/*30. What is the average number of days taken by all shippers to ship the product after the order has been 
placed by the employees*/
SELECT AVG(DATEDIFF(day,OrderDate,shippedDate)) AS 'Average Time' 
FROM Orders;

/*31. Who is the quickest shipper of all.*/
SELECT TOP 1 CompanyName 
FROM Orders 
JOIN Shippers ON Shippers.ShipperID=Orders.ShipperID 
GROUP BY CompanyName 
ORDER BY AVG(DATEDIFF(day,OrderDate,shippedDate));


/*32. Which order took the least number of shipping days. Get the orderid, employees full name, number of 
products, number of days took to ship and shipper company name.*/
select top 1 Orders.OrderID,FirstName+' '+LastName as 'Employee Full Name',Quantity,DATEDIFF(day,OrderDate,shippedDate) as 'Days',CompanyName
from Orders join Employee on Employee.EmployeeID=Orders.EmployeeID 
join OrderDetails on OrderDetails.OrderID=Orders.OrderID 
join Shippers on Shippers.ShipperID=Orders.ShipperID 
where DATEDIFF(day,OrderDate,shippedDate) is not NULL 
order by DATEDIFF(day,OrderDate,shippedDate) asc;


/*UNIONS*/
/*1. Which orders took the least number and maximum number of shipping days? Get the orderid, employees 
full name, number of products, number of days taken to ship the product and shipper company name. Use 
1 and 2 in the final result set to distinguish the 2 orders.*/
Select top 1 Orders.OrderID,FirstName+' '+LastName as 'Employee Name',Quantity,DATEDIFF(day,OrderDate,ShippedDate) as 'Days',CompanyName
from Employee
JOIN Orders on Orders.EmployeeID=Employee.EmployeeID
join OrderDetails on OrderDetails.OrderID=Orders.OrderID 
join Shippers on Shippers.ShipperID=Orders.ShipperID 
where DATEDIFF(day,OrderDate,ShippedDate)=(select min(DATEDIFF(day,OrderDate,ShippedDate)) from Orders where DATEDIFF(day,OrderDate,ShippedDate) is not null)
UNION
Select top 1 Orders.OrderID,FirstName+' '+LastName as 'Employee Name',Quantity,DATEDIFF(day,OrderDate,ShippedDate) as 'Days',CompanyName
from Employee
JOIN Orders on Orders.EmployeeID=Employee.EmployeeID
join OrderDetails on OrderDetails.OrderID=Orders.OrderID 
join Shippers on Shippers.ShipperID=Orders.ShipperID 
where DATEDIFF(day,OrderDate,ShippedDate)=(select max(DATEDIFF(day,OrderDate,ShippedDate)) from Orders where DATEDIFF(day,OrderDate,ShippedDate) is not null)

/*2. Which is cheapest and the costliest of products purchased in the second week of October, 1997. Get the 
product ID, product Name and unit price. Use 1 and 2 in the final result set to distinguish the 2 products.*/
select Products.ProductID,ProductName,Products.UnitPrice
from Products
JOIN OrderDetails on OrderDetails.ProductID=Products.ProductID
Join Orders on Orders.OrderID=OrderDetails.OrderID
where OrderDate BETWEEN '1997-10-08' AND '1997-10-14' and Products.UnitPrice=(select Min(Products.unitPrice) from Products JOIN OrderDetails on OrderDetails.ProductID=Products.ProductID
Join Orders on Orders.OrderID=OrderDetails.OrderID where OrderDate BETWEEN '1997-10-08' AND '1997-10-14')
UNION
select Products.ProductID,ProductName,Products.UnitPrice
from Products
JOIN OrderDetails on OrderDetails.ProductID=Products.ProductID
Join Orders on Orders.OrderID=OrderDetails.OrderID
where OrderDate BETWEEN '1997-10-08' AND '1997-10-14' and Products.UnitPrice=(select Max(Products.unitPrice) from Products JOIN OrderDetails on OrderDetails.ProductID=Products.ProductID
Join Orders on Orders.OrderID=OrderDetails.OrderID where OrderDate BETWEEN '1997-10-08' AND '1997-10-14')


/*CASE*/
/*1. Find the distinct shippers who are to ship the orders placed by employees with IDs 1, 3, 5, 7
Show the shipper's name as "Express Speedy" if the shipper's ID is 2 and "United Package" if the shipper's 
ID is 3 and "Shipping Federal" if the shipper's ID is 1.*/
SELECT DISTINCT
    CASE Shippers.shipperid
        WHEN 1 THEN 'Shipping Federal'
        WHEN 2 THEN 'Express Speedy'
        WHEN 3 THEN 'United Package'
        ELSE 'Unknown Shipper'
    END AS shipper_name
FROM 
    orders
INNER JOIN 
    shippers ON Orders.shipperid = Shippers.shipperid
WHERE 
    Orders.employeeid IN (1, 3, 5, 7);
