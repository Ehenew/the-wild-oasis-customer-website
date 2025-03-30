import CabinList from "@/app/_components/CabinList";
import Filter from "@/app/_components/Filter";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import ReservationReminder from "../_components/ReservationReminder";

// In production, all static pages are cached and changes in the remote database could not be reflected to the client b/c of the so-called data cache. But likely for us there is a way to convert the page to dynamic by revalidating the page
// export const revalidate = 0; // and this is all

// However, in most cases our pages does not chang every second, may be some pages will change within a day, an hour or in a month, it depends on the type of the project
export const revalidate = 3600; // exactly 1 hour, however this has no effect as we are using searchParams this page is always dynamic any way

export const metadata = {
  title: 'Cabins'
};

// Server component
export default async function Page({ searchParams }) {
  // searchParams are only availbale to page.js files not on other server components
  // Await searchParams to properly handle its dynamic nature
  const filter = (await searchParams?.capacity) || 'all';

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&opos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>

    </div>
  );
}
