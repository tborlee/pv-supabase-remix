import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta, Outlet,
  Scripts,
  ScrollRestoration, useLoaderData, useRevalidator,
} from "@remix-run/react";

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import app from "./app.css";
import Header from "~/components/Header";
import { json } from "@remix-run/node";
import { createBrowserClient, createServerClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/database.types";
import {useEffect, useState} from "react";
import * as process from "process";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: bootstrap},
  {rel: "stylesheet", href: app}
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }

  const response = new Response()

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    request,
    response,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    }
  )
}

export default function Root() {
  const { env, session } = useLoaderData<typeof loader>()
  const { revalidate } = useRevalidator()

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  )

  const serverAccessToken = session?.access_token

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== 'INITIAL_SESSION' && session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, revalidate])
  
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <main className="container">
      <Outlet context={{ supabase, session, env }} />
      <ScrollRestoration/>
      <Scripts/>
      <LiveReload/>
    </main>
    </body>
    </html>
  )
}
