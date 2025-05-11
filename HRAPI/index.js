const express = require('express');

const cors = require('cors');

const pool = require('./db')

require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('Welcome to HR API');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/emp', async (req, res) => {
    try {
        const result = await pool.query('select * from employees');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

app.get('/empTotal', async (req, res) => {
    try {
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

app.get('/TotalCountries', async (req, res) => {
    try {
        const result = await pool.query('select count(*) from countries');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});


app.get('/Totalregions', async (req, res) => {
    try {
        const result = await pool.query('select count(*) from regions');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});


app.get('/TotalDepartment', async (req, res) => {
    try {
        const result = await pool.query('select count(*) from Departments');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});


app.get('/deptTotal', async (req, res) => {
    try {
        const result = await pool.query('select count(department_name) from departments');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/locTotal', async (req, res) => {
    try {
        const result = await pool.query(' select e.employee_id,e.first_name,d.department_id,d.department_name,l.location_id,l.country_id,c.country_id,c.country_name from employees as e join departments as d on e.department_id=d.department_id join locations as l on d.location_id=l.location_id join countries as c on l.country_id=c.country_id  order by employee_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job_history', async (req, res) => {
    try {
        const result = await pool.query('select e.employee_id,e.first_name,e.salary,j.employee_id,j.job_id,j.department_id  from employees as e join job_history as j on e.employee_id=j.employee_id order by e.employee_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/cor_jobhistory', async (req, res) => {
    try {
        const result = await pool.query(' select j.employee_id,j.department_id,j.job_id,e.employee_id,e.first_name,e.salary from job_history as j join employees as e on j.employee_id=e.employee_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job_dept', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id,e.first_name,e.department_id,d.department_id,d.department_name,j.department_id,j.job_id,j.employee_id ,count(j.job_id) from employees as e join departments as d on e.department_id=d.department_id join job_history as j on e.employee_id=j.employee_id group by e.employee_id,e.first_name,e.department_id,d.department_id,d.department_name,j.department_id,j.job_id,j.employee_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job_dept_loc', async (req, res) => {
    try {
        const result = await pool.query('select e.job_id,e.first_name,j.job_id,j.employee_id,d.department_id,d.department_name,l.location_id,l.city from employees as e join job_history as j on e.employee_id=j.employee_id join departments as d on e.department_id=j.department_id join locations as l on d.location_id=l.location_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job_country', async (req, res) => {
    try {
        const result = await pool.query('select e.employee_id,e.first_name,j.job_id,j.employee_id,j.department_id,j.start_date,c.country_id,c.country_name,d.department_id,d.location_id,l.location_id,l.city from employees as e join job_history as j on e.employee_id=j.employee_id join departments as d on j.department_id=d.department_id join locations as l on d.location_id=l.location_id join countries as c on l.country_id=c.country_id order by e.employee_id,j.start_date');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job_dept', async (req, res) => {
    try {
        const result = await pool.query(' SELECT jh.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, d.department_name FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN departments d ON jh.department_id = d.department_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job_history', async (req, res) => {
    try {
        const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id, j.job_title FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/emp_dept', async (req, res) => {
    try {
        const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, j.job_title, d.department_name FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/emp_deptloc', async (req, res) => {
    try {
        const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, j.job_title, l.city FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/emp_cont', async (req, res) => {
    try {
        const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, j.job_title, c.country_name FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/cont_loc', async (req, res) => {
    try {
        const result = await pool.query('SELECT r.region_id, r.region_name, c.country_name, l.city FROM regions r JOIN countries c ON r.region_id = c.region_id JOIN locations l ON c.country_id = l.country_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/loc_cont', async (req, res) => {
    try {
        const result = await pool.query('SELECT c.country_id, c.country_name, r.region_name, l.location_id, l.city, l.state_province FROM countries c JOIN regions r ON c.region_id = r.region_id JOIN locations l ON c.country_id = l.country_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/cont_reg', async (req, res) => {
    try {
        const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, j.job_title, c.country_name FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});




app.get('/emp_loc', async (req, res) => {
    try {
        const result = await pool.query('SELECT d.department_id, d.department_name, e.employee_id, e.first_name, e.last_name, l.city, l.state_province FROM departments d JOIN employees e ON d.department_id = e.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/dept_loc_cont', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, d.department_name, l.city, c.country_name FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/dept_manag_loc', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name, d.department_name, l.city FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/dept_loc', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, j.job_title, d.department_name, l.city FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 10');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/dept_manag', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, j.job_title, d.department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id LEFT JOIN employees m ON e.manager_id = m.employee_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/dept_manag_loc', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, j.job_title, d.department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name, l.city FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id LEFT JOIN employees m ON e.manager_id = m.employee_id JOIN locations l ON d.location_id = l.location_id');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/reg_cont', async (req, res) => {
    try {
        const result = await pool.query('SELECT country_name FROM countries WHERE region_id = 1');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/dept_N', async (req, res) => {
    try {
        const result = await pool.query('SELECT d.* FROM departments d JOIN locations l ON d.location_id = l.location_id WHERE l.city LIKE N%');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/comm_0.15', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.* FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN employees m ON d.manager_id = m.employee_id WHERE m.commission_pct > 0.15 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});





app.get('/emp_manag', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT j.job_title FROM jobs j JOIN employees e ON j.job_id = e.job_id WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL) ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/name_asia', async (req, res) => {
    try {
        const result = await pool.query('SELECT l.postal_code FROM locations l JOIN countries c ON l.country_id = c.country_id JOIN regions r ON c.region_id = r.region_id WHERE r.region_name = "Asia" ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



app.get('/com_per', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT d.department_name FROM departments d JOIN employees e ON d.department_id = e.department_id WHERE e.commission_pct < (SELECT AVG(commission_pct) FROM employees WHERE commission_pct IS NOT NULL) ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});




app.get('/avg_salary', async (req, res) => {
    try {
        const result = await pool.query('SELECT j.job_title FROM jobs j JOIN employees e ON j.job_id = e.job_id WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id) ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});





app.get('/emp_Ids', async (req, res) => {
    try {
        const result = await pool.query('SELECT employee_id FROM employees WHERE department_id IS NULL LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});







app.get('/emp_manag', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT j.job_title FROM jobs j JOIN employees e ON j.job_id = e.job_id WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL) ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});





app.get('/job_title', async (req, res) => {
    try {
        const result = await pool.query('SELECT j.job_title, SUM(e.salary) AS total_salary FROM employees e JOIN jobs j ON e.job_id = j.job_id GROUP BY j.job_title LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});







app.get('/emp_comPer', async (req, res) => {
    try {
        const result = await pool.query('SELECT d.department_name, AVG(e.commission_pct) AS avg_commission FROM departments d JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});






app.get('/max_salary', async (req, res) => {
    try {
        const result = await pool.query('SELECT c.country_name, MAX(e.salary) AS max_salary FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id GROUP BY c.country_name ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});






app.get('/emp_job_title', async (req, res) => {
    try {
        const result = await pool.query('SELECT j.job_title, d.department_name, CONCAT(e.first_name, ', ', e.last_name) AS full_name, jh.start_date FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id WHERE jh.start_date >= "1993-01-01" AND jh.end_date <= "1997-08-31" ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});







app.get('/emp_cityname', async (req, res) => {
    try {
        const result = await pool.query('SELECT c.country_name, l.city, COUNT(d.department_id) AS department_count FROM departments d JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id JOIN employees e ON d.department_id = e.department_id GROUP BY c.country_name, l.city HAVING COUNT(DISTINCT e.employee_id) >= 2 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});




app.get('/emp_working', async (req, res) => {
    try {
        const result = await pool.query('SELECT CONCAT(e.first_name, ', ', e.last_name) AS full_name, j.job_title, jh.start_date, jh.end_date FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id WHERE e.commission_pct IS NULL LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});





app.get('/emp_wokrS', async (req, res) => {
    try {
        const result = await pool.query('SELECT CONCAT(e.first_name, ', ', e.last_name) AS full_name, e.employee_id, c.country_name FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});





app.get('/emp_deptId', async (req, res) => {
    try {
        const result = await pool.query('SELECT first_name, last_name, salary, department_id FROM employees WHERE salary IN (SELECT MIN(salary) FROM employees GROUP BY department_id) LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});




app.get('/emp_highSalary', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees e1 WHERE 2 = (SELECT COUNT(DISTINCT salary) FROM employees e2 WHERE e2.salary > e1.salary)');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});




app.get('/emp_nameJ', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, e.salary, e.department_id FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees) AND e.department_id IN (SELECT department_id FROM employees WHERE first_name LIKE ' % J % ') LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});





app.get('/loc_toronto', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, j.job_title FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id WHERE l.city = "Toronto" LIMIT 10 ');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ Error: err.message });
    }
});



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Connect successfully...on PORT ${PORT}`);
});