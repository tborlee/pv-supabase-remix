import {useOutletContext} from "react-router";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "~/database.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";

export default function Login() {
  const { supabase } = useOutletContext<{ supabase: SupabaseClient<Database> }>()
  
   supabase.auth.getSession().then((response) => {
     console.log(response.data)
   })

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <button onClick={handleLogin}><FontAwesomeIcon icon={faGoogle} />&nbsp;Login with Google</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}