// Paying for services, staged and shut until the builder sets his
// own payment route.
//
// Services are the builder's own work, agreed in a written offer
// first: the scope, one fixed price, and what will stand in the open
// when the work is done. No payment route is switched on today, so
// this endpoint takes no payment and names no account. It answers,
// in the open, exactly what will open and when.
//
// Activation is one configuration value, set in the Pages project
// when the builder sets his route: SERVICES_PAY_URL, his own hosted
// payment page. With it set, this endpoint sends the visitor
// straight to that page. Nothing else changes: no build, no new
// code. Payment for work is kept apart from giving, which belongs
// to the Commons and moves only through a fiscal host; that door
// stands at /api/give and stays shut until a host is appointed.

export async function onRequest(context) {
  const { env } = context;
  const pay = env.SERVICES_PAY_URL;
  if (pay) {
    return new Response(null, {
      status: 302,
      headers: { location: pay, "cache-control": "no-store" },
    });
  }
  const body = {
    status: "not_open",
    why: "No payment route for services is switched on. Work is " +
      "agreed in a written offer first, with the scope and one " +
      "fixed price stated in the open, and payment follows the " +
      "agreement. This endpoint opens when the builder sets his " +
      "own payment route.",
    opens_when: "The day the builder sets his payment route, this " +
      "endpoint is pointed at it by one configuration value. " +
      "Activation is a setting, not a build.",
    flow: [
      "A written offer names the scope, one fixed price, and what " +
        "will stand in the open when the work is done.",
      "The offer is agreed before any work begins and before any " +
        "money moves.",
      "Payment follows the agreement, through the builder's own " +
        "route, and buys the work only.",
      "Payment buys no governance, no votes, no standing, and no " +
        "place in the Commons beyond the credit any verified " +
        "contribution earns.",
    ],
    offers: "https://topsoilcommons.org/services",
    giving: "https://topsoilcommons.org/api/give",
  };
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
