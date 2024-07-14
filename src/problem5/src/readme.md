# Interact with Resource
## Built With

<p align="center" style="font-size: 18px"> 
  NodeJS  |
  Postgres  | 
  Docker
</p>

## Getting Started
In this app, i only do the simplest way to interact with the api, i skipped some process such as: validation data, parser data, logger.

### Installing

1. Clone Repository: Copy & paste below script to your terminal

```bash
git clone https://github.com/jarzt-pham/pham-duy-luan.git && cd ./pham-duy-luan/src/problem5/src
```

2. You have to install below technologies:
    1. [Download Postgres](https://www.postgresql.org/download/)
    2. [Download NodeJS](https://nodejs.org/en/download/package-manager)
    3. [Download Docker](https://www.docker.com/products/docker-desktop/) (Optional)
  
3. Install lib node_modules
```bash
npm install
```

After installing above repository and set up, move to below section

### Setup Environment
Copy & paste below script to your terminal

```bash
echo "
# Database
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=99tech
DATABASE_HOST=localhost

# App
APP_PORT=3000
" > .env
```


### Run
Open your terminal and make sure you stay in project folder:

You can use docker or manual on your pc for starting the postgres and connect with app
```bash
docker compose up -d
```


After setup for database, you have to migrate all the tables
```bash
npm run migrate:init
```


Finally, run the app

```bash
npm run dev
```
