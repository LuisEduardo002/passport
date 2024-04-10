const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');  
const session = require('express-session');
const { name } = require('ejs');
const localStrategy = require('passport-local').Strategy;
const app = express();


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(function(username, password, done) {
if(username === 'admin' && password === 'admin') {
    return done(null, {id : '1', name : 'admin'});
}
done(null, false);
}));


passport.serializeUser(function(user, done) {
    done(null, user,id);
});

passport.deserializeUser(function(user, done) {
    done(null,{id : '1', name : 'admin'});
});
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("hola inicio ")
})

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login',passport.authenticate({
    successRedirect: '/',
    failureRedirect: '/login'
}));

//http://localhost:3000/login

app.listen(3000, () => console.log('Server is running'));