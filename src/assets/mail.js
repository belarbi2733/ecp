const express = require('express');
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
// const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors({origin: "*"}));
// View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// Static folder
// app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.render('contact', {layout:false});
// });



app.listen(3000, () => console.log('Server started...'));