import { forwardRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface MembershipCardProps {
  name: string;
  memberId: string;
  expiryDate: string;
  registrationDate: string;
  status: 'active' | 'expired' | 'pending';
}

export const MembershipCard = forwardRef<HTMLDivElement, MembershipCardProps>(
  ({ name, memberId, expiryDate, registrationDate, status }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-[400px] aspect-[8/5] rounded-2xl overflow-hidden shadow-2xl relative mx-auto"
        style={{
          background: 'linear-gradient(135deg, #0066B3 0%, #004080 50%, #002855 100%)',
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8">
                  <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="#00A651" />
                  <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="#0066B3" />
                  <text x="50" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                    NHIS
                  </text>
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate">
                  National Health
                </h3>
                <p className="text-white/80 text-xs sm:text-sm truncate">Insurance Scheme</p>
              </div>
            </div>
            {status === 'active' && (
              <div className="flex items-center gap-1 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                ACTIVE
              </div>
            )}
          </div>

          {/* Member Info */}
          <div className="space-y-2 sm:space-y-3 min-w-0">
            <div className="min-w-0">
              <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider">Member Name</p>
              <p className="text-white font-bold text-base sm:text-xl truncate">{name}</p>
            </div>
            <div className="flex justify-between items-end gap-3">
              <div className="min-w-0">
                <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider">Member ID</p>
                <p className="text-white font-mono font-bold tracking-wider text-sm sm:text-base truncate">{memberId}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider">Valid Until</p>
                <p className="text-white font-bold text-sm sm:text-base">{expiryDate}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/20 gap-3">
            <p className="text-white/60 text-[10px] sm:text-xs truncate">Registered: {registrationDate}</p>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-4 sm:w-8 sm:h-5 rounded bg-yellow-400" />
              <div className="w-6 h-4 sm:w-8 sm:h-5 rounded bg-green-500" />
            </div>
          </div>
        </div>

        {/* Ghana Flag Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-green-600" />
        </div>
      </div>
    );
  },
);

MembershipCard.displayName = 'MembershipCard';
