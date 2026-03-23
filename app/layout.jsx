import './globals.css'
import { ProductsProvider } from '@/context/ProductsContext'

export const metadata = {
  title: 'Euro Lanka — Premium Furniture Accessories',
  description: 'Premium furniture accessories directly imported from China\'s top manufacturers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* TEMP: mobile debug console — remove after fixing */}
        <script src="https://cdn.jsdelivr.net/npm/eruda" />
        <script dangerouslySetInnerHTML={{ __html: 'eruda.init()' }} />
      </head>
      <body>
        <ProductsProvider>
          {children}
        </ProductsProvider>
      </body>
    </html>
  )
}
