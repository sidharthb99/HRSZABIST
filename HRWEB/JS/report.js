const emp_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/tolemp";

fetch(emp_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('emp').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const reg_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/tolreg";

fetch(reg_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('reg').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const loc_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/tolloc";

fetch(loc_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('loc').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const con_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/tolcon";

fetch(con_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('con').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const dep_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/toldep";

fetch(dep_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('dep').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const jh_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/toljh";

fetch(jh_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('jh').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const job_count_Link = "https://studious-dollop-7vw6q5vw69693r5g6-6006.app.github.dev/job";

fetch(job_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('job').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});