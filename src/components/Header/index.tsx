import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md py-3 flex justify-between items-center px-4 pt-5 z-50">
            <Link href="/">
                <h1 className="text-lg font-bold">Vansh</h1>
            </Link>
            <IoIosNotifications fontSize={25} />
        </div>
    );
};

export default Header;
