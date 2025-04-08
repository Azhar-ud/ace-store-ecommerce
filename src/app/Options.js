export default function Options({ setCategory, setSort, type }) {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <>
      <div className="flex justify-between p-6  ">
        <div className="">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border border-black rounded-md "
          >
            <option value="All">Category</option>
            {type.map((item) => {
              return (
                <option key={item} value={item} onChange={handleCategoryChange}>
                  {item === "men's clothing"
                    ? "Men"
                    : item === "women's clothing"
                    ? "Women"
                    : item === "electronics"
                    ? "Electronics"
                    : "Jewelery"}
                </option>
              );
            })}
          </select>
        </div>
        <div className="">
          <select
            className="border border-black rounded-md "
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={"all"}>Sort</option>
            <option value={"desc"}> High to Low</option>
            <option value={"asc"}> Low to High</option>
          </select>
        </div>
      </div>
    </>
  );
}
