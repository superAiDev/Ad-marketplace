'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ad } from '@/lib/types';
import { getBookmarkedAds, toggleBookmark } from '@/lib/db';

interface UserBookmarksProps {
  userId: string;
}

export default function UserBookmarks({ userId }: UserBookmarksProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarkedAds = await getBookmarkedAds(userId);
      setAds(bookmarkedAds);
      setLoading(false);
    };

    fetchBookmarks();
  }, [userId]);

  const handleRemoveBookmark = async (adId: string) => {
    await toggleBookmark(userId, adId);
    setAds(ads.filter(ad => ad.id !== adId));
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">شما هنوز آگهی‌ای را نشان نکرده‌اید</h3>
        <Link href="/services">
          <Button>جستجوی آگهی‌ها</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ads.map(ad => (
        <Card key={ad.id} className="p-4">
          <div className="flex gap-4">
            {ad.images?.[0] && (
              <div className="relative w-24 h-24">
                <Image
                  src={ad.images[0]}
                  alt={ad.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}

            <div className="flex-1">
              <Link href={`/services/${ad.category_id}/${ad.slug}`}>
                <h4 className="font-semibold mb-1 hover:text-blue-600">{ad.title}</h4>
              </Link>
              
              <div className="text-sm text-gray-500 mb-2">
                {ad.location?.city} • {new Date(ad.created_at).toLocaleDateString('fa-IR')}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-bold">
                  {ad.price
                    ? new Intl.NumberFormat('fa-IR').format(ad.price) + ' تومان'
                    : 'توافقی'}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveBookmark(ad.id)}
                >
                  حذف از نشان‌شده‌ها
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}