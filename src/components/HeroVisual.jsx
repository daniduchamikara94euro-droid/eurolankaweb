import { motion } from 'framer-motion'

/* Floating card helper */
function FloatCard({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={className}
      style={style}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* Single product chip */
function Chip({ emoji, label, delay }) {
  return (
    <FloatCard delay={delay}>
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold text-white backdrop-blur-xl"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{emoji}</span>
        {label}
      </div>
    </FloatCard>
  )
}

/* Stats pill */
function StatPill({ value, label, color, delay }) {
  return (
    <FloatCard delay={delay}>
      <div
        className="px-4 py-3 rounded-2xl backdrop-blur-xl text-center"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${color}40`,
          boxShadow: `0 0 20px ${color}20, 0 8px 30px rgba(0,0,0,0.5)`,
        }}
      >
        <div className="text-xl font-black" style={{ color }}>{value}</div>
        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{label}</div>
      </div>
    </FloatCard>
  )
}

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full select-none" style={{ perspective: '1000px' }}>

      {/* ── Ambient glow behind everything ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '340px', height: '340px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(129,140,248,0.1) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Main hero card — large central image ── */}
      <FloatCard delay={0.1} className="absolute" style={{ top: '5%', left: '8%', right: '8%' }}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            transform: 'rotateX(4deg) rotateY(-6deg)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(14,165,233,0.2), 0 0 60px rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.2)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&h=380&q=85"
            alt="Premium Cabinet Hardware"
            className="w-full object-cover"
            style={{ height: '220px', display: 'block', filter: 'brightness(0.8) contrast(1.05)' }}
          />
          {/* Overlay label */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4"
            style={{ background: 'linear-gradient(to top, rgba(2,8,16,0.95) 0%, transparent 100%)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">Premium Cabinet Handles</p>
                <p className="text-slate-400 text-xs">Stainless Steel · Brushed Finish</p>
              </div>
              <div
                className="px-3 py-1 rounded-lg text-xs font-bold text-sky-400"
                style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)' }}
              >
                LKR 450+
              </div>
            </div>
          </div>
        </div>
      </FloatCard>

      {/* ── Bottom row: two product cards ── */}
      <div className="absolute bottom-[12%] left-[4%] right-[4%] flex gap-4">
        {/* Hinge card */}
        <FloatCard delay={0.3} className="flex-1">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              transform: 'rotateX(2deg) rotateY(4deg)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(129,140,248,0.25)',
              border: '1px solid rgba(129,140,248,0.2)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=300&h=160&q=80"
              alt="Soft-Close Hinges"
              className="w-full object-cover"
              style={{ height: '110px', display: 'block', filter: 'brightness(0.75)' }}
            />
            <div
              className="px-3 py-2"
              style={{ background: 'rgba(2,8,16,0.95)' }}
            >
              <p className="text-white text-xs font-semibold">Soft-Close Hinges</p>
              <p className="text-indigo-400 text-[10px]">LKR 280+</p>
            </div>
          </div>
        </FloatCard>

        {/* Drawer Slides card */}
        <FloatCard delay={0.45} className="flex-1">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              transform: 'rotateX(2deg) rotateY(-3deg)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.25)',
              border: '1px solid rgba(168,85,247,0.2)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&h=160&q=80"
              alt="Furniture Legs"
              className="w-full object-cover"
              style={{ height: '110px', display: 'block', filter: 'brightness(0.75)' }}
            />
            <div
              className="px-3 py-2"
              style={{ background: 'rgba(2,8,16,0.95)' }}
            >
              <p className="text-white text-xs font-semibold">Furniture Legs</p>
              <p className="text-purple-400 text-[10px]">LKR 980+</p>
            </div>
          </div>
        </FloatCard>
      </div>

      {/* ── Floating stat pills ── */}
      <div className="absolute -top-2 right-0">
        <StatPill value="500+" label="Products" color="#0ea5e9" delay={0.6} />
      </div>
      <div className="absolute top-[38%] -right-2">
        <StatPill value="1200+" label="Clients" color="#818cf8" delay={0.75} />
      </div>

      {/* ── Floating category chips ── */}
      <div className="absolute top-[58%] -left-2">
        <Chip emoji="🔩" label="Hinges" delay={0.5} />
      </div>
      <div className="absolute bottom-[6%] right-0">
        <Chip emoji="✨" label="Bar Pulls" delay={0.65} />
      </div>

      {/* ── Quality badge ── */}
      <FloatCard
        delay={0.8}
        className="absolute"
        style={{ top: '72%', left: '-4px' }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            boxShadow: '0 0 20px rgba(16,185,129,0.15)',
          }}
        >
          <span className="text-green-400 text-sm">✓</span>
          <span className="text-green-400 text-xs font-semibold">Quality Inspected</span>
        </div>
      </FloatCard>

      {/* ── Decorative corner lines ── */}
      <div className="absolute top-4 left-4 w-8 h-8 pointer-events-none"
        style={{ borderTop: '2px solid rgba(14,165,233,0.4)', borderLeft: '2px solid rgba(14,165,233,0.4)', borderRadius: '4px 0 0 0' }} />
      <div className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none"
        style={{ borderBottom: '2px solid rgba(168,85,247,0.4)', borderRight: '2px solid rgba(168,85,247,0.4)', borderRadius: '0 0 4px 0' }} />
    </div>
  )
}
