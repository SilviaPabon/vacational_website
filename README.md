# vacational_website
 Website about vacational plans, made for learning purposes
 
## DEPLOYMENT:

Web site is hosted on [HEROKU](https://vacational-website.herokuapp.com/)
 
## AUTHORS: 

- 👩 Silvia Pabón: https://github.com/SilviaPabon
- 👦 Pedro Chaparro: https://github.com/PedroChaparro

## 🖥️ INSTALLATION CONFIG AND USAGE

1. Clone the repository: 

```shell script
git clone https://github.com/SilviaPabon/vacational_website
```

2. Move into the cloned directory folder: 

```shell script
cd .\vacational_website\
```

3. Change to **dev (recommended)** or deployment branch. Those are the most up-to-date branches.  

4. Install node dependencies: 

```shell script
npm i
```

5. Create your own MySQL database running ```./src/database/DB.sql``` script. **The script creates the base tables and insert some data**. 

6. Create your own .env file with the following fields:

| FIELD | DESCRIPTION |
| ------------- | ------------- |
| DB_NAME  | MySQL database (schema) name  |
| DB_HOST  | MySQL host (It can be localhost)  |
| DB_PORT  | MySQL port |
| DB_USER  | MYSQL user (It can be root)  |
| DB_PASSWORD  | MySQL user password  |
| SE_SECRET  | Node session secret.  |

7. Run dev script: 

```shell script
npm run dev
```

8. Open localhost:3000 on your browser.

## SOME VIEWS: 

### ☀️ Home Page: ☀️ 

#### 🖥️ Desktop view

<table><tr><td>
    <img src="https://i.ibb.co/GR9VDY2/home.png" width="300px"/>
</td></tr></table>

#### 📱 Mobile view

<table><tr><td>
    <img src="https://i.ibb.co/jywC8j1/home-mobile.png" height="300px"/>
</td></tr></table>

### 👤 SignUp & Dashboard example: 👤

#### 🖥️ Desktop view

<table><tr><td>
    <img src="https://i.ibb.co/Rj0zQr7/signup.png" width="600px"/>
</td></tr></table>

<table><tr><td>
    <img src="https://i.ibb.co/KyZGRXf/Dashboard.png" width="600px"/>
</td></tr></table>

#### 📱 Mobile view

<table><tr><td>
    <img src="https://i.ibb.co/KqBwFsj/signup-mobile.png" height="300px"/>
</td><td>
    <img src="https://i.ibb.co/3BCjT1R/dashboard-mobile.png.png" height="300px"/>
</td></tr></table>

### 🌴 List plans example: 🌴

#### 🖥️ Desktop view

<table><tr><td>
    <img src="https://i.ibb.co/Bsq3gJt/listplans.png" width="300px"/>
</td></tr></table>

#### 📱 Mobile view

<table><tr><td>
    <img src="https://i.ibb.co/wYfLtCc/list-mobile.png" height="300px"/>
</td></tr></table>

### ⛱️ User's plans example: ⛱️

#### 🖥️ Desktop view

<table><tr><td>
    <img src="https://i.ibb.co/51HDdZT/myplans.png" width="600px"/>
</td></tr></table>

#### 📱 Mobile view

<table><tr><td>
    <img src="https://i.ibb.co/tJJgQp2/userplan-mobile.png" height="300px"/>
</td></tr></table>

## POWERED BY: 

<img alt="HTML" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" /> <img alt="CSS" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" /> <img alt="Sass" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" /> <img alt="NodeJS" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img alt="MySQL" src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /> <img alt="Handlebars" src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black" />
