'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); //get the search params from the URL
  const pathname = usePathname(); //get the current pathname
  const { replace } = useRouter(); //get the replace function from the router
  
  const handleSearch = useDebouncedCallback ((term: string) => { //use the useDebouncedCallback hook to debounce the search
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams); //create a new URLSearchParams object
    params.set('page', '1'); //set the page param to 1
    if (term) {
      params.set('query', term); //set the query param to the search term
    } else {
      params.delete('query'); //remove the query param if the search term is empty
    }
    replace(`${pathname}?${params.toString()}`); //replace the current URL with the new URL
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}//set the default value to the query param
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
