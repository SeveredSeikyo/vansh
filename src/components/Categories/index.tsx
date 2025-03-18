import CategoryItem from "../CategoryItem";
import Slider from 'react-slick';

const categories = [
    { id: "1", name: "Concerts", icon: "/concerts-icon.jpg" },
    { id: "2", name: "Cultural", icon: "/cultural.jpg" },
    { id: "3", name: "Arts", icon: "/arts-icon.jpg" },
    { id: "4", name: "Tech", icon: "/tech-icon.jpg" },
    { id: "5", name: "Esports", icon: "/esports-icon.jpg" },
    { id: "6", name: "Spotlight", icon: "/spotlight.jpg" },
    { id: "7", name: "Literary", icon: "/literary.jpg" },
];

type CategoryProps = {
    onCategorySelect: (category: string) => void;
    currentCategory: string;
    clearSelection: () => void;
};

const settings = {
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false, 
    afterChange: (index: number) => {
        console.log(`Slider changed to: ${index + 1}`);
    },
};

const Categories = ({ onCategorySelect, currentCategory, clearSelection }: CategoryProps) => {
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {categories.map((item) => (
                    <div key={item.id}> {/* Each item should be a direct child of Slider */}
                        <CategoryItem
                            categoryitem={item}
                            currentCategory={currentCategory}
                            clearSelection={clearSelection}
                            onCategorySelect={onCategorySelect}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Categories;
