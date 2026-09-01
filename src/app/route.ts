import { readFile } from "fs/promises";
import path from "path";

// Serves content/mega-drop.html verbatim at "/" — a self-contained exported
// bundle (own <html>/<head>/<body>, its own fonts/images/scripts packed in),
// not a React page. A route handler here bypasses the (store) layout chain
// entirely, so none of that app's header/footer/cart chrome gets mixed in —
// this file is returned exactly as it was exported, byte for byte.
const FILE_PATH = path.join(process.cwd(), "content", "mega-drop.html");

export async function GET() {
  const html = await readFile(FILE_PATH, "utf-8");
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
