import config from 'config';
import jwt from 'jsonwebtoken';

export function signJwt(
    object: Object,
    keyName: 'accessTokenPrivateKey',
    options?: jwt.SignOptions
) {
    const signingKey = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
}

export function verifyJwt<T>(
    token: string,
    keyName: 'accessTokenPublicKey'
): T | null {
    const publicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;

    try {
        const decoded = jwt.verify(token, publicKey) as T;
        return decoded;
    } catch (error) {
        return null;
    }
}
