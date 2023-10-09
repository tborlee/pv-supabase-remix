import {useOutletContext} from "react-router";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "~/database.types";

export default function Login() {
  const { supabase } = useOutletContext<{ supabase: SupabaseClient<Database> }>()

  const handleEmailLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: 'thomas@borlee.be',
      password: 'thomasthomas',
    })
  }

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
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
      <button onClick={handleEmailLogin}>Email Login</button>
      <button onClick={handleGitHubLogin}>GitHub Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}