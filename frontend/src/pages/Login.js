import { useState } from "react"
import '../styles/Login.css'
import { useLogin } from "../hooks/useLogin"
import { useSignup } from "../hooks/useSignup"

// const Signup = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [mobile, setMobile] = useState('')
//   const {signup,error,isLoading} = useSignup()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // console.log(email, password)
//     await signup(email, password,mobile)
//   }

//   return (
//     <form className="login" onSubmit={handleSubmit}>
//       <h2>Sign Up</h2>
      
//       <label>Email address:</label>
//       <input 
//         type="email" 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//       />
//       <label>Password:</label>
//       <input 
//         type="password" 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//       />

//       <button disabled={isLoading}>Sign up</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   )
// }

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const {login,error: Loginerror,isLoading: LoginisLoading} = useLogin()
  const {signup,error: Signuperror,isLoading: SignupisLoading} = useSignup()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    // console.log(email, password)
    await login(email,password)
  }

  const handleSignupSubmit = async (e) => {
        e.preventDefault()
    
        // console.log(email, password)
        await signup(email,password,mobile)
      }

  return (
    // <form className="login" onSubmit={handleSubmit}>
    //   <h2>Log In</h2>
      
    //   <label>Email address:</label>
    //   <input 
    //     type="email" 
    //     onChange={(e) => setEmail(e.target.value)} 
    //     value={email} 
    //   />
    //   <label>Password:</label>
    //   <input 
    //     type="password" 
    //     onChange={(e) => setPassword(e.target.value)} 
    //     value={password} 
    //   />

    //   <button disabled={isLoading}>Log in</button>
    //   {error && <div className="error">{error}</div>}
    // </form>

    // <div></div>

    <div class="loginsignuppage">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="signup">
				<form className="signup-form" id="signup1" onSubmit={handleSignupSubmit}>
					<label for="chk" aria-hidden="true">Sign up</label>
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
          <input type="password" name="cpswd" placeholder="Confirm Password" required=""/>
					<button disabled={SignupisLoading}>Sign up</button>
				</form>
        <div>{Signuperror && <div className="error">{Signuperror}</div>} </div>
			</div>

			<div class="login">
				<form className="signup-form" id="signup2" onSubmit={handleLoginSubmit}>
					<label for="chk" aria-hidden="true">Login</label>
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
					<button disabled={LoginisLoading} >Login</button>
          
          {/* <div className="error">{error}</div> */}
				</form>
        <div>{Loginerror && <div className="error">{Loginerror} </div>} </div>

			</div>
      
	</div>
  )
}

export default Login