import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-6">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="bg-white rounded-lg border p-5 shadow-sm">
            <Skeleton height={20} width="60%" />
            <Skeleton height={15} width="40%" className="mt-2" />
            <Skeleton height={25} width="30%" className="mt-4" />
          </div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;