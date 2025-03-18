//import Image from "next/image";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import {BsCalendar2EventFill} from "react-icons/bs";

type EventItemProps = {
    eventitem:{
        id?: number;
        eventId: string;
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
    const { eventId, eventName, image, timings, date, venue } = eventitem;

    return (
        <Link href={`/event/${eventId}`}>
            <div className="m-3 p-2 flex flex-col items-center text-center w-[300px]">
                <img src={image} alt={eventName} width={250} height={100} className="mx-auto rounded-lg" />
                <h1 className="text-lg font-bold mt-2">{eventName}</h1>
                
                {timings?
                <div className="flex items-center gap-2 mt-1">
                    <MdAccessTimeFilled className="text-blue-500" />
                    <p className="text-gray-700">{timings}</p>
                </div>:null}

                {date?
                <div className="flex items-center gap-2 mt-1">
                    <BsCalendar2EventFill/>
                    <p>{date}</p>
                </div>:null}

                {venue?
                <div className="flex items-center gap-2 mt-1">
                    <IoLocationSharp className="text-red-500" />
                    <p className="text-gray-700">{venue}</p>
                </div>:null}
            </div>
        </Link>
    );
};

export default EventItem;
