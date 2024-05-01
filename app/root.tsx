import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { json } from "@remix-run/node";
import { createSupabaseClient } from "~/utils/supabase.server";
import type { Database } from "~/database.types";
import { useState } from "react";
import * as process from "process";
import { createBrowserClient } from "@supabase/ssr";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: bootstrap },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    AUTH_REDIRECT_URL: process.env.AUTH_REDIRECT_URL!,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN!,
    MAPBOX_USERNAME: process.env.MAPBOX_USERNAME!,
    MAPBOX_STYLE: process.env.MAPBOX_STYLE!,
  };

  const { supabase, headers } = createSupabaseClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: dates } = await supabase.from("distinct_walk_dates").select();

  return json({ env, user, dates }, { headers });
};

export default function Root() {
  const { env, user, dates } = useLoaderData<typeof loader>();

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY),
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container">
          <Outlet context={{ supabase, user, env, dates }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
      </body>
    </html>
  );
}
