import Link from 'next/link'

export default function AccountPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">پنل کاربری</h1>
      <p className="text-sm text-gray-600">خوش آمدید. از منو سمت راست می‌توانید آگهی‌ها و تنظیمات را مدیریت کنید.</p>

      <div className="mt-4 space-y-2">
        <Link href="/account/new" className="text-blue-600">درج آگهی جدید</Link>
        <Link href="/account/ads" className="text-blue-600">آگهی‌های من</Link>
      </div>
    </div>
  )
}
