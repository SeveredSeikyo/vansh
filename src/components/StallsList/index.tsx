import StallItem from "../StallItem";

type StallListProps = {
    stallslist: Array<{
        id: string;
        title: string;
        time: string;
        day:string,
        location: string;
        image: string;
    }>;
};

const StallsList = ({ stallslist }: StallListProps) => {
    return (
        <div className="flex flex-wrap justify-evenly p-2">
            {stallslist.map((stallitem) => (
                <StallItem key={stallitem.id} stallitem={stallitem} />
            ))}
        </div>
    );
};

export default StallsList;
