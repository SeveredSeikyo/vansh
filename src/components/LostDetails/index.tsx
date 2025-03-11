import LostItem from "../LostItem";

type LostItemType = {
    id: string;
    name: string;
    location: string;
    time: string;
    status: string;
    user: string;
};

type LostDetailsProps = {
    lostItems: LostItemType[];
    onDelete: (id: string) => void;
};

const LostDetails = ({ lostItems, onDelete }: LostDetailsProps) => {
    return (
        <div className="space-y-4">
            {lostItems.map((lostitem) => (
                <LostItem key={lostitem.id} lostitem={lostitem} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default LostDetails;
