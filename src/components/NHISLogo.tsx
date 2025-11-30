export const NHISLogo = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#0066B3"/>
    <path d="M12 14h4v12h-4v-12zm8 0h4v12h-4v-12zm-4 4h4v4h-4v-4z" fill="white"/>
    <circle cx="20" cy="20" r="6" fill="#00A651"/>
    <text x="45" y="18" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="14" fill="#0066B3">NHIS</text>
    <text x="45" y="32" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="8" fill="#666">Ghana</text>
  </svg>
);
