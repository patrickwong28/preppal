import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="text-lg w-full max-w-max mx-auto mt-16 mb-8">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/">PrepPal</Link>
        </li>
        <li>
          <ul className="flex justify-center items-center gap-6">
            <li className="hover:bg-gray-200 transition-color duration-300 rounded-3xl p-2">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:bg-gray-200 transition-color duration-300 rounded-3xl p-2">
              <Link href="/collection">Collection</Link>
            </li>
            <li className="hover:bg-gray-200 transition-color duration-300 rounded-3xl p-2">
              <Link href="/">About</Link>
            </li>
            <li className="hover:bg-gray-200 transition-color duration-300 rounded-3xl p-2">
              <Link href="/">Donate</Link>
            </li>
          </ul>
        </li>
        <li>
          <SignedOut>
            <SignInButton>
              <button className="text-md bg-text text-background hover:bg-stone-700 transition-color duration-200 rounded-lg px-2 py-1">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <UserButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
