import { Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
}
