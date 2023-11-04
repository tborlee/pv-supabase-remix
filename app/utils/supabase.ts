import { createServerClient, parse, serialize } from "@supabase/ssr";

export function createSupabaseClient(request: Request, headers: Headers) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key) {
          return cookies[key];
        },
        set(key, value, options) {
          headers.append("Set-Cookie", serialize(key, value, options));
        },
        remove(key, options) {
          headers.append("Set-Cookie", serialize(key, "", options));
        },
      },
    },
  );
}
