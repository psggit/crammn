import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.port || 3001;
const app = express();

app.listen(PORT, ()=>{
    let bannerPath = path.join(__dirname, '/banner.txt');
    process.stdout.write(fs.readFileSync(bannerPath, {encoding:'utf8', flag:'r'}))
    process.stdout.write('\n************************************************************\n')
    process.stdout.write('SERVER STARTED\n')
    process.stdout.write('************************************************************\n')
})