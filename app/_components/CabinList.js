import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  // component level revalidation(individaull-fetch level - but this time we are getting data from supabase with no fetch at all and we cannot pass the revalidate option, however we can opt out this component with the Nextjs noStore function)
  // noStore(); // this will make our page dynamic again, and so this component will have non-catched data

  const cabins = await getCabins();

  let displayedCabins;
  if (filter === 'all') displayedCabins = cabins;
  if (filter === 'small') displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);

  if (filter === 'medium') displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);

  if (filter === 'large') displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);


  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
