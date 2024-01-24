import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUser } from "@/context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const router = useRouter();
  const { loginUser } = useUser();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        // Successful login, extract user data from the response
        const userData = await response.json();

        // Set the user context with the received user data
        loginUser(userData.user);
        
        console.log('Login Successfully');
        router.push("/home");
      } else {
        // Handle other status codes or error messages if needed
        const res = await response.json();
        setError(res.msg);
        console.log("Login failed");
      }
    } catch (error) {
      // Handle any errors during the login request
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex py-10">

          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="mb-6">
              <h3>Don't have an Account? <span className="text-blue-900">
                <Link href="/signup">
                  Sign Up
                </Link>
              </span> </h3>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default Login