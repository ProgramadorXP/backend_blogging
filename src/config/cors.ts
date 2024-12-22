import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];

        if(process.argv[2] === 'dev') {
            whitelist.push(undefined);
        }
        
        // Allow requests without 'Origin' header (e.g., Postman)
        if(!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be sent with requests
}