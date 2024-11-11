import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux"
import * as actions from "../../store/actions"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { path } from "../../ultils/containts";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";

const SignInModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch()
  const navigator = useNavigate()

  const emailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value) {
      return "Bắt buộc nhập email";
    }
    if (!emailRegex.test(value)) {
      return "Email không đúng định dạng";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Bắt buộc nhập mật khẩu";
    }
    if (value.length < 8) {
      return "Mật khẩu phải lớn hơn hoặc bằng 8 ký";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setLoading(true);
    // Simulate API call
    const response = await dispatch(actions.login({ email: email, pass_word: password }))
    if (response?.status === 200 && response?.data?.err === 0) {
      setLoading(false)
      // console.log(response?.data?.type)
      switch (response?.data?.type) {
        case 0:
          dispatch(actions.logout())
          break;
        case 1:
          navigator(path.MAIN)
          dispatch(actions.state({ active: path.MAIN, content: "Home" }))
          break;
        case 2:
          navigator(`${path.ADMIN}/${path.HOME}`)
          dispatch(actions.state({ active: path.HOME, content: "Home" }))
          break;
      }
      setIsOpen(false)
      console.log(response)
    } else {
      toast.warn(response?.data?.msg)
      setLoading(false)
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(response?.data);
    setLoading(false);
  };

  return (
    <div>
      <Spinner
        isOpen={loading}  // Show modal when loading is true
        onClose={() => setLoading(false)}  // Close modal when loading is done
        message="Đang đăng nhập..."
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-8 transition-all transform bg-white shadow-2xl rounded-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
              aria-label="Close modal"
            >
              ×
            </button>

            <h2 className="mb-6 text-2xl font-bold text-center">Đăng nhập</h2>

            <div className="mb-6 space-y-4">
              <button
                className="flex items-center justify-center w-full gap-2 p-3 transition-colors border rounded-lg hover:bg-gray-50"
                aria-label="Sign in with Google"
              >
                <FcGoogle className="text-xl" />
                <span>Đăng nhập với Google</span>
              </button>

              <button
                className="flex items-center justify-center w-full gap-2 p-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                aria-label="Sign in with Facebook"
              >
                <FaFacebook className="text-xl" />
                <span>Đăng nhập với Facebook</span>
              </button>

              <button
                className="flex items-center justify-center w-full gap-2 p-3 text-white transition-colors rounded-lg bg-sky-500 hover:bg-sky-600"
                aria-label="Sign in with Twitter"
              >
                <FaTwitter className="text-xl" />
                <span>Đăng nhập với Twitter</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Nhập email của bạn"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  list="email-suggestions"
                />
                <datalist id="email-suggestions">
                  {emailDomains.map((domain) => (
                    <option key={domain} value={email.split("@")[0] + domain} />
                  ))}
                </datalist>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="Nhập mật khẩu của bạn"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-500" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 p-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Sign in with email"
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <span>Đăng nhập</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInModal;
