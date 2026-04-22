import ScrollReveal from '@/components/ScrollReveal'
import GlassCard from '@/components/GlassCard'

const milestones = [
  { year: '1998', title: 'Euro Steel Founded',  desc: 'Euro Steel established in Sri Lanka, laying the foundation for what would become a leading furniture solutions company.' },
  { year: '2005', title: 'Melamine Furniture',  desc: 'Expanded into melamine furniture production, bringing modern manufacturing techniques to Sri Lanka\'s furniture industry.' },
  { year: '2015', title: 'First Shipment',      desc: 'First direct container shipped from China, marking the beginning of our international sourcing journey.' },
  { year: '2020', title: 'Euro Lanka Founded',  desc: 'Euro Lanka established to bring world-class furniture accessories from China\'s top manufacturers directly to Sri Lanka.' },
  { year: '2021', title: 'Quality Program',     desc: 'Launched strict QC program with in-factory inspection before every shipment.' },
  { year: '2022', title: 'Digital Presence',    desc: 'Launched online catalog with 40+ premium product varieties, making our range accessible nationwide.' },
]

const values = [
  { icon: '🏆', title: 'Quality First',   desc: 'We never compromise. Every product is hand-selected and quality-checked.',  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=200&q=80' },
  { icon: '🤝', title: 'Trusted Partner', desc: 'We build long-term relationships, not just transactions.',                   img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&h=200&q=80' },
  { icon: '💡', title: 'Innovation',      desc: 'We continuously source new designs and materials to keep your furniture fresh.', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&h=200&q=80' },
  { icon: '🚢', title: 'Direct Imports',  desc: 'Factory-direct sourcing ensures you get the best quality at the best price.', img: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=400&h=200&q=80' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="section-heading gradient-text">About Euro Lanka</h1>
            <p className="section-sub">Your trusted partner for premium furniture accessories, bridging world-class Chinese manufacturing with Sri Lankan excellence.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl overflow-hidden ring-2 ring-sky-500/30 shadow-2xl shadow-sky-500/10 h-64">
                <img src="/our-story.jpg"
                  alt="Euro Lanka team at China factory visit" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Our journey began in 1998 with Euro Steel, delivering quality furniture solutions across Sri Lanka. In 2005, we expanded into melamine furniture production, and by 2015 we had established our first direct shipment from China.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  In 2020, Euro Lanka was founded to bring world-class furniture accessories directly from China's top manufacturers to Sri Lanka's furniture industry, building on over two decades of expertise.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15}>
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">🇨🇳</span> China Import Excellence
              </h3>
              <div className="space-y-4">
                {[
                  { icon: '🏭', text: 'Direct partnerships with 15+ Chinese factories' },
                  { icon: '🔍', text: 'In-factory quality inspection before every shipment' },
                  { icon: '📦', text: 'Regular container shipments — new stock monthly' },
                  { icon: '💎', text: 'ISO-certified manufacturing partners' },
                  { icon: '🌐', text: 'Sourced from Guangzhou, Foshan & Shenzhen' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-slate-300">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <h2 className="section-heading gradient-text">Our Values</h2>
          <p className="section-sub">The principles that drive everything we do.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.12}>
              <GlassCard className="overflow-hidden h-full hover:border-sky-500/30 transition-all duration-300 group">
                <div className="h-36 overflow-hidden relative">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-3xl">{v.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold mb-2 group-hover:text-sky-400 transition-colors">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h2 className="section-heading gradient-text">Our Journey</h2>
          <p className="section-sub">Key milestones that shaped Euro Lanka.</p>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-blue-600/30 to-transparent" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.1}>
                <div className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 ring-4 ring-sky-500/20 z-10" />
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-8 md:text-right md:w-1/2' : 'md:pl-8 md:w-1/2'}`}>
                    <GlassCard className="p-6 inline-block w-full hover:border-sky-500/30 transition-all duration-300">
                      <span className="text-sky-400 font-black text-2xl">{m.year}</span>
                      <h3 className="text-white font-bold mt-1 mb-2">{m.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                    </GlassCard>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
