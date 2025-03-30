'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  // How can we get the filter searchParams from the client component back to the url so that the server component(cabins page) can use it

  const searchParams = useSearchParams();
  const router = useRouter(); // ensure you are importing useRouter from next/navigation not from next/router
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams); // this is an api built into the browsers, not to react or next
    params.set('capacity', filter); // this does set the params internally,but it does not appear in the url and for that we need another next hook, useRouter and replace the url
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }


  return (
    <div className="flex border border-primary-700">
      <Button
        filter='all'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >All cabins
      </Button>
      <Button
        filter='small'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >1&mdash;3 guests
      </Button>
      <Button
        filter='medium'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >4&mdash;7 guests
      </Button>
      <Button
        filter='large'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >8&mdash;12 guests
      </Button>
    </div>);
}

function Button({ children, filter, handleFilter, activeFilter }) {
  return <button
    className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''}`}
    onClick={() => handleFilter(filter)}>
    {children}
  </button>;
}

export default Filter;
