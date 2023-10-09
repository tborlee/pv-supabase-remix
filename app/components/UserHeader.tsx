import type {Session} from "@supabase/gotrue-js";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "~/database.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";

export default function UserHeader({supabase, session}: { supabase: SupabaseClient<Database>, session: Session }) {
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  if (session && session.user) {
    return (
      <>
        Hello {session.user.email}
        <button className="btn btn-sm btn-light text-dark me-2" onClick={handleLogout}>
          Logout
        </button>
      </>
    )
  } else {
    return (
      <button className="btn btn-sm btn-outline-primary me-2" onClick={handleLogin}>
        <FontAwesomeIcon icon={faGoogle} />
        &nbsp;
        Login
      </button>
    )
  }
}