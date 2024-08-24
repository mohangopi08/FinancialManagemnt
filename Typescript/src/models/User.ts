import mongoose from "mongoose";



interface Users{
    full_name:string,
    email:string,
    password:string,
    image:string
}



const User = new mongoose.Schema({
    full_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
});


let UserModel = mongoose.model<Users>("Users",User)


export default UserModel