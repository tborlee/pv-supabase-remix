import { json } from "@remix-run/node";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { createSupabaseClient } from "~/utils/supabase.server";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import leaflet from "leaflet/dist/leaflet.css";
import map from "~/styles/map.css";
import WalksContainer from "~/components/walks/WalksContainer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: leaflet },
  { rel: "stylesheet", href: map },
];

export const meta: MetaFunction = () => {
  return [{ title: "Marches ADEPS" }];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const date = Date.parse(params.date || "");

  if (!params.date || isNaN(date)) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const { supabase, headers } = createSupabaseClient(request);

  const { data: walks } = await supabase
    .from("walks")
    .select()
    .eq("date", params.date);

  return json(
    { walks },
    {
      headers,
    },
  );
};

export default function WalkDate() {
  const { walks } = useLoaderData<typeof loader>();

  return <WalksContainer walks={walks} />;
}
