import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../public/Genicminds-logo.png";
// import hr_image from "../../public/hr_online_1.jpg";
import card_img from "../../public/card_img.jpg";
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] =
    useState<"ADMIN" | "HR" | "EMPLOYEE">("EMPLOYEE");

  const validate = () => {
    const newErrors = { username: "", email: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Minimum 3 characters required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter valid email address";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "8+ chars, uppercase, lowercase, number & special character";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { username, email, password, role: selectedRole }
      );

      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full  h-screen flex items-center justify-center px-4 py-6
                  ">

      {/* 🔥 PARENT CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* LEFT SIDE IMAGE DIV */}
        <div className="hidden lg:block lg:w-1/2 relative p-4">
          <img
            src={card_img}
            alt="HR Management"
            className="w-full h-full object-scale-down"
          />
          {/* <div className="absolute inset-0 bg-[var(--color-secondary)]/40"></div> */}
        </div>

        {/* RIGHT SIDE FORM DIV */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 border-l  border-gray-300">

          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Company Logo"
                className="w-40 object-contain drop-shadow-md"
              />
            </div>

            <h2 className="text-2xl font-semibold text-center text-[var(--color-secondary)] mb-6">
              Create Your HRMS Account
            </h2>

            <form className="space-y-5">

              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-[var(--color-secondary)] text-sm mb-1">
                  <CiUser /> Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full border border-[var(--color-accent)] rounded-xl px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                             transition-all duration-300"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-[var(--color-secondary)] text-sm mb-1">
                  <MdEmail /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full border border-[var(--color-accent)] rounded-xl px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                             transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-[var(--color-secondary)] text-sm mb-1">
                  <IoMdKey /> Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border border-[var(--color-accent)] rounded-xl px-4 py-2 pr-10
                               focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                               transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="text-[var(--color-secondary)] text-sm block mb-2">
                  Select Role
                </label>

                <div className="flex gap-2">
                  {["ADMIN", "HR", "EMPLOYEE"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        setSelectedRole(role as "ADMIN" | "HR" | "EMPLOYEE")
                      }
                      className={`w-full py-2 rounded-xl text-sm font-medium border transition-all
                      ${
                        selectedRole === role
                          ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)] shadow-md"
                          : "bg-white text-[var(--color-secondary)] border-[var(--color-accent)] hover:bg-[var(--color-accent)]/20"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Register Button */}
              <button
                type="button"
                onClick={handleRegister}
                className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary-dark)]
                           text-white py-3 rounded-xl font-semibold
                           transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Register
              </button>

              <Link to="/login">
                <p className="text-[var(--color-primary)] text-center hover:underline mt-4 text-sm">
                  Already have an account? Login
                </p>
              </Link>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}