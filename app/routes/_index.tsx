import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";

import leaflet from "leaflet/dist/leaflet.css";
import map from "~/styles/map.css";
import { createSupabaseClient } from "~/utils/supabase.server";
import WalksContainer from "~/components/walks/WalksContainer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: leaflet },
  { rel: "stylesheet", href: map },
];

export const meta: MetaFunction = () => {
  return [{ title: "Marches ADEPS" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = createSupabaseClient(request);

  const { data: walks } = await supabase.from("next_walks").select();

  return json(
    { walks },
    {
      headers,
    },
  );
};

export default function Index() {
  const { walks } = useLoaderData<typeof loader>();

  return <WalksContainer walks={walks} />;
}
