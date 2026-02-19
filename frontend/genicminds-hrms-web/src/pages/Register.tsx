import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg_genicMinds from "../assets/genicMinds_bg.png";
// import bg from "../assets/bg.jpg";
import logo from "../assets/genicminds-logo.png";
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import bg_img from "../assets/genicminds.png";
import axios  from "axios"
import toast from "react-hot-toast";
// import { AxiosError } from "axios";



export default function Register() {

    // type FormErrors = {
    //     username?:string;
    //     email?.:string;
    // }


  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "ADMIN" | "HR" | "EMPLOYEE"
  >("EMPLOYEE");

  const handleRegister = async() => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", selectedRole);


    try {
        console.log(`${import.meta.env.VITE_API_URL}`);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{
            username:username,
            email:email,
            password:password,
            role:selectedRole,
        })
        console.log("api response",response);

        toast.success(response?.data?.message)

         navigate("/login");


    } catch (error) {
     console.log(error);
        
        
    }

  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--color-bg)]">

      {/* Background */}
      <img
        src={bg_img}
        className="absolute inset-0 w-full h-full object-cover lg:hidden md:hidden"
      />
      <img
        src={bg_genicMinds}
        className="hidden absolute inset-0 w-full h-full object-cover md:block lg:block"
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/10"></div> */}

      {/* Register Card */}
      <div className="relative w-full max-w-sm p-2 md:max-w-md">

        {/* Logo */}
        <img src={logo} className="w-44 mx-auto mb-6" />

        <h2 className="text-3xl font-semibold text-center text-[var(--color-secondary)] mb-6">
          Register
        </h2>

        <form className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="user"
              className="flex items-center gap-2 text-[var(--color-secondary)] mb-1 text-xs"
            >
              <CiUser />
              Username
            </label>

            <input
              type="text"
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border  border-[var(--color-accent)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-[var(--color-secondary)] mb-1 text-xs"
            >
              <MdEmail />
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border  border-[var(--color-accent)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="pass"
              className="flex items-center gap-2 text-[var(--color-secondary)] mb-1 text-xs"
            >
              <IoMdKey />
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border  border-[var(--color-accent)] rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Role Buttons */}
          <div>
            <label className="text-[var(--color-secondary)] mb-2 text-xs block">
              Select Role
            </label>

            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole("ADMIN")}
                className={`w-full py-2 rounded-lg text-sm font-medium border transition ${
                  selectedRole === "ADMIN"
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white text-[var(--color-secondary)] border-[var(--color-accent)]"
                }`}
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("HR")}
                className={`w-full py-2 rounded-lg text-sm font-medium border transition ${
                  selectedRole === "HR"
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white text-[var(--color-secondary)] border-[var(--color-accent)]"
                }`}
              >
                HR
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("EMPLOYEE")}
                className={`w-full py-2 rounded-lg text-sm font-medium border transition ${
                  selectedRole === "EMPLOYEE"
                    ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]"
                    : "bg-white text-[var(--color-secondary)] border-[var(--color-accent)]"
                }`}
              >
                Employee
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2 rounded-lg font-medium transition shadow-md"
          >
            Register
          </button>

          {/* Login Link */}
          <Link to="/login">
            <p className="text-[var(--color-primary)] text-center hover:underline mt-4">
              Already have an account? Login
            </p>
          </Link>

          <p className="text-sm text-[var(--color-secondary)] text-center pt-2">
            © 2024 - 2026 GenicMinds. All rights reserved.
          </p>

        </form>
      </div>
    </div>
  );
}
