import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname;

    return (
        <div className="relative">
            <Navbar className="border-b-2">
                <Link
                    to="/"
                    className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
                >
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                        Finance
                    </span>
                    Manager
                </Link>

                <form className="flex items-center">
                    <TextInput
                        type="text"
                        placeholder="Search..."
                        rightIcon={AiOutlineSearch}
                        className="hidden lg:inline"
                    />
                    <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                        <AiOutlineSearch />
                    </Button>
                </form>

                <div className="flex gap-2 md:order-2">
                    <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                        <FaMoon />
                    </Button>
                    <Link to="/login">
                        <Button gradientDuoTone="purpleToBlue" outline>
                            Log In
                        </Button>
                    </Link>
                </div>

                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={"div"}>
                        <Link to="/">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/Head"} as={"div"}>
                        <Link to="/Head">Head-Page</Link>
                    </Navbar.Link>
                    
                    <Navbar.Link active={path === "/budget"} as={"div"}>
                        <Link to="/budget">Budgets</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/transaction"} as={"div"}>
                        <Link to="/transaction">Transactions</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/fund"} as={"div"}>
                        <Link to="/fund">Fund</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/Committe"} as={"div"}>
                        <Link to="/Committe">Committes</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/user"} as={"div"}>
                        <Link to="/user">User page</Link>
                    </Navbar.Link>
                   
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
