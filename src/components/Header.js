import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const router = useRouter();
  const { user, logoutUser } = useUser(); // Access the user object from the context

  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/logout");
      const result = await response.json();
      
      alert(result.msg);
      logoutUser();
      router.push('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <header className="text-gray-600 body-font fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="macrosHUB.jpeg"
            className="w-10 h-10 text-white bg-indigo-500 rounded-full object-fill"
          />
          <span className="ml-3 text-xl">MacrosHUB</span>
        </a>
        
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link href="/home" className="mr-5 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/calculate-macros" className="mr-5 hover:text-gray-900">
            Calculate Macros
          </Link>
          <Link href="/bmi" className="mr-5 hover:text-gray-900">
            BMI
          </Link>
          <Link href="/workout" className="mr-5 hover:text-gray-900">
            Track Workouts
          </Link>
        </nav>
        {user && (
          <div className="mr-4 text-lg text-gray-700">
            Welcome, {user.name}
          </div>
        )}
        <button
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          onClick={logoutHandler}
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
