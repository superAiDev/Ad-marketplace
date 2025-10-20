"use client"
import { useState } from 'react'
import { supabase } from '../../../src/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await supabase.auth.signUp({ email, password })
      alert('ثبت‌نام انجام شد — ایمیل تأیید ارسال می‌شود (نمونه)')
    } catch (err) {
      console.error(err)
      alert('خطا در ثبت‌نام')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">ثبت نام</h1>
      <form onSubmit={handleRegister} className="space-y-3">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="رمز عبور" />
        <Button type="submit" disabled={loading}>{loading ? 'در حال ثبت...' : 'ثبت نام'}</Button>
      </form>
    </div>
  )
}
