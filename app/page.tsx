import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Grid, MapPin, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CategoryGrid from "@/components/CategoryGrid"

export default async function Home() {
  const session = await auth()
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
              سریع‌ترین راه برای
              <span className="text-primary"> خرید و فروش </span>
              در ایران
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              میلیون‌ها فروشنده و خریدار در دیوار. به راحتی آگهی خود را ثبت کنید و یا در میان آگهی‌های موجود جستجو کنید.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/services/new">
                  <Plus className="mr-2 h-4 w-4" />
                  ثبت رایگان آگهی
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">
                  جستجوی آگهی‌ها
                  <Search className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">دسته‌بندی‌های محبوب</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                در دسته‌بندی مورد نظر خود جستجو کنید
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/categories">
                همه دسته‌بندی‌ها
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CategoryGrid featured />
        </div>
      </section>

      {/* Featured Ads Section */}
      <section className="bg-muted/50 py-16 dark:bg-muted/10">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">آگهی‌های ویژه</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                آگهی‌های برگزیده و پربازدید
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/services">
                همه آگهی‌ها
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-shadow hover:shadow-lg"
                >
                  <Link href={`/services/category/ad-${i + 1}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={`/images/sample-${(i % 3) + 1}.jpg`}
                        alt="تصویر آگهی"
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="secondary">دسته‌بندی نمونه</Badge>
                        <span className="text-sm text-muted-foreground">
                          ۲ روز پیش
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        عنوان آگهی نمونه {i + 1}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        تهران
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-semibold">
                          {Intl.NumberFormat("fa-IR").format(
                            Math.floor(Math.random() * 10000000) + 1000000
                          )}{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">چرا دیوار؟</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              سریع‌ترین و امن‌ترین راه برای خرید و فروش در ایران
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "ثبت رایگان آگهی",
                description:
                  "به راحتی و به صورت رایگان آگهی خود را در دیوار ثبت کنید",
                icon: Plus,
              },
              {
                title: "جستجوی هوشمند",
                description:
                  "با استفاده از فیلترهای پیشرفته، آگهی مورد نظر خود را پیدا کنید",
                icon: Search,
              },
              {
                title: "دسته‌بندی‌های متنوع",
                description:
                  "هر چیزی که به دنبال آن هستید را در دسته‌بندی‌های مختلف پیدا کنید",
                icon: Grid,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
              >
                <feature.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">
              همین حالا آگهی خود را ثبت کنید
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              میلیون‌ها نفر در دیوار منتظر آگهی شما هستند
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8"
              asChild
            >
              <Link href="/services/new">
                <Plus className="mr-2 h-4 w-4" />
                ثبت رایگان آگهی
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      </section>
    </div>
  )
}