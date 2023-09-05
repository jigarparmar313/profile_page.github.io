"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
  
    const router = useRouter()
    const [data, setData] = useState("nothing")


    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.title = "Profile";
    })

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div>
          <div className="container"> 
            <div className="center">
              <h1>Profile</h1>
              <h3>
                Profile page
                <span className="p-1 mx-2 rounded bg-waring">
                  {data === "nothing" ? 
                    "Nothing"
                   : 
                    <Link href={`/profile/${data}`}>{data}</Link>
                  }
                </span>
              </h3>
    
              
    <div className="mt-5">
    
    <button onClick={logout} className=" mx-5  btn btn-primary rounded-1">
                Logout
              </button>
    
              <button
                onClick={getUserDetails}
                className="btn btn-success rounded-1 "
              >
                GetUser Details
              </button>
    
    </div>
    
            </div>
    
    
          </div>
        </div>
      );
    }
    