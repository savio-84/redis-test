import express, { json } from 'express';
import { Cache as Redis } from './database/Redis';

const app = express();

const redis = new Redis();

app.post('/', (request, response) => {
    const { name, description } = request.body;

    const car = {
        name,
        description
    }

    redis.set(name, JSON.stringify(car), 60);

    return response.status(200).json(JSON.stringify(car))
})

app.get('/:name', (request, response) => {
    const { name } = request.params;


})

app.listen(3333);