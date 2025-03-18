import EventItem from "../EventItem";

type EventListProps = {
    eventslist:Array< {
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
    }>;
};

const EventsList = ({ eventslist }: EventListProps) => {
    return (
        <div className="flex flex-wrap justify-evenly p-2">
            {eventslist.map((eventitem) => (
                <EventItem key={eventitem.id} eventitem={eventitem} />
            ))}
        </div>
    );
};

export default EventsList;
