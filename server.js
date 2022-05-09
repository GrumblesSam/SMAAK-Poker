const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const {User} = require('./models');

// const helpers = require('./utils/helpers');

// var cors = require('cors')
 const sequelize = require('./config/connections');
 const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(cors())
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };
// app.use(session(sess));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

const app = express();
const PORT = process.env.PORT || 3001;
// const router = require('express').Router();
// const { User } = require('../../models');
app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.post('/create',async(req,res) => {
    try {
          console.log('post method')
        //   const userData = await User.findOne({ where: { email: req.body.email } });
      
        //   if (userData) {
        //     res
        //       .status(400)
        //       .json({ message: 'user already exists' });
        //     return;
        //   }
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
          });
            res.json(newUser);
        }
      catch{
          console.error('you messed up')

      }
  })

app.listen(PORT, () => console.log('Now listening'));


// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });