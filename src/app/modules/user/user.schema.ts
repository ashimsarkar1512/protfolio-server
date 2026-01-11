import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>({
    name: {
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
        select: false
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        defult: false
    }
}, { versionKey: false, timestamps: true });


// secure password using bcrypt before saving
userSchema.pre("save", async function (next) {
    const hashPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
    next();
})


export const UserModel = model("user", userSchema);