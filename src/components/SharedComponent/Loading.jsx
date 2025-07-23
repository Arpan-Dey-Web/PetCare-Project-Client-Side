import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className="w-11/12 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto p-4 space-y-6">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
        >
          {/* Thumbnail */}
          <Skeleton height={200} borderRadius={12} />

          {/* Info Section */}
          <div className="flex gap-4">
            {/* Avatar */}
            <Skeleton circle width={50} height={50} />

            {/* Title + Subtitle */}
            <div className="flex-1 space-y-2">
              <Skeleton height={20} width="80%" />
              <Skeleton height={14} width="60%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
