import Game from '@/components/Game'
import Header from '@/components/Header'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8">
      <Header />
      <Game />
      <ServiceWorkerRegistration />
    </div>
  )
}
