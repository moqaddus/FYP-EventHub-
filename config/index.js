import dotenv from 'dotenv';
const result = dotenv.config();

const PORT=process.env.PORT;
const CONN_STRING=process.env.CONN_STRING;

export { PORT, CONN_STRING };