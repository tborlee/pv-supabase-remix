import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSupabaseClient } from "../utils/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseClient(request);

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: "Cannot log out:" + error.message };
  } else {
    return redirect("/", {
      headers,
    });
  }
};
