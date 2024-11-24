import { Form, ShouldRevalidateFunction, useActionData, useNavigation } from "react-router";
import type { ActionFunctionArgs, LinksFunction } from "react-router";
import { data, redirect } from "react-router";
import { createSupabaseClient } from "../utils/supabase.server";
import stylesUrl from "../styles/login.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (!email || !password) {
    return data({ formError: "Email or password missing" }, { status: 400 });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    };
  }

  const { supabase, headers } = createSupabaseClient(request);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!error) {
    return redirect("/", {
      headers,
    });
  } else {
    return { formError: error?.message };
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const busy = state === "submitting";

  return (
    <Form className="form-signin" data-bitwarden-watching="1" method="post">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="inputEmail"
        name="email"
        className="form-control"
        placeholder="Email address"
        required
        autoFocus
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        name="password"
        className="form-control"
        placeholder="Password"
        required
      />
      <button
        className="btn btn-lg btn-primary btn-block"
        disabled={busy}
        type="submit"
      >
        Sign in
      </button>
      <span>{actionData?.formError}</span>
    </Form>
  );
}
