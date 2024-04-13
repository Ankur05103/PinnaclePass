// import { useState } from "react"
// import "../styles/Login.css"
// import { useSignup } from "../hooks/useSignup"

// const Signup = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [mobile, setMobile] = useState('')
//   const {signup,error,isLoading} = useSignup()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // console.log(email, password)
//     await signup(email,password,mobile)
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

// export default Signup