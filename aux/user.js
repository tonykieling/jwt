var path = require('path');
const Pool = require('pg').Pool;

const pathX = path.resolve("static/css", "asd/");
console.log("pathX - user.js", pathX);

// database access configuration
// keeping here instead using .env due to information purpose
const pool = new Pool({
  user      : 'ttognovcnkyhpm',
  host      : 'ec2-107-20-168-237.compute-1.amazonaws.com',
  database  : 'd89msi596fhjf3',
  password  : 'fb142cb5b7369a15c9aabf32f96a00931b382f1a7c2da079b2a5426d3fbc46c2',
  port      : 5432,
});
// old but working on local machine - dev environment
// const pool = new Pool({
//   user      : 'kcodingt',
//   host      : 'localhost',
//   database  : 'kcodingt',
//   password  : 'kcodingt',
//   port      : 5432,
// });


/* 
//  it is an auxiliary method which checks whether the email has already exists in the database, which means used by someone
//  it should receive an email
//  it returns true (if the email exists) or false (email does not exist yet) 
*/
checkEmail = email => {
  console.log("### inside checkuserbyemail");

  return new Promise((res, rej) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
      try {
        if (error) {
          throw error;
        }
        if (result.rowCount > 0) {
          res(true);
        } else {
          res(false);
        }
      } catch (err) {
        console.log("checkUserByEmail error: ", err.message);
        rej({message: "CheckEmail - Something BAD has happened! Try it again."});
      }
    });
  });
}


/*
// it checks whether the email and password are ok for that particular user, allowing them to preceed into the system
// it should receive: email and password
// if it's okay, it return all user's data but password
// if it's not okay, it returns a error message
*/
login = (req, res) => {
  console.log("### inside login");
  const user = req.body;
  
  pool.query('SELECT * FROM users WHERE email = $1', [user.email], (error, result) => {
    try {
      if (error) {
        console.log(`userQuery error = ${error.message}`);
        throw error;
      }
      if (result.rowCount > 0) {
        const userFromQuery = result.rows[0];

        if(user.password === userFromQuery.password){
          res.send({
            id           : userFromQuery.id,
            email        : userFromQuery.email,
            name         : userFromQuery.name,
            phone        : userFromQuery.phone
          });
        } else {
          res.send({message: "user/password is wrong!"});
        }
      } else {
        res.send({message: "#user/password is wrong!"});
      }
    } catch (err) {
      console.log("userQuery error: ", err.message);
      res.send({message: "Login - Something BAD has happened! Try it again."});
    }
  });
}


/*
// it creates the user account
// it receives user's data:
//  - email
//  - name
//  - password
//  - phone number
// it returns the user's data that has been created
*/
createUser = async (req, res) => {
  console.log("### inside createUser");
  const { name, email, password, phone } = req.body;

  const result = await checkEmail(email);
  if (result) {
    res.send({message: `Email ${email} already exists.`});
  } else {
    pool.query('INSERT INTO users (email, name, password, phone) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone',
      [email, name, password, phone], (error, result) => {
        try {
          if (error) {
            console.log(`createUser error = ${error.message}`);
            throw error;
          }
          const user = result.rows[0];
          res.send(user);
        } catch (err) {
          console.log("createUser error: ", err.message);
          res.send({message: "CreateUser - Something BAD has happened! Try it again."});
        }
      });
  }
}

module.exports = {
  login,
  createUser
};
