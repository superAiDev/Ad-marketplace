'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ad } from '@/lib/types';
import supabase from '@/lib/supabaseClient';

interface UserAdsProps {
  userId: string;
}

export default function UserAds({ userId }: UserAdsProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('owner', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ads:', error);
      } else {
        setAds(data || []);
      }
      setLoading(false);
    };

    fetchAds();
  }, [userId]);

  const handleDelete = async (adId: string) => {
    if (!confirm('آیا از حذف این آگهی اطمینان دارید؟')) return;

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', adId);

    if (error) {
      console.error('Error deleting ad:', error);
      alert('خطا در حذف آگهی');
    } else {
      setAds(ads.filter(ad => ad.id !== adId));
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">شما هنوز آگهی ثبت نکرده‌اید</h3>
        <Link href="/account/new">
          <Button>ثبت آگهی جدید</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">آگهی‌های من</h3>
        <Link href="/account/new">
          <Button>ثبت آگهی جدید</Button>
        </Link>
      </div>

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
                <h4 className="font-semibold mb-1">{ad.title}</h4>
                <div className="text-sm text-gray-500 mb-2">
                  وضعیت: {ad.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                </div>
                <div className="flex gap-2">
                  <Link href={`/services/${ad.category_id}/${ad.slug}`}>
                    <Button variant="outline" size="sm">مشاهده</Button>
                  </Link>
                  <Link href={`/account/edit/${ad.id}`}>
                    <Button variant="outline" size="sm">ویرایش</Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(ad.id)}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}