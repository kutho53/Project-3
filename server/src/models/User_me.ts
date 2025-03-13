import { Schema, model, type Document } from 'mongoose';
import clientSchema from './Client.js';
import bcrypt from 'bcrypt';


interface IUser extends Document {
  _id: string;
  userName: string;
  email: string;
  password: string;
  clients: [];
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  clients: [clientSchema]
});

// set up pre-save middleware to create password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
