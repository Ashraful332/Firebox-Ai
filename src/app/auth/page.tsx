"use client"

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const router = useRouter();

    const LoginGoogle = async (credentialResponse: any) => {
        interface MyJwtPayload {
            email: string;
            name: string;
            picture: string;
            iat?: number;
            exp?: number;
        }

        // const PublicApi = process.env.PUBLIC_API;
        const authData = jwtDecode<MyJwtPayload>(credentialResponse.credential);

        // console.log(credentialResponse);
        // console.log(authData);

        const UserEmail: string = authData.email
        const UserName: string = authData.name
        const UserPhoto: string = authData.picture
        console.log({ UserEmail, UserName, UserPhoto });

        try {
            const res = await axios.post(`/api/auth`, { UserEmail, UserName, UserPhoto });

            // token save in cookie
            Cookies.set("token", res.data.token, {
                expires: 15,
                secure: true,
                sameSite: "strict",
            });
            // setUser(res.data.user); // the login user data is on auth provider 
            console.log("Login Success", res.data.user);
             router.push('/ai'); // user is push into ai page
        } catch (error: any) {
            console.error("Login Failed", error.response.data);
        }

    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <GoogleLogin onSuccess={(credentialResponse) => LoginGoogle(credentialResponse)}
                    onError={() => toast("Error is coming on google login")}
                // auto_select={true} 
                />
            </div>
        </div>
    )
}