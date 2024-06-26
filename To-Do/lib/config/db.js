import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://meshareo:<password>@cluster0.s95xmzc.mongodb.net/');
    console.log("DB Connected")
}