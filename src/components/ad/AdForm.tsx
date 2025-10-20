"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { AdFormData } from '@/lib/types';
import { createAd } from '@/lib/db';
import { useAuth } from '@/lib/hooks/useAuth';

const INITIAL_STATE: AdFormData = {
  title: '',
  description: '',
  categoryId: '',
  price: 0,
  images: [],
  location: {
    city: '',
    state: '',
  },
  contactInfo: {
    phone: '',
    whatsapp: false,
    telegram: false,
  },
};

const CITIES = [
  'تهران',
  'مشهد',
  'اصفهان',
  'تبریز',
  'شیراز',
  'کرج',
  'اهواز',
  'قم',
  'کرمانشاه',
  'ارومیه',
];

const CATEGORIES = [
  { id: 'real-estate', name: 'املاک' },
  { id: 'vehicles', name: 'وسایل نقلیه' },
  { id: 'electronics', name: 'کالای دیجیتال' },
  { id: 'services', name: 'خدمات' },
  { id: 'personal', name: 'وسایل شخصی' },
  { id: 'home', name: 'خانه و آشپزخانه' },
];

export default function AdForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AdFormData>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(3, s + 1));
    }
  };

  const prev = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.title && !!formData.categoryId;
      case 2:
        return !!formData.description && !!formData.price;
      default:
        return true;
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const ad = await createAd(formData, user.id);
      if (ad) {
        router.push(`/services/${ad.category_id}/${ad.slug}`);
      }
    } catch (error) {
      console.error('Error creating ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof AdFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progressValue = (step / 3) * 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <Progress value={progressValue} className="h-2" />
        <div className="mt-2 text-sm text-slate-600 text-center">
          مرحله {step} از 3
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} className="space-y-6">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">عنوان آگهی</label>
              <Input
                required
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="عنوان آگهی را وارد کنید..."
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
              <Select
                value={formData.categoryId}
                onValueChange={value => handleChange('categoryId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">قیمت (تومان)</label>
              <Input
                type="number"
                value={formData.price || ''}
                onChange={e => handleChange('price', parseFloat(e.target.value))}
                placeholder="قیمت را وارد کنید..."
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <textarea
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="توضیحات آگهی را وارد کنید..."
                className="w-full min-h-[150px] p-2 border rounded-md"
                required
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">شهر</label>
              <Select
                value={formData.location.city}
                onValueChange={value => handleChange('location', { ...formData.location, city: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="شهر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map(city => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شماره تماس</label>
              <Input
                type="tel"
                value={formData.contactInfo.phone}
                onChange={e => handleChange('contactInfo', { ...formData.contactInfo, phone: e.target.value })}
                placeholder="شماره تماس را وارد کنید..."
                className="w-full"
                dir="ltr"
              />
            </div>

            <div className="mt-4 p-4 bg-slate-100 rounded-md">
              <h3 className="font-medium mb-3">مرور نهایی</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">عنوان:</span> {formData.title}</div>
                <div><span className="font-medium">دسته‌بندی:</span> {CATEGORIES.find(c => c.id === formData.categoryId)?.name}</div>
                <div><span className="font-medium">قیمت:</span> {formData.price?.toLocaleString('fa-IR')} تومان</div>
                <div><span className="font-medium">توضیحات:</span> {formData.description}</div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-4 justify-between mt-6">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prev}>
              مرحله قبل
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={next} className="mr-auto">
              مرحله بعد
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              className="mr-auto"
            >
              {loading ? 'در حال ثبت...' : 'ثبت آگهی'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
