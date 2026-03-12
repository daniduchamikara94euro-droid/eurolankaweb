import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import ScrollToTop from '@/components/ScrollToTop'
import CustomCursor from '@/components/CustomCursor'

export default function SiteLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <Loader />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ background: '#020810' }}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
