'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CITIES } from '@/lib/constants';

interface SearchFiltersProps {
  initialFilters?: {
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    city?: string;
  };
}

export function SearchFilters({ initialFilters = {} }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    query: initialFilters.query || '',
    category: initialFilters.category || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    city: initialFilters.city || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query string
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.push(`/services?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      query: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      city: '',
    });
    router.push('/services');
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">جستجو</label>
          <Input
            placeholder="عنوان آگهی..."
            value={filters.query}
            onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">دسته‌بندی</label>
          <Select
            value={filters.category}
            onValueChange={value => setFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="همه دسته‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">همه دسته‌ها</SelectItem>
              <SelectItem value="real-estate">املاک</SelectItem>
              <SelectItem value="vehicles">وسایل نقلیه</SelectItem>
              <SelectItem value="electronics">کالای دیجیتال</SelectItem>
              <SelectItem value="home">خانه و آشپزخانه</SelectItem>
              <SelectItem value="services">خدمات</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">محدوده قیمت</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="حداقل"
              value={filters.minPrice}
              onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="حداکثر"
              value={filters.maxPrice}
              onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">شهر</label>
          <Select
            value={filters.city}
            onValueChange={value => setFilters(prev => ({ ...prev, city: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="همه شهرها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">همه شهرها</SelectItem>
              {CITIES.map(city => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            اعمال فیلترها
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            پاک کردن
          </Button>
        </div>
      </form>
    </Card>
  );
}