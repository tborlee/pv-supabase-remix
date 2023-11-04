import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createSupabaseClient } from "~/utils/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseClient(request);

  const { error } = await supabase.auth.signOut();

  if (error) {
    return json(
      { message: "Cannot log out:" + error.message },
      { status: error.status },
    );
  } else {
    return redirect("/", {
      headers,
    });
  }
};
