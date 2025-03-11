import { AiOutlineClear } from "react-icons/ai";

// CategoryItem Component
type CategoryItemProps = {
    categoryitem: {
        id: string;
        name: string;
        icon: string;
    };
    onCategorySelect: (category: string) => void;
    currentCategory: string;
    clearSelection: () => void;
};

const CategoryItem = ({ categoryitem, onCategorySelect, currentCategory, clearSelection }: CategoryItemProps) => {
    const { name, icon } = categoryitem;

    const handleCategoryClick = (e: React.MouseEvent) => {
        if (currentCategory === name) {
            e.stopPropagation();  // Prevent triggering onCategorySelect when "Clear" is clicked
            clearSelection();  // Clear selection if the current category is selected
        } else {
            onCategorySelect(name);  // Otherwise, select the category
        }
    };

    return (
        <div
            className="flex flex-col items-center text-center cursor-pointer"
            onClick={handleCategoryClick}  // Use the new click handler
        >
            {currentCategory === name ? (
                <AiOutlineClear fontSize={50} onClick={clearSelection} />
            ) : (
                <img src={icon} alt={name} width={50} height={50} />
            )}
            <p className="text-sm font-medium">{currentCategory === name ? "Clear" : name}</p>
            {/* <img src={icon} alt={name} width={50} height={50} />
            <p className="text-sm font-medium">{name}</p> */}
        </div>
    );
};

export default CategoryItem;
