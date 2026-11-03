/**
 * Anime-style illustration of Tanmoy, drawn from the traits in /public/profile.webp:
 * swept black hair, short beard, warm brown skin, grey blazer over a black shirt.
 * His everyday glasses become shades, plus a thumbs-up.
 *
 * To swap in a commissioned illustration later, replace this component's body with
 * <img src="/avatar-anime.webp" /> and keep the glint overlay, or drop it entirely.
 */
export function AnimeAvatar({ className }: { className?: string }) {
  const ink = "#0f0f1a"
  return (
    <svg viewBox="0 0 300 360" className={className} role="img" aria-label="Anime-style Tanmoy in sunglasses giving a thumbs-up">
      <defs>
        <radialGradient id="av-bg" cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#f5d76e" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#d4af37" stopOpacity="0.18" />
          <stop offset="1" stopColor="#1a1a2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="av-lens" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#2b2545" />
          <stop offset="1" stopColor="#07070d" />
        </linearGradient>
        <linearGradient id="av-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bd875d" />
          <stop offset="1" stopColor="#a06c47" />
        </linearGradient>
        <clipPath id="av-lenses">
          <path d="M108 146 H144 Q147 171 127 173 Q109 173 107 158 Z" />
          <path d="M192 146 H156 Q153 171 173 173 Q191 173 193 158 Z" />
        </clipPath>
      </defs>

      <rect width="300" height="360" fill="#1a1a2e" />
      <rect width="300" height="360" fill="url(#av-bg)" />
      {/* anime speed lines */}
      <g className="av-rays" stroke="#d4af37" strokeOpacity="0.18" strokeWidth="2">
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2
          return <line key={i} x1={Math.round(150 + Math.cos(a) * 120)} y1={Math.round(150 + Math.sin(a) * 120)} x2={Math.round(150 + Math.cos(a) * 260)} y2={Math.round(150 + Math.sin(a) * 260)} />
        })}
      </g>

      {/* body */}
      <path d="M36 360 C46 282 92 254 150 250 C208 254 254 282 264 360 Z" fill="#8f8f99" stroke={ink} strokeWidth="2.5" />
      <path d="M121 252 L150 322 L179 252 Z" fill="#141420" />
      <path d="M119 251 L150 320 L104 292 L112 258 Z" fill="#787883" stroke={ink} strokeWidth="2" />
      <path d="M181 251 L150 320 L196 292 L188 258 Z" fill="#787883" stroke={ink} strokeWidth="2" />
      <path d="M131 214 L169 214 L171 254 Q150 266 129 254 Z" fill="#93623f" stroke={ink} strokeWidth="2" />

      {/* ears + face */}
      <ellipse cx="101" cy="162" rx="9" ry="14" fill="#a06c47" stroke={ink} strokeWidth="2" />
      <ellipse cx="199" cy="162" rx="9" ry="14" fill="#a06c47" stroke={ink} strokeWidth="2" />
      <path d="M100 128 C100 86 200 86 200 128 L198 176 C195 211 175 233 150 235 C125 233 105 211 102 176 Z" fill="url(#av-skin)" stroke={ink} strokeWidth="2.5" />
      {/* cheek blush */}
      <ellipse cx="118" cy="186" rx="9" ry="4" fill="#e07a5f" opacity="0.35" />
      <ellipse cx="182" cy="186" rx="9" ry="4" fill="#e07a5f" opacity="0.35" />

      {/* beard + moustache */}
      <path d="M104 180 C108 216 128 238 150 240 C172 238 192 216 196 180 C188 202 175 214 150 216 C125 214 112 202 104 180 Z" fill="#2e211b" />
      <path d="M131 197 Q150 188 169 197 Q150 202 131 197 Z" fill="#2e211b" />
      {/* confident grin */}
      <path d="M137 205 Q152 220 167 203 Q152 211 137 205 Z" fill="#fff" stroke="#5a2e20" strokeWidth="2" strokeLinejoin="round" />

      {/* hair: swept spikes */}
      <path
        d="M95 152 C86 110 100 70 140 61 C172 55 206 70 211 110 C213 130 207 146 204 152 L199 121 L189 133 L183 107 L168 122 L161 98 L146 117 L136 96 L124 119 L114 102 L106 131 Z"
        fill="#15131c"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M128 72 Q160 64 188 80 Q160 73 131 78 Z" fill="#4a4366" />
      <path d="M111 137 L141 132" stroke="#15131c" strokeWidth="5" strokeLinecap="round" />
      <path d="M159 132 L189 137" stroke="#15131c" strokeWidth="5" strokeLinecap="round" />

      {/* sunglasses */}
      <path d="M100 150 L108 148 M192 148 L200 150" stroke="#d4af37" strokeWidth="2.5" />
      <path d="M144 149 Q150 145 156 149" stroke="#d4af37" strokeWidth="3" fill="none" />
      <g stroke="#d4af37" strokeWidth="2.5" fill="url(#av-lens)">
        <path d="M108 146 H144 Q147 171 127 173 Q109 173 107 158 Z" />
        <path d="M192 146 H156 Q153 171 173 173 Q191 173 193 158 Z" />
      </g>
      {/* static reflection + animated glint sweep, clipped to the lenses */}
      <g clipPath="url(#av-lenses)">
        <path d="M112 150 L122 150 L114 166 Z M160 150 L170 150 L162 166 Z" fill="#fff" opacity="0.18" />
        <g className="av-glint">
          <rect x="-30" y="120" width="14" height="80" fill="#fff" opacity="0.9" transform="rotate(28 0 160)" />
          <rect x="-10" y="120" width="5" height="80" fill="#fff" opacity="0.7" transform="rotate(28 0 160)" />
        </g>
      </g>
      {/* sparkle star that pops off the right lens */}
      <g className="av-sparkle" transform="translate(190 146)">
        <path d="M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z" fill="#fff" />
        <circle r="2.5" fill="#ffe500" />
      </g>

      {/* thumbs-up */}
      <g className="av-thumb" stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M200 318 H252 V360 H200 Z" fill="#8f8f99" />
        <path d="M198 312 H254 V322 H198 Z" fill="#141420" />
        <path d="M214 272 C211 250 214 230 225 227 C236 225 240 236 235 251 L233 272 Z" fill="url(#av-skin)" />
        <rect x="196" y="268" width="56" height="48" rx="12" fill="url(#av-skin)" />
        <path d="M200 282 H232 M200 294 H234 M200 305 H232" stroke="#7a4f33" strokeWidth="2" />
      </g>
      <g className="av-twinkle" fill="#ffe500">
        <path d="M262 236 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" />
        <path d="M272 286 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" />
      </g>

      <style>{`
        .av-glint { animation: av-glint 3.2s cubic-bezier(.7,0,.3,1) infinite; }
        @keyframes av-glint { 0%, 30% { transform: translateX(80px); } 60%, 100% { transform: translateX(260px); } }
        .av-sparkle { transform-box: fill-box; transform-origin: center; animation: av-sparkle 3.2s ease-out infinite; }
        @keyframes av-sparkle {
          0%, 52% { transform: translate(190px,146px) scale(0) rotate(0); opacity: 0; }
          60% { transform: translate(190px,146px) scale(1.2) rotate(45deg); opacity: 1; }
          75%, 100% { transform: translate(190px,146px) scale(0) rotate(90deg); opacity: 0; }
        }
        .av-thumb { transform-box: fill-box; transform-origin: 50% 100%; animation: av-thumb 2.4s ease-in-out infinite; }
        @keyframes av-thumb { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-6deg) translateY(-3px); } }
        .av-twinkle { animation: av-twinkle 1.6s ease-in-out infinite; }
        @keyframes av-twinkle { 50% { opacity: 0.2; } }
        .av-rays { transform-origin: 150px 150px; animation: av-rays 30s linear infinite; }
        @keyframes av-rays { to { transform: rotate(360deg); } }
      `}</style>
    </svg>
  )
}
