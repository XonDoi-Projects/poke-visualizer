// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export default function GET(_request: Request) {
  return new Response(`Cron has ran successfully`);
}
