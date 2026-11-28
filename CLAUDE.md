# uolos.lt — instrukcje dla Claude

Strona klienta (dekoratyviniai uolų reljefai). Next.js + TypeScript, statyczny eksport, Netlify (auto-deploy z gałęzi main). Treści w `src/data/`. Język strony: litewski; użytkownik pisze po polsku.

- Commity muszą mieć autora **Damiankules** (git config w tym repo), bez linii Co-Authored-By — inaczej Netlify może zablokować build.
- Formularz: FormSubmit → komfortas@me.com (`src/components/ui/ContactForm.tsx`).
- Domena uolos.lt w IV.lt, opłacona do 2027-02-03.

## Plan tworzenia stron (obowiązkowy)

Każdą stronę robimy w tej kolejności — nie zaczynamy od generowania kodu.
Jeśli użytkownik pominie krok albo poprosi o coś z późniejszego etapu, gdy wcześniejszy nie jest zrobiony — **przypomnij mu o tym** (krótko, z listą brakujących punktów).

1. **Idea** — cel strony, grupa docelowa, funkcje, analiza konkurencji.
2. **Technologie** — hosting i język. PHP, gdy hosting/VPS go obsługuje; na Netlify/Vercel — Next.js + TypeScript.
3. **Architektura** — struktura katalogów, strony, URL-e, komponenty, backend, baza danych (jeśli potrzebna).
4. **UI/UX** — design system, kolory, fonty, nawigacja, responsywność. Unikać typowego „AI designu”.
5. **Programowanie** — najpierw szkielet, potem strony i funkcje.
6. **Technical SEO** — sitemap.xml, robots.txt, canonical, meta title, meta description, Open Graph, JSON-LD, ALT, semantyczny HTML, linki wewnętrzne, przekierowania 301, strona 404. Opcjonalnie llms.txt.
7. **Bezpieczeństwo** — HTTPS, walidacja formularzy, ochrona przed spamem, XSS, SQL injection, rate limiting, zmienne środowiskowe (.env).
8. **Prawo** — dane rejestrowe firmy, polityka prywatności, polityka cookies, zarządzanie zgodami (RODO/BDAR).
9. **Optymalizacja** — WebP/AVIF, lazy loading, cache, Core Web Vitals, Lighthouse, dostępność WCAG.
10. **Testy** — telefony, przeglądarki, formularze, linki, funkcje, bezpieczeństwo.
11. **Wdrożenie** — domena, DNS, SSL, konfiguracja produkcyjna, kopie zapasowe.
12. **Analityka** — Google Search Console, GA4, Google Tag Manager, Microsoft Clarity, Bing Webmaster Tools, śledzenie konwersji, zgłoszenie sitemap. Narzędzia śledzące uruchamiać dopiero po zgodzie użytkownika (cookie consent).
13. **Utrzymanie** — indeksacja, błędy, pozycje, konwersje, uptime, aktualizacje zależności.

Przed oddaniem pracy sprawdź, które punkty są zrobione, a które nie, i powiedz o tym użytkownikowi.

## Stan uolos.lt wg planu (aktualizuj po zmianach)

- [x] 1–5 Idea, technologie, architektura, UI/UX, programowanie (analiza konkurencji — nie robiona)
- [x] 6 Technical SEO: sitemap, robots, canonical, meta, OG, JSON-LD (firma + FAQ), ALT, 301 /uolos.html, 404, llms.txt
- [x] 7 Bezpieczeństwo: HTTPS, nagłówki CSP/HSTS/Permissions-Policy/X-Frame w netlify.toml, walidacja formularza, honeypot (captcha FormSubmit wyłączona; rate limiting po stronie FormSubmit), brak sekretów w repo
- [x] 8 Prawo: właściciel Aleksandr Smirnov, IVP Nr. 984953 (polityka prywatności + stopka); cookies — brak, polityka cookies/zgody dopiero przy analityce
- [x] 9 Optymalizacja: AVIF+WebP w 480/640/960 (`<Picture>`, `npm run images`), lazy loading, cache w netlify.toml; Lighthouse mobile ~83–100 perf, 100 a11y/BP/SEO, desktop 99; axe WCAG 2.1 AA bez błędów. Do poprawy: LCP mobile ~4 s (symulacja)
- [ ] 10 Testy: Chromium komputer+telefon OK (15 stron, CSP, formularz); brak testu Safari/Firefox (nie ma ich w środowisku); formularz FormSubmit nieaktywowany
- [x] 11 Wdrożenie: domena, DNS, SSL, Netlify; kopia kodu na GitHub
- [ ] 12 Analityka: nic (GSC, Bing, GA4/Clarity po zgodzie)
- [ ] 13 Utrzymanie: brak monitoringu
