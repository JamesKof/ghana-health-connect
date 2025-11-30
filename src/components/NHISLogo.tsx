import nhisLogoOfficial from '@/assets/nhis-logo-official.jpg';

interface NHISLogoProps {
  className?: string;
  showText?: boolean;
  inverted?: boolean;
}

export const NHISLogo = ({ 
  className = "h-10 w-auto", 
  showText = true,
  inverted = false 
}: NHISLogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <img 
      src={nhisLogoOfficial} 
      alt="NHIS Ghana Logo" 
      className={`h-full w-auto object-contain ${inverted ? 'brightness-0 invert' : ''}`}
    />
    {showText && (
      <div className="hidden sm:block">
        <p className={`font-display font-bold text-lg leading-tight ${inverted ? 'text-white' : 'text-primary'}`}>
          NHIS
        </p>
        <p className={`text-xs ${inverted ? 'text-white/70' : 'text-muted-foreground'}`}>
          Ghana
        </p>
      </div>
    )}
  </div>
);

// White logo SVG for footer
export const NHISLogoWhite = ({ className = "h-12 w-auto" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield/Cross Symbol */}
    <g>
      <circle cx="30" cy="30" r="26" fill="white" fillOpacity="0.15"/>
      <circle cx="30" cy="30" r="22" stroke="white" strokeWidth="2"/>
      <path 
        d="M30 12L30 48M18 30L42 30" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <circle cx="30" cy="30" r="8" fill="#00A651"/>
    </g>
    
    {/* NHIS Text */}
    <text x="65" y="28" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="22" fill="white">
      NHIS
    </text>
    
    {/* Ghana Text */}
    <text x="65" y="46" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="12" fill="white" fillOpacity="0.7">
      Ghana
    </text>
    
    {/* Tagline */}
    <text x="115" y="28" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="10" fill="white" fillOpacity="0.5">
      National Health
    </text>
    <text x="115" y="42" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="10" fill="white" fillOpacity="0.5">
      Insurance Scheme
    </text>
  </svg>
);
