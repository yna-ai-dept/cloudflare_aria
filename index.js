// Notion Proxy Worker (Fruition 기반)
// 이 코드를 GitHub에 올리고 Cloudflare에 연동하면 iframe 삽입 가능한 프록시가 생성됩니다.

const NOTION_PAGE = "1a02dc8aa87f80af8c7bf993ee9d9311";  // ← 너의 Notion 페이지 ID

const CUSTOM_DOMAIN = null; // 도메인 없으면 null 유지
const GOOGLE_FONT = "Inter";
const PAGE_TITLE = "AIERA";
const PAGE_DESCRIPTION = "AI 연구 노트북";
const PREVIEW_IMAGE = null;

addEventListener("fetch", event => {
  event.respondWith(fetchAndApply(event.request));
});

async function fetchAndApply(request) {
  let url = new URL(request.url);
  let response;

  if (url.pathname === "/") {
    url = new URL(`https://www.notion.so/${NOTION_PAGE.replace(/-/g, "")}`);
  } else {
    url = new URL(`https://www.notion.so${url.pathname}${url.search}`);
  }

  const res = await fetch(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body
  });

  response = new Response(res.body, res);
  response.headers.set("X-Robots-Tag", "none");

  return response;
}