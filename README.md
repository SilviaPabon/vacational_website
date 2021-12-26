# vacational_website
 Website about vacational plans, made for learning purposes

## 🖥️ INSTALLATION CONFIG AND USAGE

1. Clone the repository: 

```shell script
git clone https://github.com/SilviaPabon/vacational_website
```

2. Move into the cloned directory folder: 

```shell script
cd .\vacational_website\
```

3. Install node dependencies: 

```shell script
npm i
```

4. Create your own MySQL database running ```./src/database/DB.sql``` script. **The script creates the base tables and insert some data**. 

5. Create your own .env file with the following fields:

| FIELD | DESCRIPTION |
| ------------- | ------------- |
| DB_NAME  | MySQL database (schema) name  |
| DB_HOST  | MySQL host (It can be localhost)  |
| DB_PORT  | MySQL port |
| DB_USER  | MYSQL user (It can be root)  |
| DB_PASSWORD  | MySQL user password  |
| SE_SECRET  | Node session secret.  |

6. Run dev script: 

```shell script
npm run dev
```

7. Open localhost:3000 on your browser.
