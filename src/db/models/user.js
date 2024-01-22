import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

export default mongoose.models.User || mongoose.model('User', userSchema);