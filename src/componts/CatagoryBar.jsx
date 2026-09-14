function CategoryBar({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-button selected"
              : "category-button"
          }
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
