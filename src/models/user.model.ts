import {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
    Model,
    Schema,
    model,
} from 'mongoose';
import { IUser } from '../types/types';
import { genSalt, hash, compare } from 'bcrypt';
import log from '../utils/logger';

type UserMethods = {
    validatePassword: (
        this: HydratedDocument<IUser>,
        candidatePassword: string
    ) => Promise<Boolean>;
};
interface UserModel extends Model<IUser, {}, UserMethods> {}
const userSchema = new Schema<IUser, UserModel>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'users',
        versionKey: false,
        timestamps: true,
    }
);

userSchema.method(
    'validatePassword',
    async function (this: HydratedDocument<IUser>, candidatePassword: string) {
        try {
            return await compare(candidatePassword, this.password);
        } catch (e) {
            log.error(e, 'could not validate password');
            return false;
        }
    }
);

userSchema.pre(
    'save',
    async function (next: CallbackWithoutResultAndOptionalError) {
        if (!this.isModified('password') || !this.isNew) {
            next();
        }
        const salt = await genSalt(12);
        this.password = await hash(this.password, salt);
    }
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
