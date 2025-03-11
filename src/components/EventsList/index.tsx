import EventItem from "../EventItem";

type EventListProps = {
    eventslist: Array<{
        id: string;
        title: string;
        time: string;
        day:string,
        location: string;
        image: string;
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
