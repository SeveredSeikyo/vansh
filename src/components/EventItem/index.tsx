//import Image from "next/image";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

type EventItemProps = {
    eventitem: {
        id: string;
        title: string;
        time: string;
        day: string;
        location: string;
        image: string;
    };
};

const EventItem = ({ eventitem }: EventItemProps) => {
    const { id,title, time,day, location, image } = eventitem;

    return (
        <Link href={`/event/${id}`}>
            <div className="m-2 flex flex-col items-center text-center">
                <img src={image} alt={title} width={200} height={100} className="mx-auto rounded-lg" />
                <h1 className="text-lg font-bold mt-2">{title}</h1>
                
                <div className="flex items-center gap-2 mt-1">
                    <MdAccessTimeFilled className="text-blue-500" />
                    <p className="text-gray-700">{time}</p>
                </div>
                <p>{day}</p>
                <div className="flex items-center gap-2 mt-1">
                    <IoLocationSharp className="text-red-500" />
                    <p className="text-gray-700">{location}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventItem;
