import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full max-w-max mx-auto mt-16 mb-8">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/">PrepPal</Link>
        </li>
        <li>
          <ul className="flex justify-center items-center gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Collection</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Donate</Link>
            </li>
          </ul>
        </li>
        <li>Register</li>
      </ul>
    </nav>
  );
};

export default Navbar;
