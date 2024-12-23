# Codibly Frontend (Weather App)

An application that allows you to check the weather forecast for the next 7 days and the estimated amount of energy that solar panels will generate.

## Example

>https://codibly-frontend-0-1-0.onrender.com/

## Before Deployment

Configure the `.env` file.

## Deploy to Docker repository

```sh
docker build -t {username}/codibly-frontend:{version} .

docker image push {username}/codibly-frontend:{version}
```

## Backend

>https://github.com/Vercy00/codibly-backend