import { Schema, model, type Document } from 'mongoose';
import clientSchema from './Client.js';

interface IUser extends Document {
  userName: string;
  password: string;
  clients: [];
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  clients: [clientSchema]
});

const User = model<IUser>('User', userSchema);

export default User;
