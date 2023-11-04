import type { Session } from "@supabase/gotrue-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/database.types";
import { useOutletContext } from "react-router";
import { Link } from "@remix-run/react";

export default function UserHeader() {
  const { supabase, session, env } = useOutletContext<{
    supabase: SupabaseClient<Database>;
    session: Session;
    env: { [key: string]: string };
  }>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session && session.user) {
    return (
      <>
        Hello {session.user.email}
        <button
          className="btn btn-sm btn-light text-dark me-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </>
    );
  } else {
    return (
      <Link to="/login" className="btn btn-sm btn-outline-primary me-2">
        Login
      </Link>
    );
  }
}
