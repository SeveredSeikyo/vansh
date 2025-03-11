import CategoryItem from "../CategoryItem";

const categories = [
    { id: "1", name: "Concerts", icon: "/concerts-icon.jpg" },
    { id: "2", name: "Sports", icon: "/sports-icon.jpg" },
    { id: "3", name: "Arts", icon: "/arts-icon.jpg" },
    { id: "4", name: "Tech", icon: "/tech-icon.jpg" },
    { id: "5", name: "Esports", icon: "/esports-icon.jpg" },
];

type CategoryProps={
    onCategorySelect: (category: string) => void;
    currentCategory: string;
    clearSelection:()=>void;
}

// Categories Component
const Categories = ({ onCategorySelect,currentCategory,clearSelection }: CategoryProps) => {
    return (
        <div className="flex justify-evenly flex-wrap">
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

