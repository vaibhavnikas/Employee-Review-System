# Employee-Review-System
Employee-Review-System is a web application where employees of an organization can review each other's performance and submit feedback for each other's performance.

# Deployment Link
My project is deployed on Heroku. Click on the link given below to checkout my project.

[Visit Employee-Review-System](https://emp-review-system.herokuapp.com/)

# Technologies Used
This project was built using the following technologies :
* <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
* <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
* <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">

### NPM packages used :
Important NPM packages used are as follows :

* [ejs](https://ejs.co/) : Templating engine(Embedded JavaScript)
* [express](http://expressjs.com/) : Express.js is a backend framework for Node.js
* [mongoose](https://mongoosejs.com/) : Mongoose ODM
* [node-sass-middleware](https://www.npmjs.com/package/node-sass-middleware) : Compiles .scss files to css
* [passport](https://www.passportjs.org/) : Passport authentication middleware used to authenticate users
* [passport-local](https://www.passportjs.org/packages/passport-local/) : Passport strategy for authenticating with a username and password
* [sass](https://www.npmjs.com/package/sass) : JavaScript implementation of Sass
* [gulp](https://gulpjs.com/) : Used gulp for minifiying css

# Features
The features for admin as well as employees are as follows :

## Admin

1. Admin can add, view, update or remove employees. Admin can also make an employee an admin.
2. Admin can assign a task to an employee to review other employees.
3. Admin can view all the performance reviews submitted by employees towards each other.
4. Admin can also update reviews for employees.

## Employee

1. An employee can register himself as an employee.
2. An employee can submit performance reviews for other employees which has been assigned to him by admin.

# Installation
1. Install Node.js and MongoDB on your machine.
2. Download this project.
3. Open the terminal and make this project the current working directory.
```
$ cd ./Employee-Review-System
```
4. Install all the dependencies.
```
$ npm install
```
5. Setup environment variables.

     [How To Set Environment Variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)
     
6. Start the server.
```
$ npm start
```
7. Open browser and visit http://localhost:8000/

# How to use ?

Watch the following demo video to get a complete understanding on how to use the project :
[Demo Video](https://drive.google.com/file/d/1nlplQQ1wNoQN_rqVsblnEosiQ07IE66D/view?usp=sharing)
