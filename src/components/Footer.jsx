import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-sky-500/40">
              <img src="/logo.png" alt="Euro Lanka" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-lg gradient-text">Euro Lanka</span>
              <p className="text-[10px] text-slate-500 leading-none tracking-widest uppercase">Imported Design Excellence</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Premium furniture accessories directly sourced from China, delivering quality and elegance to Sri Lanka.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-2">
            {['/', '/products', '/about', '/contact'].map((path, i) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-slate-400 hover:text-sky-400 text-sm transition-colors"
                >
                  {['Home', 'Products', 'About Us', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>📍 Sri Lanka</li>
            <li>📞 +94 XX XXX XXXX</li>
            <li>✉️ info@eurolanka.lk</li>
            <li className="flex items-center gap-2 pt-2">
              <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">🇨🇳 Direct China Imports</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 text-center py-4 text-xs text-slate-600">
        © {new Date().getFullYear()} Euro Lanka. All rights reserved.
      </div>
    </footer>
  )
}
