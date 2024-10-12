import React, {useEffect} from "react";
import { useBalanceStore } from "~/lib/store";

function Header() {
  const balance = useBalanceStore((state) => state.balance);

  return (
    <header className="flex justify-between items-center p-4 bg-white text-green-600 border-b border-gray-200 sticky top-0 z-50">
      <Profile className="size-8"/>
      <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">EcoRewards</h1>
      <div className="flex items-center bg-green-100 rounded-full px-3 py-1">
        <CoinStack className="size-4 mr-1"/>
        <span className="text-green-600 font-semibold text-sm">{balance}</span>
      </div>
    </header>
  );
}

export default Header;

const Profile = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const CoinStack = (props: React.HTMLAttributes<SVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);