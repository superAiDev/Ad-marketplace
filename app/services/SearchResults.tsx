import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { searchAds } from '@/lib/db';
import type { Ad } from '@/lib/types';

interface SearchResultsProps {
  searchParams: {
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    city?: string;
    page?: string;
  };
}

export async function SearchResults({ searchParams }: SearchResultsProps) {
  const {
    query,
    category,
    minPrice,
    maxPrice,
    city,
    page = '1'
  } = searchParams;

  const { ads, count } = await searchAds({
    query,
    categorySlug: category,
    priceMin: minPrice ? parseFloat(minPrice) : undefined,
    priceMax: maxPrice ? parseFloat(maxPrice) : undefined,
    city,
    page: parseInt(page),
    limit: 20
  });

  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h2>
        <p className="text-gray-500">لطفاً با فیلترهای دیگری جستجو کنید</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {count} نتیجه یافت شد
        </h2>
        <select className="p-2 border rounded-md">
          <option value="newest">جدیدترین</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad: Ad) => (
          <Link key={ad.id} href={`/services/${ad.category_id}/${ad.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              {ad.images?.[0] && (
                <div className="relative h-48">
                  <Image
                    src={ad.images[0]}
                    alt={ad.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {ad.is_featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm">
                      ویژه
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{ad.title}</h3>
                
                <div className="text-gray-500 text-sm mb-2">
                  {ad.location?.city} • {new Date(ad.created_at).toLocaleDateString('fa-IR')}
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-bold">
                    {ad.price
                      ? new Intl.NumberFormat('fa-IR').format(ad.price) + ' تومان'
                      : 'توافقی'}
                  </div>
                  <Button variant="outline" size="sm">مشاهده</Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {count > 20 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(count / 20) }).map((_, i) => {
            const pageNumber = i + 1;
            const isCurrentPage = pageNumber === parseInt(page);

            return (
              <Link
                key={i}
                href={{
                  pathname: '/services',
                  query: { ...searchParams, page: pageNumber }
                }}
              >
                <Button
                  variant={isCurrentPage ? 'default' : 'outline'}
                  size="sm"
                >
                  {pageNumber}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}