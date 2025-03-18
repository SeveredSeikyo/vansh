import CategoryItem from "../CategoryItem";

const categories = [
    { id: "1", name: "Concerts", icon: "/concerts-icon.jpg" },
    { id: "2", name: "Cultural", icon: "/cultural.jpg" },
    { id: "3", name: "Arts", icon: "/arts-icon.jpg" },
    { id: "4", name: "Tech", icon: "/tech-icon.jpg" },
    { id: "5", name: "Esports", icon: "/esports-icon.jpg" },
    { id: "6", name: "Spotlight", icon: "/spotlight.jpg" },
    { id: "7", name: "Literary", icon: "/literary.jpg" },
];

type CategoryProps={
    onCategorySelect: (category: string) => void;
    currentCategory: string;
    clearSelection:()=>void;
}

// Categories Component
const Categories = ({ onCategorySelect,currentCategory,clearSelection }: CategoryProps) => {
    return (
        <div className="flex justify-around overflow-auto">
            {categories.map((item) => (
                <CategoryItem
                    key={item.id}
                    categoryitem={item}
                    currentCategory={currentCategory}
                    clearSelection={clearSelection}
                    onCategorySelect={onCategorySelect}  // Pass the callback
                />
            ))}
        </div>
    );
};

export default Categories;

