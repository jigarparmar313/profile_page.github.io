"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Login from "../../../public/Images/Signup_img_1.png";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Signup";

    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
            <h1 className="h center ">
              {loading ? <CircularProgress /> : "Signup Form"}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 center">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Enter your passsword"
                />
              </div>
              <button onClick={onSignup} className="btn btn-primary mx-0">
                {buttonDisabled ? "No signup" : "Signup here"}
              </button>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                href="/login"
              >
                <button className="btn btn-secondary mx-3">
                  Visit login page
                </button>
              </Link>
            </form>
          </div>

          <div className="col-lg-6 center">
            <Image
              src={Login}
              width={650}
              height={450}
              className="img-fluid bounce-top"
              priority
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
