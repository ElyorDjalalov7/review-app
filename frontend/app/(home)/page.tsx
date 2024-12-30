import { Suspense } from "react";
import Cards from "./_components/Cards";

export default function DashboardPage() {
  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <Suspense fallback={<LoadingState />}>
        <Cards />
      </Suspense>
    </div>
  );
}

const LoadingState = () => {
  return <div className="w-full h-full">Loading ...</div>;
};
