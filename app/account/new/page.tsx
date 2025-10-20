import AdForm from '../../../src/components/ad/AdForm'

export default function NewAdPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold">درج آگهی جدید</h1>
      <div className="mt-4 max-w-2xl">
        <AdForm />
      </div>
    </div>
  )
}

