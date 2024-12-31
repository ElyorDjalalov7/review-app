export const LoadingSkeleton = ({ take }: { take: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(take)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 space-y-4"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
