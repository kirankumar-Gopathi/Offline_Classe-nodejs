const express = require('express');
const  path = require('path');
const bodyParser = require('body-parser');

let app = express();

// Set the Template Engine
app.set('view engine','ejs');

// Use the public folder as static
app.use('/public',express.static('public'));

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',(request,response) => {
    response.sendFile(path.join(__dirname ,'views' ,'index.html'));
});

app.get('/about',(request,response) => {
     let employees = [
         {
             name : 'Laura',
             age : 40,
             designation : 'Manager'
         },
         {
             name : 'Rajan',
             age : 25,
             designation : 'Software Engineer'
         },
         {
             name : 'Williams',
             age : 35,
             designation : 'Tech Lead'
         }
     ];
    //response.sendFile(path.join(__dirname , 'views' ,'about.html'));
    response.render('about.ejs',{employees : employees});
});

app.get('/contact',(request,response) => {
    //response.sendFile(path.join(__dirname  , 'views', 'contact.html'));
    let query = request.query;
    response.render('contact.ejs' , {query : query});
});

app.get('/careers/:id',(request,response) => {
    console.log(request.params);
    let person = {
        id : request.params.id
    };
    //response.sendFile(path.join(__dirname , '../views' , 'careers.html'));
    response.render('careers.ejs',{person : person});
});

app.get('/services',(request,response) => {
   // response.sendFile(path.join(__dirname ,'views' , 'services.html'));

    response.render('services.ejs');
});

// for post request
app.post('/services', urlencodedParser,(request,response) => {
    console.log(request.body);
    let person = {
        name : request.body.username,
        email: request.body.email,
        subject : request.body.subject
    };
    response.render('services-success',{person: person});
});

// page not found to be always last
app.use((request,response) => {
    response.sendFile(path.join(__dirname ,'views' ,'404.html'));
});

app.listen(3000);
console.log('server is started at http://127.0.0.1:3000');
