import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-6"
        aria-busy="true"
        aria-live="polite"
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border p-5 shadow-sm"
          >
            {/* Company */}
            <Skeleton height={20} width="60%" />

            {/* Position */}
            <Skeleton height={15} width="40%" className="mt-2" />

            {/* Status badge */}
            <Skeleton height={25} width="30%" className="mt-4 rounded-full" />

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <Skeleton height={15} width={40} />
              <Skeleton height={15} width={50} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default LoadingSkeleton;