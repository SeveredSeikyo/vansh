import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
    return (
        <Link href="/">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md py-3 flex justify-between items-center px-4">
                <h1 className="text-lg font-bold">Vansh</h1>
                <IoIosNotifications fontSize={25} />
            </div>
        </Link>
    );
};

export default Header;
