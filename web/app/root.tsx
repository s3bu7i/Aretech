import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Result from "./components/Scan/Result";

import IReceiptData from "~/types/IReceiptData";

import { Toaster } from 'sonner'

import "./tailwind.css";
import { useBalanceStore } from "~/lib/store";
import { jwtDecode } from "jwt-decode";
import { cn } from "./lib/utils";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  return json({
    ENV: {
      API_URL: process.env.API_URL
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [receiptData, setReceiptData] = useState<IReceiptData|null>(null);
  const setBal = useBalanceStore(state => state.setBal);
  const setMemberId = useBalanceStore(state => state.setMemberId);
  const location = useLocation();

  useEffect(() => {
    const tk = localStorage.getItem("accessToken");
    if (tk) {
      const decoded = jwtDecode(tk);

      // @ts-ignore
      setMemberId(decoded.id);

      console.log("DECODING");
      
      // @ts-ignore
      fetch(window.ENV.API_URL + `/api/v1/loyalty/${decoded.id}/points`, {
        method: "GET",
        headers: {
          'Authorization': "Bearer " + tk
        }
      }).then((res) => res.json()).then((res) => {
        setBal(res.balance);
      });
    }
  }, [receiptData]);

  // console.log("location.pathname", location.pathname);
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen items-center justify-center relative">
        <Toaster position="top-right" richColors={true} className="z-[9999]" />
        <div className="flex flex-col md:hidden w-full h-full">
          <Header />
          {receiptData ? <Result className="min-h-full flex-1 overflow-auto" receiptData={receiptData} onClose={() => setReceiptData(null)} /> : 
          <div className={cn("flex-1 overflow-auto py-4", {
            "px-8": location.pathname !== "/history"
          })}>
            {children}
          </div>
            }
          <Footer onScan={(receiptData) => setReceiptData(receiptData)} />
        </div>
        <div className="hidden md:flex flex-col text-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">EcoRewards</h1>
          This site is designed for mobile devices only. Please visit from a mobile device to view this content.
        </div>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
