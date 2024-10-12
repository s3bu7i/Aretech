import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGFkbWluLmRldiIsImlhdCI6MTcyNjMyODMxMiwiZXhwIjoxNzI2MzMwMTEyfQ.viPsrBWdApFsMWhWgrccpt39Hf9MJu5uCI9hkkHVnl8';

  const res = await fetch("http://localhost:3000/api/v1/loyalty/partners/1",
    {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return json(await res.json());
}

export default function Partners() {
  const partners = useLoaderData<typeof loader>();
  return (
    <ul>
      asdfjasdflkasd
      {JSON.stringify(partners)}
      {/* {partners.map((partner: any) => (
        <div>
          {JSON.stringify(partner)}
        </div>
      ))} */}
    </ul>
  );
}
