const {Pool} = require('pg');
var cors = require('cors');
const pool = new Pool({
    user: "health360",
    password: "Health37592!",
    host: "health360.c9alvjxzbiv3.us-east-2.rds.amazonaws.com",
    port: 5432,
    database: "health360db"
})

const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
var ejs = require('ejs');
const { request, response } = require('express');
// var fs = require('fs'); 
// var http = require('http'); 

const port = process.env.PORT || 5000;
const app = express();

// FOR ROUTING PAGES
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use(express.static("myaccount.html"));
app.use(express.static("diet.html"));
app.use(express.static("fitness.html"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})); 

// Send manage account data to a database
app.post('/createUser', (req, res) => {
    // res.send(`User, email, pswd ${req.body.input_username} ${req.body.input_email} ${req.body.input_pswd}`)
    // res.send();
    usrname = req.body.username;
    usrpswd = req.body.pass;
    useremail = req.body.email;

    
    const text = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
   
    const user = [usrname, useremail, usrpswd];

    res.redirect('/'); 
    
    /* Create user account info in db */    
    var texts = [text];
    var userCalls = [user];

    // pool.connect((err, client, done) => {
    //     if (err) throw err
    //     client.query(texts[0], userCalls[0], (err, res) => {
    //         done()
    //         if (err) {
    //         console.log(err.stack)
    //         } else {
    //         console.log(res.rows[0])
    //         }
    //     })
    // })

    pool
        .connect()
        .then(client => {
            return client
            .query(texts[0], userCalls[0])
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})

app.post('/dietCal', (req, res) => {
    for(key in req.body){
        console.log(key);
        values = JSON.parse(key);
    } 

    testname = req.session.user;
    meal = values.food_name;
    cookStart = values.cook_start;
    cookEnd = values.cook_end;
    date = values.cook_date;

    
    console.log(meal);
    console.log(cookStart);
    console.log(cookEnd);
    console.log(date);
    
    const text2 = 'INSERT INTO dietcal(username, meal, starttime, endtime, date) VALUES($1, $2, $3, $4, $5) RETURNING *';
    
    const meals = [testname, meal, cookStart, cookEnd, date];

    pool
        .connect()
        .then(client => {
            return client
            .query(text2, meals)
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})



app.post('/remove_diet', (req, res) => {
    for(key in req.body){
        console.log(key);
        values = JSON.parse(key);
    } 
    
    testname = req.session.user;
    meal = values.name;
    cookStart = values.start;
    cookEnd = values.end;
   
    
    
    console.log(meal);
    console.log(cookStart);
    console.log(cookEnd);
    
    const text2 = 'DELETE FROM dietcal WHERE username = $1 AND meal = $2 AND starttime = $3 AND endtime = $4 RETURNING *';
    
    const meals = [testname, meal, cookStart, cookEnd];
    //res.redirect('http://127.0.0.1:5500/CSCE-315-Final-Project/Website/myaccount.html'); 

    pool
        .connect()
        .then(client => {
            return client
            .query(text2, meals)
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})

app.post('/import_diet', (req, response) => {
    response.setHeader('Access-Control-Allow-Origin', "*")
    const user = req.session.user;
    const userArray = [user];
    const text = 'SELECT * FROM dietcal WHERE username = $1';
    pool
        .connect()
        .then(client => {
            return client
            .query(text, userArray)
            .then(res => {
                client.release()
                response.send(res.rows);
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})

app.post('/fitness', (req, res) => {
    for(key in req.body){
        console.log(key);
        values = JSON.parse(key);
    } 

    testname = req.session.user;
    workout = values.name;
    workoutStart = values.startTime;
    workoutEnd =values.endTime;
    date = values.day;
    
    
    console.log(workout);
    console.log(workoutStart);
    console.log(workoutEnd);
    console.log(date);
    
    const text2 = 'INSERT INTO fitnesscal(username, workout, starttime, endtime, date) VALUES($1, $2, $3, $4, $5) RETURNING *';
    
    const workouts = [testname, workout, workoutStart, workoutEnd, date];
    //res.redirect('http://127.0.0.1:5500/CSCE-315-Final-Project/Website/myaccount.html'); 

    pool
        .connect()
        .then(client => {
            return client
            .query(text2, workouts)
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})

app.post('/remove_workout', (req, res) => {
    for(key in req.body){
        console.log(key);
        values = JSON.parse(key);
    } 

    testname = req.session.user;
    workout = values.name;
    workoutStart = values.start;
    workoutEnd = values.end;
   
    
    
    console.log(workout);
    console.log(workoutStart);
    console.log(workoutEnd);
    
    const text2 = 'DELETE FROM fitnesscal WHERE username = $1 AND workout = $2 AND starttime = $3 AND endtime = $4 RETURNING *';
    
    const workouts = [testname, workout, workoutStart, workoutEnd];
    //res.redirect('http://127.0.0.1:5500/CSCE-315-Final-Project/Website/myaccount.html'); 

    pool
        .connect()
        .then(client => {
            return client
            .query(text2, workouts)
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})
app.post('/import_workout', (req, response) => {
    response.setHeader('Access-Control-Allow-Origin', "*")
    const user = req.session.user;
    const userArray = [user];
    const text = 'SELECT * FROM fitnesscal WHERE username = $1';
    pool
        .connect()
        .then(client => {
            return client
            .query(text, userArray)
            .then(res => {
                client.release()
                response.send(res.rows);
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
});
app.post('/goals', (req, res) => {
    for(key in req.body){
        console.log(key);
        values = JSON.parse(key);
    } 

    testname = req.session.user;
    goal = values.goal;

    
    console.log(goal);
    
    const text2 = 'INSERT INTO goals(username, goal) VALUES($1, $2) RETURNING *';
    
    const meals = [testname, goal];

    pool
        .connect()
        .then(client => {
            return client
            .query(text2, meals)
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})
app.post('/import_goals', (req, response) => {
    response.setHeader('Access-Control-Allow-Origin', "*")
    const user = req.session.user;
    const userArray = [user];
    const text = 'SELECT * FROM goals WHERE username = $1';
    pool
        .connect()
        .then(client => {
            return client
            .query(text, userArray)
            .then(res => {
                client.release()
                response.send(res.rows);
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
});

app.post('/delete_goal', (req, res) => {
    for(key in req.body){
        console.log(key);
        values = JSON.parse(key);
    } 

    testname = req.session.user;
    goal = values.goal;
   
    const text2 = 'DELETE FROM goals WHERE username = $1 AND goal = $2 RETURNING *';
    
    const workouts = [testname, goal];
    //res.redirect('http://127.0.0.1:5500/CSCE-315-Final-Project/Website/myaccount.html'); 

    pool
        .connect()
        .then(client => {
            return client
            .query(text2, workouts)
            .then(res => {
                client.release()
                console.log(res.rows[0])
                
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
        })
})

app.post('/btn_wkt_add', (req, res) => {
    var usr = req.session.user;
    var exercise = req.body.exercise_name;
    var day = req.body.workout_day;
    var start = new Date(day + ' ' + req.body.start_time + " GMT" + req.body.currTime.split("GMT")[1]);
    var end = new Date(day + ' ' + req.body.end_time + " GMT" + req.body.currTime.split("GMT")[1]);
    if(end < start){
        end.setDate(end.getDate() + 1);
    }
    const event = new Date(day);
    var tmrw = new Date();
    tmrw.setDate(event.getDate()+1);

    console.log(event.toString());
    console.log(event.toISOString());

    var day1 = start.toString();
    day1 = day1.substring(0,15)
    console.log(day1);
    var dayISO = event.toISOString();
    start.UT
    
    const text = 'INSERT INTO fitnesscal(username, workout, starttime, endtime, date) VALUES($1, $2, $3, $4, $5) RETURNING *';
    wkout = [usr, exercise, start.toUTCString(), end.toUTCString(), day1];
    res.redirect('/fitness/workouts');

    pool
    .connect()
    .then(client => {
        return client
        .query(text, wkout)
        .then(res => {
            client.release()
            console.log(res.rows[0])
            
        })
        .catch(err => {
            client.release()
            console.log(err.stack)
        })
    })

});

app.post('/btn_meal_add', (req, res) => {
    var usr = req.session.user;
    var meal = req.body.meal_name;
    var day = req.body.meal_day;
    var start = new Date(day + ' ' + req.body.start_time + " GMT" + req.body.currTime.split("GMT")[1]);
    var end = new Date(day + ' ' + req.body.end_time + " GMT" + req.body.currTime.split("GMT")[1]);
    if(end < start){
        end.setDate(end.getDate() + 1);
    }
    const event = new Date(day);
    var tmrw = new Date();
    tmrw.setDate(event.getDate()+1);

    console.log(event.toString());
    console.log(event.toISOString());

    var day1 = start.toString();
    day1 = day1.substring(0,15)
    console.log(day1);
    var dayISO = event.toISOString();
    start.UT
    
    const text = 'INSERT INTO dietcal(username, meal, starttime, endtime, date) VALUES($1, $2, $3, $4, $5) RETURNING *';
    diet = [usr, meal, start.toUTCString(), end.toUTCString(), day1];
    res.redirect('back');

    pool
    .connect()
    .then(client => {
        return client
        .query(text, diet)
        .then(res => {
            client.release()
            console.log(res.rows[0])
            
        })
        .catch(err => {
            client.release()
            console.log(err.stack)
        })
    })

});

app.post('/auth', function(req, res) {
    var username = req.body.username;
    var pass = req.body.pass;
    userInf = [username, pass];
    text = 'SELECT * FROM users WHERE username = $1 AND password = $2'

    if (username && pass) {
        
        pool.query(text, userInf, (err, results) => {
            if (err) {
                console.log(err.stack)
            // res.send('Wrong Username/Password')
            } else {
                if (results.rows[0] != null) {
                    req.session.loggedIn = true;
                    req.session.user = username;
                    console.log(results.rows[0])
                    res.redirect('/home');
                } else {
                    res.send('Incorrect Username/Password');
                }
                res.end();
            }
            
        });
    } else {
        res.send('Enter into fields');
        res.end();
    }
});

app.post('/signOut', function(req, res) {
    req.session.destroy();
    res.redirect('/');
})

// ROUTING TEMPLATES //
app.get('/', function(req, res) {
    res.render('login')
})

app.get('/home', function(req, res) {
    if (req.session.loggedIn) {
        res.render('index', {
            user: req.session.user
        });
    }
    else {
        response.send('Log in to view page');
    }
});

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

// Nav bar pages
app.get('/myaccount', function(req, res) {
    res.render("myaccount", {
        user: req.session.user
    }); 
});

app.get('/diet', function(req, res) {
    res.render('diet');
});

app.get('/fitness', function(req, res) {
    res.render('fitness');
});

app.get('/diet', function(req, res) {
    res.render('diet');
});

app.get('/articles', function(req, res) {
    res.render('Articles');
})
// Sub pages
app.get('/fitness/workouts', function(req, res) {
    res.render('workouts')
})

app.get('/diet/FoodSearch', function(req, res) {
    res.render('FoodSearch')
})

app.get('/diet/Recipes', function(req, res) {
    res.render('Recipes')
})

app.listen(port, () => {
    console.log(`Server port ${port}`);
}); 


// CREATE TABLE IF NOT EXISTS users(username TEXT PRIMARY KEY, email TEXT, password TEXT)
// CREATE TABLE IF NOT EXISTS userInfo(username TEXT PRIMARY KEY, fname TEXT, lname TEXT, about TEXT, age INTEGER, goal TEXT); 