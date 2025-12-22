import { FaStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  return (
    <div className="flex gap-1 text-warning">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "opacity-100" : "opacity-30"}
        />
      ))}
    </div>
  );
};

export default Rating;
