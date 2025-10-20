# Ad-marketplace (scaffold)

این مخزن یک اسکفرولد اولیه برای وب اپلیکیشن آگهی‌های تخصصی صنعت ساختمان با Next.js (App Router)، Supabase و Tailwind است. صفحات و متن‌ها به صورت نمونه و به زبان فارسی اضافه شده‌اند.

چه چیزهایی اضافه شد:
- اسکفرولد Next.js (TypeScript) در `app/` (صفحات اصلی: خانه، جستجو، جزئیات آگهی، پنل کاربری)
- فایل `src/lib/supabaseClient.ts` برای اتصال به Supabase (نیاز به تنظیم متغیرهای محیطی دارد)
- `supabase/migrations/001_create_ads.sql` نمونه SQL با مثال RLS
- فایل‌های PWA: `public/manifest.json` و ثبت Service Worker (placeholder)
- `.github/copilot-instructions.md` برای راهنمایی ایجنت‌ها

ابتدا: وابستگی‌ها را نصب کنید (پیشنهاد pnpm):

```bash
pnpm install
pnpm dev
```

تنظیمات مهم:
- فایل `.env.local` باید شامل `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` باشد.
- برای اجرای RLS و migration از Supabase CLI استفاده کنید (`supabase start`, `supabase db push`)

نکته: این یک نسخه اسکفرولد است — برای فعال شدن کامل PWA و نصب Shadcn/ui باید بسته‌های مربوطه افزوده و پیکربندی شوند.

پیشنهاد برای ادامه سریع:

1. نصب وابستگی‌ها:

```bash
pnpm install
```

2. نصب Shadcn/ui (نمونه دستور، نیاز به اجرا در محیط توسعه):

```bash
npx shadcn-ui@latest init
# سپس از شما سوال می‌شود که کدام components را اضافه کنید؛ حداقل Input, Select, Button, Card را انتخاب کنید.
```

3. اضافه کردن و پیکربندی Tailwind (اگر نیاز به دوباره‌سازی دارید):

```bash
npx tailwindcss init -p
```

4. تنظیم متغیرهای محیطی در `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key
```

اگر موافقید من همین حالا Shadcn/ui را نصب و چند مؤلفهٔ نمونه (تم تیره، فرم لاگین/ثبت‌نام، کارت آگهی، تب‌ها و جدول ساده) را اضافه کنم و صفحات ورود و ثبت‌نام را کامل‌تر کنم. بفرمایید ادامه دهم یا اول توضیح بیشتری می‌خواهید؟
# Ad-marketplace