export const appPort = process.env.APP_PORT || 8080;
export const dbType = process.env.DB_TYPE || "mongodb";

export const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/";
export const jwtSecret = process.env.JWT_SECRET || "jwt_secret";
