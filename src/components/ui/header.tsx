import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <Link href="/" className="text-2xl font-bold text-white">بازار آگهی</Link>
        <div className="text-sm text-slate-400">صنعت ساختمان</div>
      </div>
      <nav className="space-x-4">
        <Link href="/services" className="text-slate-200">جستجو</Link>
        <Link href="/account" className="text-slate-200">پنل کاربری</Link>
      </nav>
    </header>
  )
}
