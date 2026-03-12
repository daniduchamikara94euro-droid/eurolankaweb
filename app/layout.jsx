import './globals.css'
import { ProductsProvider } from '@/context/ProductsContext'

export const metadata = {
  title: 'Euro Lanka — Premium Furniture Accessories',
  description: 'Premium furniture accessories directly imported from China\'s top manufacturers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductsProvider>
          {children}
        </ProductsProvider>
      </body>
    </html>
  )
}
