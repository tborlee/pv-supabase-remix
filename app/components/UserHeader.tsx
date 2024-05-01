import type { User } from "@supabase/auth-js";
import { useOutletContext } from "react-router";
import { Form, Link } from "@remix-run/react";

export default function UserHeader() {
  const { user } = useOutletContext<{
    user: User;
  }>();

  if (user) {
    return (
      <>
        Hello {user.email}
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
