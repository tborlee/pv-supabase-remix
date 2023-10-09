import type {LinksFunction, LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import WalkCard from "~/components/walks/WalkCard";
import {ClientOnly} from "~/components/walks/client-only";
import {Map} from "~/components/walks/map.client";
import React from "react";

import leaflet from "leaflet/dist/leaflet.css";
import {createServerClient} from "@supabase/auth-helpers-remix";
import Header from "~/components/Header";
import type {Database, DbResult} from "~/database.types";
import {useOutletContext} from "react-router";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Session} from "@supabase/gotrue-js";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: leaflet}
];

export const meta: MetaFunction = () => {
  return [
    {title: "Marche ADEPS"},
  ];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const response = new Response()
  const supabaseClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {request, response}
  )
  
  const query = supabaseClient.from("walks").select().eq("date", "2023-10-08");
  const { data: walks }: DbResult<typeof query> = await query;

  return json({ walks }, {
    headers: response.headers,
  })
}

export default function Index() {
  const { supabase, session } = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session }>()
  const { walks } = useLoaderData<typeof loader>()

  if (!walks) {
    return <div>no walks.</div>
  }

  return (
    <>
      <Header supabase={supabase} session={session}/>
      <ClientOnly
        fallback={
          <div className="d-flex justify-content-center align-items-center leaflet-container">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        {() => <Map walks={walks}/>}
      </ClientOnly>
      {walks.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </>
  )
}