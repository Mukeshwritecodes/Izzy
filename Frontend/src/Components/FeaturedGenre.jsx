import Fantasy from "../Assets/Images/Fantasy.png";
import Mystery from "../Assets/Images/Mystery.png";
import Horror from "../Assets/Images/Horror.png";
import Romance from "../Assets/Images/Romance.png";
import SciFi from "../Assets/Images/Sci-Fi.png";

const FeaturedGenre = () => {
  const genres = [
    { name: "Fantasy", image: Fantasy },
    { name: "Horror", image: Horror },
    { name: "Mystery", image: Mystery },
    { name: "Romance", image: Romance },
    { name: "Sci-Fi", image: SciFi },
  ];

  return (
    <>
      <h2 className="text-[16px] sm:text-[24px] md:text-[32px] py-4 px-2 sm:px-10 lg:px-12 font-semibold" style={{ fontFamily: "jura, sans-serif" }}>
        Featured Genres
      </h2>
      <hr className="border-b border-gray-300" />
      <div className="flex flex-nowrap gap-4 py-4 hide-scrollbar sm:py-8 overflow-x-auto overflow-y-hidden sm:gap-10 px-2 sm:px-10 lg:px-12">
        {genres.map((genre) => (
          <div key={genre.name} className="w-24 sm:w-40 md:w-60 flex-none hover:cursor-pointer">
            <img src={genre.image} alt={genre.name} />
            <h3 className="py-2 text-center text-[12px] sm:text-[20px] md:text-[24px]" style={{ fontFamily: "jura, sans-serif" }}>
              {genre.name}
            </h3>
          </div>
        ))}
      </div>
      <hr className="border-b border-gray-300  py-2" />
    </>
  );
};

export default FeaturedGenre;
