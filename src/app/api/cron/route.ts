// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.

// export const dynamic = "force-dynamic"; // static by default, unless reading the request
// export const revalidate = 0;

export async function GET() {
  try {
    console.log("CRON has ran successfully");
    return new Response(`Cron has ran successfully`, { status: 200 });
  } catch (e: any) {
    console.error(e.message);
    return new Response(`CRON has failed to run:${e.message}`, { status: 500 });
  }
}
