import { jwtVerify } from 'jose';
import { getUserById } from './api-calls/admin';

interface UserJwtPayload {
    jti: string;
    iat: number;
    id: string;
    role: string;
}

export const getJwtSecretKey = (): string => {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret || secret.length === 0) {
        throw new Error("The JWT_SECRET_KEY environment variable is not set");
    }
    return secret;
}

export const verifyAuth = async (token: string): Promise<UserJwtPayload | null> => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        const payload = verified.payload as unknown as UserJwtPayload;
        return payload;
    } catch (error) {
        if (error instanceof Error) {
            console.log("Token verification failed:", error.message);
            throw new Error("Your token has expired or is invalid");
        } else {
            throw new Error("An unknown error occurred during token verification");
        }
    }
}
