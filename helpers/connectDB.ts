import {MongoClient} from "mongodb";

export async function connectDB(){
    const  client  =await MongoClient.connect('mongodb+srv://admin1:admin123@cluster0.gqjgbyj.mongodb.net/auth-2?retryWrites=true&w=majority')
    return client
}