//import Image from "next/image";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

type EventItemProps = {
    eventitem:{
        id: number;
        eventName: string;
        category: string;
        image: string;
        date: string;
        timings: string;
        venue: string;
        teamSize: string;
        registrationFee: string;
        prize: string;
        facultyCoordinator: string;
        facultyCoordinatorNo: string;
        studentCoordinator: string;
        studentCoordinatorNo: string;
        day: number[];   
    };
};

const EventItem = ({ eventitem }: EventItemProps) => {
    const { id, eventName, image, timings, date, venue } = eventitem;

    return (
        <Link href={`/event/${id}`}>
            <div className="m-2 flex flex-col items-center text-center">
                <img src={image} alt={eventName} width={200} height={100} className="mx-auto rounded-lg" />
                <h1 className="text-lg font-bold mt-2">{eventName}</h1>
                
                <div className="flex items-center gap-2 mt-1">
                    <MdAccessTimeFilled className="text-blue-500" />
                    <p className="text-gray-700">{timings}</p>
                </div>
                <p>{date}</p>
                <div className="flex items-center gap-2 mt-1">
                    <IoLocationSharp className="text-red-500" />
                    <p className="text-gray-700">{venue}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventItem;
