import { Suspense } from 'react';

import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';

import { getCabin, getCabins } from "@/app/_lib/data-service";

// export const metadata = {
//   title: 'Cabin'
// };

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);

  return { title: `Cabin ${cabin.name}` };
}

// SSG vs Dynamic Rendering
// The default rendering for nextjs is static SSG and it is only Next.js that determines whether our pages should be rendered as static or dynamic. NB: Next.js dynamically renders pages with params, searchParams, cookies and headers

//! However, we can tell Next.js to render dynamic pages as static
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map(cabin => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div >
  );
}
