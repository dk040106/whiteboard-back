import dotenv from 'dotenv';

const res = dotenv.config();

if (res.error) throw new Error('No env file found');

const config = {
    port: parseInt(process.env.PORT!),
    mongoUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    cookieSecret: process.env.COOKIE_SECRET!,
    certDir: process.env.CERT_DIR!,
};

export default config;