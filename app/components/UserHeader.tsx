import type { Session } from "@supabase/gotrue-js";
import { useOutletContext } from "react-router";
import { Form, Link } from "@remix-run/react";

export default function UserHeader() {
  const { session } = useOutletContext<{
    session: Session;
  }>();

  if (session && session.user) {
    return (
      <>
        Hello {session.user.email}
        <Form action="/logout" method="post">
          <button type="submit" className="btn btn-sm btn-light text-dark me-2">
            Logout
          </button>
        </Form>
      </>
    );
  } else {
    return (
      <div>
        <Link to="/login" className="btn btn-sm btn-outline-primary me-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-sm btn-secondary me-2">
          Register
        </Link>
      </div>
    );
  }
}
