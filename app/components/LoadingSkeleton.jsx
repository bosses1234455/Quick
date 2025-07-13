// components/LoadingSkeleton.js
export const LoadingSkeleton = ({ count = 1 }) => {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse flex gap-4">
            <div className="w-64 h-40 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded-full w-16"></div>
                <div className="h-4 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded-full w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };