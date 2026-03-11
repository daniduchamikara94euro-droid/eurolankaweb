import { createContext, useContext, useState, useEffect } from 'react'

const IMG = {
  silver:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&h=400&q=80',
  gold:     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&h=400&q=80',
  hinges:   'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=500&h=400&q=80',
  dark:     'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=500&h=400&q=80',
  drawer:   'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&h=400&q=80',
  wood:     'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&h=400&q=80',
  wardrobe: 'https://images.unsplash.com/photo-1631679706909-1ca012191356?auto=format&fit=crop&w=500&h=400&q=80',
  shelf:    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&h=400&q=80',
  furniture:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&h=400&q=80',
  hairpin:  'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=500&h=400&q=80',
  lock:     'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=400&q=80',
  minimal:  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&h=400&q=80',
}

const SEED_PRODUCTS = [
  {
    id: 1, name: 'Luxury Cabinet Handles', category: 'Handles', emoji: '🪝', price: 'LKR 450+',
    img: IMG.silver,
    description: 'Sleek stainless steel handles with brushed finish for modern kitchens and wardrobes.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',        hex: '#b8bfc7', img: IMG.silver   },
        { label: 'Matte Black',   hex: '#2a2a2a', img: IMG.dark     },
        { label: 'Gold',          hex: '#c9a84c', img: IMG.gold     },
        { label: 'Brushed Nickel',hex: '#8c8c8c', img: IMG.hinges   },
      ]},
      { name: 'Length', type: 'size', options: ['96mm', '128mm', '160mm', '192mm', '256mm'] },
    ],
  },
  {
    id: 2, name: 'Gold Finish Bar Pulls', category: 'Handles', emoji: '✨', price: 'LKR 620+',
    img: IMG.gold,
    description: 'Elegant gold-finish bar pulls that add a luxury touch to any cabinet or drawer.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Gold',     hex: '#c9a84c', img: IMG.gold      },
        { label: 'Rose Gold',hex: '#b76e79', img: IMG.shelf     },
        { label: 'Chrome',   hex: '#b8bfc7', img: IMG.silver    },
        { label: 'Bronze',   hex: '#8b5e3c', img: IMG.furniture },
      ]},
      { name: 'Length', type: 'size', options: ['128mm', '192mm', '256mm', '320mm', '480mm'] },
    ],
  },
  {
    id: 3, name: 'Soft-Close Hinges', category: 'Hinges', emoji: '🔩', price: 'LKR 280+',
    img: IMG.hinges,
    description: 'Hydraulic soft-close hinges that prevent slamming. Compatible with standard cabinet doors.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',     hex: '#b8bfc7', img: IMG.hinges },
        { label: 'Nickel',     hex: '#a8a9ad', img: IMG.shelf  },
        { label: 'Matte Black',hex: '#2a2a2a', img: IMG.dark   },
      ]},
      { name: 'Overlay', type: 'type', options: ['Full Overlay', 'Half Overlay', 'Inset'] },
    ],
  },
  {
    id: 4, name: 'Concealed Cup Hinges', category: 'Hinges', emoji: '⚙️', price: 'LKR 320+',
    img: IMG.dark,
    description: 'Concealed cup hinges for a clean, seamless look on overlay and inset doors.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',     hex: '#b8bfc7', img: IMG.dark   },
        { label: 'Nickel',     hex: '#a8a9ad', img: IMG.hinges },
        { label: 'Matte Black',hex: '#2a2a2a', img: IMG.lock   },
      ]},
      { name: 'Opening Angle', type: 'type', options: ['100°', '110°', '165°'] },
    ],
  },
  {
    id: 5, name: 'Full-Extension Drawer Slides', category: 'Slides', emoji: '📦', price: 'LKR 650+',
    img: IMG.drawer,
    description: 'Full-extension ball-bearing slides with smooth, silent operation for any drawer.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'White', hex: '#e8e8e8', img: IMG.minimal },
        { label: 'Silver',hex: '#c0c0c0', img: IMG.drawer  },
        { label: 'Black', hex: '#2a2a2a', img: IMG.dark    },
      ]},
      { name: 'Length', type: 'size', options: ['300mm', '350mm', '400mm', '450mm', '500mm', '600mm'] },
    ],
  },
  {
    id: 6, name: 'Undermount Drawer Slides', category: 'Slides', emoji: '🗂️', price: 'LKR 850+',
    img: IMG.wood,
    description: 'Undermount slides that are completely hidden for a premium, modern aesthetic.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Silver',hex: '#c0c0c0', img: IMG.wood },
        { label: 'Black', hex: '#2a2a2a', img: IMG.dark },
      ]},
      { name: 'Length', type: 'size', options: ['300mm', '400mm', '500mm', '600mm'] },
      { name: 'Type', type: 'type', options: ['Standard', 'Heavy Duty', 'Soft-Close'] },
    ],
  },
  {
    id: 7, name: 'Wardrobe Rail System', category: 'Fittings', emoji: '🏠', price: 'LKR 1200+',
    img: IMG.wardrobe,
    description: 'Complete wardrobe rail with brackets, end caps, and support systems.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',    hex: '#b8bfc7', img: IMG.wardrobe },
        { label: 'Matte Black',hex: '#2a2a2a', img: IMG.dark    },
        { label: 'Gold',      hex: '#c9a84c', img: IMG.gold     },
      ]},
      { name: 'Diameter', type: 'size', options: ['16mm', '19mm', '25mm'] },
    ],
  },
  {
    id: 8, name: 'Shelf Support Pins', category: 'Fittings', emoji: '📌', price: 'LKR 120+',
    img: IMG.shelf,
    description: 'Sturdy metal shelf support pins in various sizes for adjustable shelving.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',hex: '#b8bfc7', img: IMG.shelf   },
        { label: 'Nickel',hex: '#a8a9ad', img: IMG.hinges  },
        { label: 'Black', hex: '#2a2a2a', img: IMG.dark    },
        { label: 'White', hex: '#e8e8e8', img: IMG.minimal },
      ]},
      { name: 'Size', type: 'size', options: ['5mm', '6mm', '7mm', '8mm'] },
    ],
  },
  {
    id: 9, name: 'Furniture Legs Set', category: 'Legs', emoji: '🪑', price: 'LKR 980+',
    img: IMG.furniture,
    description: 'Adjustable metal furniture legs in chrome, matte black, and gold finish.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',    hex: '#b8bfc7', img: IMG.furniture },
        { label: 'Matte Black',hex: '#2a2a2a', img: IMG.dark     },
        { label: 'Gold',      hex: '#c9a84c', img: IMG.gold      },
        { label: 'Silver',    hex: '#c0c0c0', img: IMG.silver    },
      ]},
      { name: 'Height', type: 'size', options: ['100mm', '150mm', '200mm', '250mm'] },
      { name: 'Shape', type: 'type', options: ['Round', 'Square', 'Tapered'] },
    ],
  },
  {
    id: 10, name: 'Hairpin Legs', category: 'Legs', emoji: '⚡', price: 'LKR 1400+',
    img: IMG.hairpin,
    description: 'Industrial-style hairpin legs in steel — perfect for tables and benches.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Black', hex: '#1a1a1a', img: IMG.hairpin   },
        { label: 'Chrome',hex: '#b8bfc7', img: IMG.silver    },
        { label: 'Copper',hex: '#b87333', img: IMG.furniture },
        { label: 'White', hex: '#e8e8e8', img: IMG.minimal   },
      ]},
      { name: 'Height', type: 'size', options: ['200mm', '400mm', '710mm'] },
      { name: 'Pins', type: 'type', options: ['2-Pin', '3-Pin'] },
    ],
  },
  {
    id: 11, name: 'Magnetic Door Catches', category: 'Locks', emoji: '🔐', price: 'LKR 180+',
    img: IMG.lock,
    description: 'Strong magnetic catches for cabinet doors, whisper-quiet closing.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',hex: '#b8bfc7', img: IMG.lock    },
        { label: 'Nickel',hex: '#a8a9ad', img: IMG.hinges  },
        { label: 'Black', hex: '#2a2a2a', img: IMG.dark    },
        { label: 'White', hex: '#e8e8e8', img: IMG.minimal },
      ]},
      { name: 'Strength', type: 'type', options: ['1kg', '2kg', '4kg', '8kg'] },
    ],
  },
  {
    id: 12, name: 'Push-to-Open Latch', category: 'Locks', emoji: '🔓', price: 'LKR 240+',
    img: IMG.minimal,
    description: 'Handle-free push-to-open latches for a minimal, touch-only design.',
    variants: [
      { name: 'Finish', type: 'color', options: [
        { label: 'Chrome',hex: '#b8bfc7', img: IMG.minimal },
        { label: 'Silver',hex: '#c0c0c0', img: IMG.silver  },
        { label: 'Black', hex: '#2a2a2a', img: IMG.dark    },
      ]},
      { name: 'Type', type: 'type', options: ['Standard', 'Heavy Duty', 'Soft-Close'] },
    ],
  },
]

const SEED_FEATURED = [1, 3, 5, 7]

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('elw_products')
      return stored ? JSON.parse(stored) : SEED_PRODUCTS
    } catch {
      return SEED_PRODUCTS
    }
  })

  const [featuredIds, setFeaturedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('elw_featured')
      return stored ? JSON.parse(stored) : SEED_FEATURED
    } catch {
      return SEED_FEATURED
    }
  })

  useEffect(() => {
    localStorage.setItem('elw_products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('elw_featured', JSON.stringify(featuredIds))
  }, [featuredIds])

  const generateId = () => {
    if (products.length === 0) return 1
    return Math.max(...products.map(p => p.id)) + 1
  }

  const addProduct = (product) => {
    const newProduct = { ...product, id: generateId() }
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setFeaturedIds(prev => prev.filter(fid => fid !== id))
  }

  const setFeatured = (id, featured) => {
    setFeaturedIds(prev => {
      if (featured) {
        if (prev.includes(id)) return prev
        if (prev.length >= 4) return prev
        return [...prev, id]
      } else {
        return prev.filter(fid => fid !== id)
      }
    })
  }

  return (
    <ProductsContext.Provider value={{ products, featuredIds, addProduct, updateProduct, deleteProduct, setFeatured }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
