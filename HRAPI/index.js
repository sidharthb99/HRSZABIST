const express = require('express');

const cors = require('cors');

const pool = require('./db')

require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

app.get('/',async(req, res)=>{
    try{
        res.json('Welcome to HR API');
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/emp', async(req, res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/empTotal', async(req, res)=>{
    try{
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/TotalCountries', async(req, res)=>{
    try{
        const result = await pool.query('select count(*) from countries');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});


app.get('/Totalregions', async(req, res)=>{
    try{
        const result = await pool.query('select count(*) from regions');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});


app.get('/TotalDepartment', async(req, res)=>{
    try{
        const result = await pool.query('select count(*) from Departments');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});


const PORT =  process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Connect successfully...on PORT ${PORT}`);
});