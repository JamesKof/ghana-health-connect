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
