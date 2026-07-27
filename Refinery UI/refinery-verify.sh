#!/usr/bin/env bash
# ============================================================================
# refinery-verify.sh — Refinery 디자인시스템 무결성 검증기 (공유 CSS 아키텍처)
# ----------------------------------------------------------------------------
# 모든 UI_Refinery_*.html 은 단일 refinery.css 를 <link> 로 공유한다. CSS 가
# 한 곳에만 존재하므로 토큰/컴포넌트 "드리프트" 는 구조적으로 불가능하다.
# 이 검증기는 그 단일-소스 계약이 깨지지 않았는지(= 페이지가 CSS 를 다시
# 임베드하거나, 링크가 빠지거나, phantom 클래스가 생기지 않았는지) 확인한다.
#
#   bash refinery-verify.sh        # exit 0 = 통과, 1 = 위반
#
# 검사 항목
#   1. refinery.css 존재 · 중괄호 균형 · :root 토큰 · .rfn-* 코어 보유
#   2. 모든 페이지가 refinery.css 를 정확히 1회 link & 인라인 <style> 0
#      (= CSS 재임베드로 인한 드리프트 재발 차단)
#   3. 페이지 HTML 안에 토큰 hex 리터럴 재도입 없음 (--brand:#… 등)
#   4. phantom 클래스 — skill template.html 의 .rfn-* 가 refinery.css 에 실재
#   5. Cloudflare cdn-cgi 잔재 없음
# ============================================================================
set -u
cd "$(dirname "$0")"

CSS="refinery.css"
TEMPLATE=".claude/skills/refinery-html-page/template.html"
fail=0
pass(){ printf "  \033[32mOK\033[0m  %s\n" "$1"; }
bad(){  printf "  \033[31mNG\033[0m  %s\n" "$1"; fail=1; }

echo "── 1. refinery.css 단일 소스 ──"
if [ ! -f "$CSS" ]; then
  bad "$CSS 없음 — 공유 스타일시트가 사라졌습니다"
else
  o=$(grep -o '{' "$CSS" | wc -l | tr -d ' '); c=$(grep -o '}' "$CSS" | wc -l | tr -d ' ')
  [ "$o" = "$c" ] && pass "중괄호 균형 ($o/$c)" || bad "중괄호 불균형 (open=$o close=$c) — CSS 깨짐"
  grep -qE '^\s*:root\{' "$CSS" && pass ":root 토큰 블록 존재" || bad ":root 토큰 블록 없음"
  n=$(grep -oE '\.rfn-[a-z0-9-]+(--[a-z0-9-]+)?\s*\{' "$CSS" | sort -u | wc -l | tr -d ' ')
  [ "$n" -ge 150 ] && pass ".rfn-* 컴포넌트 코어 보유 ($n 규칙)" || bad ".rfn-* 코어 빈약 ($n) — 코어 누락 의심"
  for t in --brand: --ink-900: --surface-card: --dv-1: --fs-body:; do
    grep -qE "\\${t}" "$CSS" || bad "핵심 토큰 누락: $t"
  done
fi

PAGES=$(ls UI_Refinery_*.html 2>/dev/null)
[ -z "$PAGES" ] && { echo "  -- UI_Refinery_*.html 없음"; }

echo "── 2. 페이지 = refinery.css link, 인라인 <style> 0 ──"
for p in $PAGES; do
  lk=$(grep -c 'href="refinery.css"' "$p")
  st=$(grep -c '<style' "$p")
  if [ "$lk" -eq 1 ] && [ "$st" -eq 0 ]; then pass "$p — link 1 · <style> 0"
  else bad "$p — refinery.css link=$lk (기대 1), <style>=$st (기대 0) → CSS 재임베드/링크누락"; fi
done

echo "── 3. 페이지에 토큰 hex 재도입 없음 ──"
for p in $PAGES; do
  n=$(grep -oE '\-\-(brand|ink-[0-9]|surface-|dv-[0-9]|fs-)[a-z0-9-]*:#?[0-9A-Fa-f(]' "$p" | wc -l | tr -d ' ')
  [ "$n" -eq 0 ] && pass "$p — 토큰 선언 0 (refinery.css 에만 존재)" || bad "$p — 토큰 $n 건이 HTML 에 재도입됨"
done

echo "── 4. phantom 클래스 (skill template) ──"
if [ -f "$TEMPLATE" ]; then
  miss=0
  for cl in $(grep -oE 'class="[^"]*"' "$TEMPLATE" | grep -oE 'rfn-[a-z0-9-]+' | sort -u); do
    grep -qE "\.${cl}[ {.,:>~+]|\.${cl}--" "$CSS" || { bad "template.html: .$cl 가 refinery.css 에 없음 (phantom)"; miss=1; }
  done
  [ "$miss" -eq 0 ] && pass "template.html 의 모든 .rfn-* 가 refinery.css 에 정의됨"
else
  echo "  -- $TEMPLATE 없음, 스킵"
fi

echo "── 5. Cloudflare 잔재 ──"
res=$(grep -l 'cdn-cgi' UI_Refinery_*.html 2>/dev/null || true)
[ -z "$res" ] && pass "cdn-cgi 주입 스크립트 없음" || { bad "cdn-cgi 잔재:"; echo "$res" | sed 's/^/        /'; }

echo
if [ "$fail" -eq 0 ]; then
  echo "✅ 통과 — 모든 페이지가 단일 refinery.css 를 공유합니다 (드리프트 구조적 불가)."
else
  echo "❌ 실패 — 위 NG 항목을 고친 뒤 다시 실행하세요. 토큰/컴포넌트 수정은 refinery.css 에서만 합니다."
fi
exit $fail
