import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-job", title: "My Jobs" },
        { path: "/salary", title: "Salary Estimate" },
        { path: "/post-job", title: "Post A Job" }
    ];

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <nav className="flex justify-between items-center py-6">
                <Link to="/" className="flex items-center gap-2 text-2xl text-black">
                    <img className="w-14" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdgAQXFvEkpxHCRKTvAJ8wwFLDBkJlxBEOy-fBiZ_PyBJH82_Prbb1qC5Be73iTbF6IRY&usqp=CAU" alt="Job Portal Logo" />
                    <span>Job Portal</span>
                </Link>

                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                                to={path}
                                className={({ isActive, isPending }) =>
                                    isActive ? "text-blue-500" : isPending ? "text-gray-500" : "text-black"
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                    <Link to="/login" className="py-2 px-5 border rounded">Log in</Link>
                    <Link to="/signup" className="py-2 px-5 border rounded bg-blue text-white">Sign up</Link>
                </div>

                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
                    </button>
                </div>
            </nav>

            {/* Nav items for mobile */}
            <div className={`md:hidden px-4 bg-black py-5 rounded-sm ₹{isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-white py-1">
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    <li className="text-white py-1">
                        <Link to="/login">Log in</Link>
                    </li> 
                    <li className="text-white py-1">
                        <Link to="/signup">Sign up</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
