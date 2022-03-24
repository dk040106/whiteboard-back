import dotenv from 'dotenv';

const res = dotenv.config();

if (res.error) throw new Error('No env file found');

const config = {
    mongoUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    port: parseInt(process.env.PORT!),
    certDir: process.env.CERT_DIR!,
};

export default config;