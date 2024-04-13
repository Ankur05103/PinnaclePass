import { useEffect, useState } from "react";
import "../styles/Login.css";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword,setCnfpassword] = useState("");
  const [mobile, setMobile] = useState("");
  const { login, error: Loginerror, isLoading: LoginisLoading } = useLogin();
  const {
    signup,
    error: Signuperror,
    isLoading: SignupisLoading,
  } = useSignup();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(Loginerror);
    if (user) {
      navigate(-1);
      toast.success("Login/Signup Successful");
    } else {
      if (LoginisLoading === false && Loginerror) {
        toast.error(Loginerror);
      } else if (LoginisLoading === false) {
        toast.error("Login Failed - Unknown reason");
      } else if (SignupisLoading === false && Signuperror) {
        toast.error(Signuperror);
      }
    }
  }, [user, Loginerror, Signuperror]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    console.log("LoginisLoading - ", LoginisLoading);
    console.log("LoginError - ", Loginerror);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, mobile,cnfpassword);

    console.log("SignupisLoading - ", SignupisLoading);
    console.log("SignupError - ", Signuperror);
  };

  return (
    <div class="loginsignuppage">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="signup">
        <form
          className="signup-form"
          id="signup1"
          onSubmit={handleSignupSubmit}
        >
          <label for="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            placeholder="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Mobile Number"
            type="mobile"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="text"
            placeholder="Confirm Password"
            onChange={(e) => setCnfpassword(e.target.value)}
            value={cnfpassword}
          />
          <button disabled={SignupisLoading}>Sign up</button>
        </form>
      </div>

      <div class="login">
        <form className="signup-form" id="signup2" onSubmit={handleLoginSubmit}>
          <label for="chk" aria-hidden="true">
            Login
          </label>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button disabled={LoginisLoading}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
