import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";

import leaflet from "leaflet/dist/leaflet.css";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/database.types";
import WalksContainer from "~/components/walks/WalksContainer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: leaflet },
];

export const meta: MetaFunction = () => {
  return [{ title: "Marches ADEPS" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response },
  );

  const { data: walks } = await supabaseClient.from("next_walks").select();

  return json(
    { walks },
    {
      headers: response.headers,
    },
  );
};

export default function Index() {
  const { walks } = useLoaderData<typeof loader>();

  return <WalksContainer walks={walks} />;
}
