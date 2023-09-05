"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Login from "../../../public/Images/login_img_1.png";
import Image from "next/image";
import { CircularProgress } from '@mui/material';



export default function LoginPage() {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  const onLogin = async () => {
    try {

      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);

      toast.success("Login success");

      router.push("/profile");

    } catch (error: any) {

      console.log("Login failed", error.message);

      toast.error(error.message);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    document.title = "Login"

    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);


  return (
    <div>
      <div className="container">

        <div className="row">
          <div className="col-lg-12 ">
            <h1 className="h center ">{loading ? <CircularProgress /> : "Login Page"}</h1>
          </div>
        </div>

        <div className="row">

          <div className="col-lg-6 center">


            <Image src={Login} width={650} height={450} className="img-fluid bounce-top" alt="img"
            priority 
            />
          </div>



          <div className="col-lg-6 center">

            <form>


              <div className="mb-3">
                <label className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Enter your passsword"
                />
              </div>
              <button
                onClick={onLogin}
                className="btn btn-primary">Login here</button>

              <button className="btn btn-secondary mx-3" >
                <Link style={{ textDecoration: "none", color: "black" }} href="/signup">
                  Visit signup page
                </Link>
              </button>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
};

