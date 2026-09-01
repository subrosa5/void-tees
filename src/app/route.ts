import { readFile } from "fs/promises";
import path from "path";
import { getMegaData, DEFAULT_MEGA_DATA } from "@/lib/mega-store";

// products.ts's formatPrice uses toLocaleString("ru-RU"), which groups
// thousands with a non-breaking space (U+00A0) — the landing page's own
// price text uses a plain space, so matching that (not formatPrice's
// output) is what makes the string-replace below actually find it.
function formatPriceForLanding(n: number): string {
  return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
}

// Serves content/mega-drop.html verbatim at "/" — a self-contained exported
// bundle (own <html>/<head>/<body>, its own fonts/images/scripts packed in),
// not a React page. A route handler here bypasses the (store) layout chain
// entirely, so none of that app's header/footer/cart chrome gets mixed in.
//
// Photo/name/price ARE admin-editable (see /admin/mega) despite the file
// being static: content/mega-drop.html ships the DEFAULT_MEGA_DATA values
// literally, and every request swaps those exact substrings for whatever
// is in the store, before the bytes go out. Nothing else in the file is
// touched — layout, animations, copy that isn't one of these fields, all
// exactly as exported.
const FILE_PATH = path.join(process.cwd(), "content", "mega-drop.html");

// This replacement lands inside a JSON string literal (the packed template
// gets JSON.parse()'d client-side) that's itself embedded in HTML — escape
// for both so admin-entered text can't break the page.
function escapeForPackedTemplate(value: string): string {
  const htmlEscaped = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return htmlEscaped.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export const dynamic = "force-dynamic";

export async function GET() {
  const [html, data] = await Promise.all([readFile(FILE_PATH, "utf-8"), getMegaData()]);

  let out = html;
  const swap = (from: string, to: string) => {
    if (from === to) return;
    out = out.replace(from, to);
  };
  // The ticker repeats its one phrase 8× in the packed component's data —
  // every occurrence needs swapping, not just the first.
  const swapAll = (from: string, to: string) => {
    if (from === to) return;
    out = out.replaceAll(from, to);
  };

  // Card 1 and card 2 both default to "5 000 ₽" — a bare price swap can't
  // tell the two apart, so name+price are replaced together as one block,
  // anchored on the (default, so always-present) name text right before it.
  const namePriceBlock = (name: string, price: number) =>
    `>${escapeForPackedTemplate(name)}</span>\n        <span style="font-family:var(--font-heading);font-weight:800;font-size:18px">${formatPriceForLanding(price)}</span>`;

  swap(DEFAULT_MEGA_DATA.heroImage, data.heroImage);
  swap(DEFAULT_MEGA_DATA.productImageFront, data.productImageFront);
  swap(DEFAULT_MEGA_DATA.productImageBack, data.productImageBack);
  swap(
    namePriceBlock(DEFAULT_MEGA_DATA.productName, DEFAULT_MEGA_DATA.price),
    namePriceBlock(data.productName, data.price),
  );
  swapAll(DEFAULT_MEGA_DATA.tickerText, escapeForPackedTemplate(data.tickerText));
  swap(DEFAULT_MEGA_DATA.card2ImageFront, data.card2ImageFront);
  swap(DEFAULT_MEGA_DATA.card2ImageBack, data.card2ImageBack);
  swap(
    namePriceBlock(DEFAULT_MEGA_DATA.card2Name, DEFAULT_MEGA_DATA.card2Price),
    namePriceBlock(data.card2Name, data.card2Price),
  );

  return new Response(out, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
