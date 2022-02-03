# RoadAccidentAnalysis

Visualization project
## Prerequisites

In order to get the project up and running you need to have setup the following pieces of software: `python>=3.8, poetry, docker, docker-compose, nodejs>=14, yarn.`

## How to set up

### Step 1 configure database.

We have cleaned up a csv, only with the needed information, which we load into a postgres database for better performance. We've automated that part by a script which you can find in `backend/populate_db.py`.

```bash
cd backend
docker-compose up # Spins up the postgres database
docker container list # Take note of the container 'id' of postgres
docker inspect <id>   # Check the internal IP, and update the variable db_ip in main.py and src/models/accident.py 
```

After you make sure all ips are correct, go ahead and run 
```
python populate_db.py
```
This will populate the database (360k rows) one by one, and it will take a while (about 40-60 mins).

### Step 2 get frontend up and running.

```bash
cd visualization
yarn # Make sure you are synced up and have all the dependencies
yarn start
```

### Step 3 Done

You will have up and running the frontend on `localhost:3000`, backend on `localhost:4242` and a db postgres service on a `<dockerip>:5432`.
## Structure

#### Backend

#### Visualization Client

