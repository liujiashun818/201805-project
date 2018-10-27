## 创建表和修改列
```sql
-- 创建学生表
CREATE TABLE `student`
(
 id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(64) NOT NULL,
 age int NOT NULL,
 city VARCHAR(32)
)
-- 增加身份证号列
ALTER TABLE  student ADD COLUMN idcard VARCHAR(18) NULL;
-- 修改列 
ALTER TABLE student MODIFY COLUMN idcard VARCHAR(32) NULL;
-- SELECT * FROM student;
DESC student;
-- 删除一列
ALTER TABLE student DROP COLUMN idcard;
```

## 添加约束 
```sql
INSERT INTO 
student(name,idcard,age,city)
VALUES('lisi','100',100,DEFAULT)

SELECT * FROM student;
-- name=lisi   idcard=200
云平台 4点跑一下备份
UPDATE student 
SET city='北京'
WHERE name='lisi' OR idcard=200

SELECT * FROM student
WHERE age IS NOT NULL;

DELETE FROM student
WHERE age = 3 OR id=100;
SELECT * FROM score;
TRUNCATE TABLE student;
-- 普通的SQL操作会记录日志，并且可以还原
-- TRUNCATE操作不会记录日志，并且不可还原







```

## 查询
```sql
-- SELECT * FROM student;
SELECT id,name,city 城市,'中国' as 国家
FROM student
-- WHERE city = '北京'
WHERE age IS NULL
ORDER BY id DESC;
-- 查询一下我们的学生一共来自于哪些城市 
-- DISTINCT 区别 不重复
SELECT DISTINCT city 
FROM student

0 1 2 3 4
1 2 3 4 5
SELECT * 
FROM student  
LIMIT 3,3
-- 3表示只要三条
-- 3表示跳过多少条，也可以理解为起始索引
-- + 只能用来计算数值
SELECT 1+1;
SELECT 'a'+2;
SELECT NULL+2;
SELECT 'a'+'b'
-- ABS(X) concat就是把多个字符串加在了一起
SELECT CONCAT('a','b')



```

```js
SELECT * 
FROM score
ORDER BY course_id ASC,grade DESC
-- 在MYQL里有很多内置的函数
SELECT LENGTH('zfpx')
SELECT LENGTH('珠峰培训')

SELECT CONCAT('a','b','c');
SELECT CONCAT_WS('-','a','b','c')

SELECT UPPER('abc');
SELECT LOWER('ABC');

SELECT SUBSTR('abcde' FROM 2);
SELECT SUBSTR('abcde' FROM 2 FOR 2)
SELECT SUBSTR('abcde',2,2);

CREATE TABLE person
(
first_name VARCHAR(64),
last_name VARCHAR(64)
)
INSERT INTO person
VALUES('charles','tony');
SELECT * FROM person;
Charles-Tony

SELECT CONCAT_WS('-',CONCAT(UPPER(SUBSTR(first_name,1,1)),LOWER(SUBSTR(first_name,2))),
CONCAT(UPPER(SUBSTR(last_name,1,1)),LOWER(SUBSTR(last_name,2))))
FROM person;

-- indexOf
SELECT INSTR('zfpx','p');


SELECT TRIM('@@zfpx@@');

SELECT TRIM('@' FROM '@@zfpx@@');

SELECT LPAD('zfpx',10,'@');
SELECT RPAD('zfpx',10,'@');

SELECT REPLACE('zfpx','p','k');

SELECT FORMAT(100000.1111,2);

SELECT LEFT('abcde12345',5);
SELECT RIGHT('abcde12345',5);
SELECT ROUND(2.5);
SELECT ROUND(2.555,2);

SELECT mod(10,3);
SELECT NOW();
SELECT CURDATE();
SELECT CURTIME();
SELECT DATE_ADD(NOW(),INTERVAL 1 DAY);

SELECT YEAR(NOW());
SELECT MONTH(NOW());
SELECT DAY(NOW());
-- HOUR MINIUTE `SECOND`(time)

SELECT STR_TO_DATE('09-08-2018','%d-%m-%Y')
SELECT * FROM student
-- WHERE birthday = '1982-09-03';
WHERE YEAR(birthday)='1982' AND MONTH(birthday)=9

SELECT id,DATE_FORMAT(birthday,'%Y年%m月%d日') FROM student

-- 判断时间的间隔 
SELECT CEIL(DATEDIFF(NOW(),birthday)/365)
FROM student;
SELECT CONNECTION_ID();
SELECT DATABASE();
SELECT VERSION();
SELECT LAST_INSERT_ID();
SELECT USER();
SELECT MD5('123');
SELECT PASSWORD('123');
select * from mysql.user
update from mysql.user
set password = PASSWORD('123')
SELECT IF(1>2,'A','B');

SELECT * FROM score;
>90 优
>80 良
>70 中
>60 及格
其它 不及格

SELECT grade,
CASE 
WHEN grade >90 then '优'
WHEN grade >80 then '良'
WHEN grade >70 then '中'
WHEN grade >60 then '及格'
ELSE '不及格'
END
FROM score;

SELECT level,SUBSTR(level,1,INSTR(level,'-')-1),SUBSTR(level,INSTR(level,'-')+1) FROM student
ORDER BY SUBSTR(level,1,INSTR(level,'-')-1)  ASC,
SUBSTR(level,INSTR(level,'-')+1) DESC


SELECT * FROM student 
WHERE DATEDIFF(NOW(),birthday)/368>18;

SELECT * FROM student 
WHERE DATE_ADD(birthday,INTERVAL 18 YEAR) < NOW();

SELECT * FROM student 
WHERE YEAR(NOW()) - YEAR(birthday)>18

SELECT * FROM student 
WHERE MONTH(NOW()) =  MONTH(birthday) AND DAY(NOW()) =DAY(birthday)


SELECT name,SUBSTR(email,INSTR(email,'@')+1) FROM student 

```

## 函数
```js
SELECT NOW();
SELECT ZNOW();

CREATE FUNCTION ZNOW() RETURNS VARCHAR(64)
RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日')

SELECT * FROM course;

CREATE FUNCTION ADD_COURSE(name VARCHAR(32)) RETURNS INT
BEGIN
INSERT INTO course(name) VALUES(name);
RETURN  LAST_INSERT_ID();
END

SELECT ADD_COURSE('地理');
```

##

