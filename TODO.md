# i18n Migration: Custom Zod → next-intl

**Goal**: Replace the custom homegrown translation system (Zod schemas + `localize()` + JSON files) with `next-intl`. Keep Payload's `localization` (DB) for editor-managed content, and Payload's `i18n` for admin panel labels.

---

## Phase 1 — Setup next-intl ✅

- [x] **Install `next-intl`**
- [x] **Create `src/i18n/request.ts`**
- [x] **Create `src/i18n/routing.ts`**
- [x] **Create `middleware.ts`** (skips `/admin`, `/api`)
- [x] **Update `next.config.js`** (wrapped with `createNextIntlPlugin()`)
- [x] **Scrap old system**: deleted `src/translations/`, `public/translations/`, `docs/translations.md`; moved locale types into `src/utilities/lang.ts`; fixed `useLanguage.tsx` and `Archive/config.ts`

---

## Phase 2 — Create Message Files ✅

- [x] **Create `messages/en.json`** — exhaustively catalogued all `matchLang()` calls and `defaults.ts` entries (~134 key pairs) into a structured message file
- [x] **Create `messages/vi.json`** — same structure, all Vietnamese translations
- [x] **Create `src/i18n/types.ts`** — next-intl `AppConfig` type augmentation for full type-safety on translation keys

---

## Phase 3 — Update Layout & Routing

- [ ] **Restructure `src/app/(frontend)` → `src/app/[locale]`**

          Move the `(frontend)` route group content under a `[locale]` dynamic segment so next-intl's routing works.

          Before:
          ```
          src/app/(frontend)/
            page.tsx
            [slug]/
            checkout/
            ...
          ```

          After:
          ```
          src/app/[locale]/
            page.tsx
            [slug]/
            checkout/
            ...
          ```

- [ ] **Update `src/app/[locale]/layout.tsx`**

          Wrap with `NextIntlClientProvider`. Call `getMessages()` and pass them down.

- [ ] **Add `generateStaticParams` to the root layout**

          ```ts
          export async function generateStaticParams() {
            return [{ locale: 'en' }, { locale: 'vi' }];
          }
          ```

- [ ] **Update `src/app/(payload)/` layout**

          Confirm the Payload admin route group is NOT under `[locale]` so `/admin` stays locale-free.

---

## Phase 4 — Replace `localize()` in Components

- [ ] **Identify all usages of `localize()`** across the codebase

          ```bash
          rg 'localize\(' src/ --include '*.tsx' --include '*.ts'
          ```

- [ ] **Replace server component usages**

          Before:
          ```tsx
          const language = await getClientLanguage()
          const t = localize((t) => t.productCard)[language]
          ```

          After:
          ```tsx
          import { getTranslations } from 'next-intl/server'
          const t = await getTranslations('productCard')
          ```

- [ ] **Replace client component usages**

          Before:
          ```tsx
          const { language } = useLanguage()
          const t = localize((t) => t.reviews.ui)[language]
          ```

          After:
          ```tsx
          import { useTranslations } from 'next-intl'
          const t = useTranslations('reviews.ui')
          ```

- [ ] **Replace Payload config label usages** (with `defaultLanguage` trick)

          Update `blocks.ts` and `globals.ts_` to use next-intl's `getTranslations({ locale: defaultLocale })` instead of `localize(...)[defaultLanguage]` for `placeholder` / `defaultValue` fields.

- [ ] **Remove `useLanguage()` and `getClientLanguage()`** if they become unused

---

## Phase 5 — Clean Up Old System

- [ ] **Remove frontend translation namespace**

          - Delete `src/translations/namespace/frontend.ts_`
          - Delete `public/translations/frontend.en.json`
          - Delete `public/translations/frontend.vi.json`
          - Delete `public/translations/frontend.schema.json`

- [ ] **Remove unused utilities**

          - `readTranslationsJson` and `writeTranslationJsonSchema` in `src/translations/utilities.ts` — only keep if `blocks.ts` still needs them for admin labels.

- [ ] **Consider deprecating `blocks.ts` / `globals.ts_` for frontend strings**

          If all frontend-facing strings migrated to `messages/`, the only thing left in these files is admin-panel labels. Those could either stay (the Zod system is fine for that narrow use case) or be moved into Payload's `i18n.translations` custom translations.

- [ ] **Remove `src/translations/` directory** entirely (once nothing imports from it)

---

## Phase 6 — Verify

- [ ] **Run full build**

          ```bash
          pnpm run build
          ```

- [ ] **Check TypeScript strict mode** — no `any` on translation keys

- [ ] **Smoke-test all pages** in both `en` and `vi`

- [ ] **Check `/admin`** — Payload panel still works and shows correct labels

- [ ] **Verify ICU plural examples** work (e.g. `{count} items` vs `1 item`)

- [ ] **Delete this TODO.md** when done
