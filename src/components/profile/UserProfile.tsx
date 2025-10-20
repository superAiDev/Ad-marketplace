'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/lib/db';

interface UserProfileProps {
  user: User;
  profile: Profile | null;
}

export default function UserProfile({ user, profile }: UserProfileProps) {
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    avatar_url: profile?.avatar_url || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user.id, formData);
      alert('پروفایل با موفقیت به‌روزرسانی شد');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('خطا در به‌روزرسانی پروفایل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">ویرایش پروفایل</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ایمیل</label>
          <Input
            value={user.email}
            disabled
            className="bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">نام کاربری</label>
          <Input
            value={formData.username}
            onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
            placeholder="نام کاربری خود را وارد کنید"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">نام کامل</label>
          <Input
            value={formData.full_name}
            onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">شماره تماس</label>
          <Input
            value={formData.phone}
            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="شماره تماس خود را وارد کنید"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">تصویر پروفایل</label>
          <Input
            value={formData.avatar_url}
            onChange={e => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
            placeholder="لینک تصویر پروفایل"
            dir="ltr"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'در حال به‌روزرسانی...' : 'ذخیره تغییرات'}
        </Button>
      </form>
    </Card>
  );
}