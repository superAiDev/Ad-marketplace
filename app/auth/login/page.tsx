"use client"
import { useState } from 'react'
import { supabase } from '../../../src/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await supabase.auth.signInWithOtp({ email })
      alert('ایمیل ورود ارسال شد (در نسخه نمونه).')
    } catch (err) {
      console.error(err)
      alert('خطا در ارسال ایمیل')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">ورود</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" />
        <Button type="submit" disabled={loading}>{loading ? 'در حال ارسال...' : 'ارسال لینک ورود'}</Button>
      </form>
    </div>
  )
}
