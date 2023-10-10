import { json } from "@remix-run/node";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import type { Database } from "~/database.types";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import leaflet from "leaflet/dist/leaflet.css";
import WalksContainer from "~/components/walks/WalksContainer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: leaflet },
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

  const response = new Response();
  const supabaseClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response },
  );

  const { data: walks } = await supabaseClient
    .from("walks")
    .select()
    .eq("date", params.date);

  return json(
    { walks },
    {
      headers: response.headers,
    },
  );
};

export default function WalkDate() {
  const { walks } = useLoaderData<typeof loader>();

  return <WalksContainer walks={walks} />;
}
