import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createSupabaseClient } from "~/utils/supabase.server";
import stylesUrl from "~/styles/login.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (!email || !password) {
    return json({ formError: "Email or password missing" }, { status: 400 });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return json(
      {
        fieldErrors: null,
        fields: null,
        formError: "Form not submitted correctly.",
      },
      { status: 400 },
    );
  }

  const { supabase, headers } = createSupabaseClient(request);
  const result = await supabase.auth.signInWithPassword({ email, password });

  if (result.data.user) {
    return redirect("/", {
      headers: headers,
    });
  } else {
    return json({ formError: result.error?.message }, { status: 500 });
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
