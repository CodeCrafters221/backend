import { Schema } from "mongoose";
import { UserRole } from "../enums/user-role.enum";


export const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole) }
}, { timestamps: true });