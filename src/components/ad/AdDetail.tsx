'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ad } from '@/lib/types';
import { toggleBookmark } from '@/lib/db';
import { useAuth } from '@/lib/hooks/useAuth';

interface AdDetailProps {
  ad: Ad;
}

export default function AdDetail({ ad }: AdDetailProps) {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await toggleBookmark(user.id, ad.id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('fa-IR').format(new Date(date));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{ad.title}</h1>
            <div className="text-sm text-gray-500">
              {formatDate(ad.created_at)}
              {' • '}
              {ad.location?.city}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleBookmark}
            disabled={loading || !user}
          >
            {isBookmarked ? 'حذف از نشان‌شده‌ها' : 'نشان کردن'}
          </Button>
        </div>

        {ad.images && ad.images.length > 0 && (
          <div className="mb-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={ad.images[0]}
                alt={ad.title}
                fill
                className="object-cover"
              />
            </div>
            {ad.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {ad.images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${ad.title} - تصویر ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-lg font-semibold mb-2">توضیحات</h2>
              <p className="whitespace-pre-wrap">{ad.description}</p>
            </div>

            {ad.metadata && Object.keys(ad.metadata).length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">مشخصات</h2>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(ad.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-gray-600">{key}:</dt>
                      <dd>{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <div>
            <Card className="p-4">
              <div className="text-2xl font-bold mb-4">
                {ad.price ? formatPrice(ad.price) : 'توافقی'}
              </div>

              <div className="space-y-4">
                {ad.contactInfo?.phone && (
                  <Button className="w-full" size="lg">
                    تماس: {ad.contactInfo.phone}
                  </Button>
                )}

                {ad.contactInfo?.whatsapp && (
                  <Button variant="outline" className="w-full">
                    چت در واتساپ
                  </Button>
                )}

                {ad.contactInfo?.telegram && (
                  <Button variant="outline" className="w-full">
                    چت در تلگرام
                  </Button>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                شناسه آگهی: {ad.id.slice(0, 8)}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}