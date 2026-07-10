# TASPA → 나모사이트빌더 배포 가이드

이 프로젝트는 **위젯 시스템을 쓰지 않고** Web Components(바닐라 커스텀 엘리먼트)로 작성합니다.
빌드 산출물(`dist/`)이 나모의 4개 배포 표면에 1:1로 매핑됩니다.

## 아키텍처 매핑

| 소스 | 빌드 산출물 | 나모 표면 | MCP 도구 |
|---|---|---|---|
| `homepage/js/**` (컴포넌트 전부) | `dist/site.js` | Site JS (전 페이지 공통) | `update_site_js` |
| `homepage/styles/**` | `dist/site.css` | Site CSS (전 페이지 공통) | `update_site_css` |
| `homepage/pages/<n>/<n>.html` | `dist/pages/<n>.html` | Page HTML (body 내부) | `create_page` / `update_page_html` |
| `homepage/pages/<n>/<n>.css` | `dist/pages/<n>.css` | Page CSS | `update_page_css` |
| `homepage/pages/<n>/page.json` | `dist/pages/<n>.json` | 페이지 메타 | `create_page` / `update_page_info` |
| `homepage/assets/**` | `dist/assets/**` | 에셋 | `upload_asset` / `upload_asset_from_url` |

## 로컬 개발

```bash
npm install          # 최초 1회 (esbuild)
npm run dev          # http://localhost:5173/dev/  — 라이브 리로드
```

`dev/index.html`이 나모 렌더 모델(Site CSS + Site JS + Page HTML 주입)을 모사합니다.
상단 dev 바에서 페이지를 전환하며 확인하세요.

## 빌드

```bash
npm run build        # homepage/ -> dist/
```

## 나모에 배포

> MCP 서버(`sitebuilder-mcp-coding`)는 Claude Code 세션에 묶여 있어, **배포는 에이전트가 실행**합니다.
> 빌드 후 "dist를 나모에 배포해줘"라고 요청하면 아래 순서로 반영합니다.

1. `dist/site.css` → `update_site_css`
2. `dist/site.js` → `update_site_js`
3. 각 페이지(`dist/manifest.json` 순회):
   - 신규: `create_page(title, path, requiredAuthLevel, inMenu, html, css)`
   - 기존: `update_page_html` + `update_page_css` + `update_page_info`
4. 에셋 필요 시 `upload_asset` / `upload_asset_from_url`

모든 변경은 나모의 **관리자 승인(admin approval)** 대기 상태로 제출됩니다.

## 나모 제약 (설계에 반영됨)

- 페이지 경로는 **평면만** — `/blog/post` 같은 중첩 불가 (`page.json`의 `path`는 `/xxx` 한 단계)
- Page HTML은 **body 내부만**, `<script>`/`<style>` 태그 금지 → 전부 site.js / site.css / page.css로
- `{{document.field}}` 템플릿과 `API.*` 객체는 이 방식에선 사용 안 함 (필요 시 별도 검토)
- `/login`, `/logout`은 예약 경로
