import { MdAccessTimeFilled } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { getUserDetails } from "@/utils/db";
import { useState, useEffect} from "react";

type LostItemProps = {
    lostitem: {
        id: string;
        name: string;
        location: string;
        time: string;
        status: string;
        user: string;
    };
    onDelete: (id: string) => void;
};

const LostItem = ({ lostitem, onDelete }: LostItemProps) => {
    const [profileUser, setProfileUser] = useState<{ name: string; rollNumber: string; branch: string; year: string }|null>(null);
    console.log(profileUser?.name)
    useEffect(() => {
    if (typeof window !== "undefined") {
        getUserDetails().then((data) => {
        setProfileUser(data);
        });
    }
    }, []);
    const { name, location, time, status, user, id } = lostitem;
    
    return (
        <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${status === "Lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {status}
                </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <IoLocationSharp className="text-blue-500" />
                <p>{location}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MdAccessTimeFilled className="text-gray-500" />
                <p>{time}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">by {user}</p>
                { profileUser?.name===name?(
                <button
                    className="text-red-500"
                    onClick={() => onDelete(id)}
                >
                    <FaTrash />
                </button>):null
                }
            </div>
        </div>
    );
};

export default LostItem;
