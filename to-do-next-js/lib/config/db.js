import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://meshareo:123456_2003@cluster0.s95xmzc.mongodb.net/');
    console.log("DB Connected")
}