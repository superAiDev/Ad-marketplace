import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">جستجوی خدمات</h1>
      <div className="mb-4">
        <label className="block mb-1">فیلتر شهر</label>
        <select className="border p-2 w-full">
          <option>همه شهرها</option>
          <option>تهران</option>
          <option>مشهد</option>
        </select>
      </div>

      <div className="space-y-4">
        <article className="border p-4 rounded">
          <h3 className="font-bold">کاشت میلگرد - شرکت مجری الف</h3>
          <p className="text-sm text-gray-600">تهران — اجرای تخصصی</p>
          <Link href="/services/کاشت-میلگرد/شرکت-مجری-الف" className="text-blue-600">جزئیات</Link>
        </article>
      </div>
    </div>
  )
}
