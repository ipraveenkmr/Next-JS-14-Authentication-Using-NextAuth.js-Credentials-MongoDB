import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from 'bcrypt';

dbConnect();


export async function GET(request) {
    const users = await User.find({}).sort({ _id: -1 });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });

}

export async function POST(request) {

    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
        return new Response(JSON.stringify({
            success: false,
            status: 400,
            message: 'email and password are required',
            data: email,
        }));
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    // If user is not found, return an error
    if (!user) {
        return new Response(JSON.stringify({
            success: false,
            status: 400,
            message: 'Invalid credentials'
        }));
    }

    // if(password == user.password) {
    //     return new Response(JSON.stringify({
    //         success: true,
    //         status: 200,
    //         data: user
    //     }));
    // }else{
    //       return new Response(JSON.stringify({
    //         success: false,
    //         status: 400,
    //         message: 'Wrong Password'
    //     }));
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        return new Response(JSON.stringify({
            success: true,
            status: 200,
            data: user
        }));
    } else {
        return new Response(JSON.stringify({
            success: false,
            status: 400,
            message: 'Wrong Password'
        }));
    }

}
