// import { LoaderArgs, ActionArgs } from "@remix-run/node";

import { LoaderFunctionArgs } from "@remix-run/node";

const target = "localhost:3000";

export async function loader({ request }: LoaderFunctionArgs) {
  const newUrl = new URL(request.url);
  newUrl.host = target;

  const newRequest = new Request(newUrl.toString(), new Request(request));
  return await fetch(newRequest);
}
export async function action({ request }: LoaderFunctionArgs) {
  const newUrl = new URL(request.url);
  newUrl.host = target;

  const newRequest = new Request(newUrl.toString(), new Request(request));
  return await fetch(newRequest);
}