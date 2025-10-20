import { notFound } from 'next/navigation'

type Props = { params: { category: string; slug: string } }

export default async function AdPage({ params }: Props) {
  const { category, slug } = params

  // Placeholder: in real app fetch from Supabase by slug+category
  if (!slug) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold">{decodeURIComponent(slug)}</h1>
      <p className="text-sm text-gray-600">دسته: {decodeURIComponent(category)}</p>

      <section className="mt-4">
        <h2 className="font-semibold">توضیحات</h2>
        <p className="mt-2">جزئیات کامل آگهی در اینجا نمایش داده می‌شود. (نسخه نمونه)</p>
      </section>

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded">تماس</button>
        <button className="px-4 py-2 border rounded">ذخیره</button>
      </div>
    </div>
  )
}
