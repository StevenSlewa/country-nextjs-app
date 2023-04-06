import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <button className="md:mb-20 mb-16 dark:text-lighttext text-darktext dark:bg-darkblue bg-verylightgray  hover:drop-shadow-lg drop-shadow-md px-6 py-2 rounded-md" onClick={handleClick}>
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <p className="ml-2">Back</p>
      </div>
    </button>
  );
}
