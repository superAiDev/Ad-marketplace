import Link from "next/link"
import { BadgeCheck, Home, Car, ShoppingBag, Briefcase, Building2, Hotel } from "lucide-react"

interface CategoryGridProps {
  featured?: boolean
}

export default function CategoryGrid({ featured = false }: CategoryGridProps) {
  const categories = [
    {
      title: "املاک",
      icon: Home,
      href: "/services/real-estate",
      count: 12543,
      color: "text-rose-500",
    },
    {
      title: "وسایل نقلیه",
      icon: Car,
      href: "/services/vehicles",
      count: 8976,
      color: "text-blue-500",
    },
    {
      title: "لوازم خانگی",
      icon: ShoppingBag,
      href: "/services/home-appliances",
      count: 15234,
      color: "text-amber-500",
    },
    {
      title: "خدمات",
      icon: Briefcase,
      href: "/services/services",
      count: 6789,
      color: "text-emerald-500",
    },
    {
      title: "صنعتی و تجاری",
      icon: Building2,
      href: "/services/industrial",
      count: 4321,
      color: "text-violet-500",
    },
    {
      title: "اجاره کوتاه مدت",
      icon: Hotel,
      href: "/services/short-term",
      count: 2345,
      color: "text-cyan-500",
    },
  ]

  const displayCategories = featured ? categories.slice(0, 6) : categories
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {displayCategories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <category.icon className={`h-8 w-8 shrink-0 ${category.color}`} />
            <div className="flex-grow">
              <h3 className="font-semibold">{category.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {Intl.NumberFormat("fa-IR").format(category.count)} آگهی
              </p>
            </div>
          </div>
          {category.count > 10000 && (
            <BadgeCheck className="absolute right-4 top-4 h-5 w-5 text-primary" />
          )}
        </Link>
      ))}
    </div>
  )
}