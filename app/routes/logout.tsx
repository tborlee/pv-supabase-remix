import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createSupabaseClient } from "~/utils/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseClient(request);

  const result = await supabase.auth.signOut();

  if (result.error) {
    return json(
      { message: "Cannot log out:" + result.error.message },
      { status: result.error.status },
    );
  } else {
    return redirect("/", {
      headers,
    });
  }
};
