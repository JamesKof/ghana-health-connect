import { createContext, useContext, useState, ReactNode } from 'react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  memberId: string;
  membershipStatus: 'active' | 'expired' | 'pending';
  expiryDate: string;
  registrationDate: string;
}

interface ClaimRecord {
  id: string;
  date: string;
  facility: string;
  service: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
}

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

interface DemoAuthContextType {
  user: DemoUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  claims: ClaimRecord[];
  payments: PaymentRecord[];
}

const mockUser: DemoUser = {
  id: 'demo-user-001',
  email: 'demo@nhis.gov.gh',
  name: 'Kwame Asante',
  memberId: 'NHIS-GH-2024-001234',
  membershipStatus: 'active',
  expiryDate: '2025-12-31',
  registrationDate: '2020-03-15',
};

const mockClaims: ClaimRecord[] = [
  {
    id: 'CLM-001',
    date: '2024-11-15',
    facility: 'Korle Bu Teaching Hospital',
    service: 'General Consultation',
    amount: 150,
    status: 'approved',
  },
  {
    id: 'CLM-002',
    date: '2024-10-22',
    facility: 'Ridge Hospital',
    service: 'Laboratory Tests',
    amount: 320,
    status: 'approved',
  },
  {
    id: 'CLM-003',
    date: '2024-09-08',
    facility: '37 Military Hospital',
    service: 'Medication',
    amount: 85,
    status: 'approved',
  },
  {
    id: 'CLM-004',
    date: '2024-08-30',
    facility: 'Tema General Hospital',
    service: 'X-Ray',
    amount: 200,
    status: 'pending',
  },
  {
    id: 'CLM-005',
    date: '2024-07-12',
    facility: 'Accra Regional Hospital',
    service: 'Dental Care',
    amount: 450,
    status: 'rejected',
  },
];

const mockPayments: PaymentRecord[] = [
  {
    id: 'PAY-001',
    date: '2024-01-05',
    amount: 72,
    method: 'Mobile Money',
    reference: 'MTN-2024010500123',
    status: 'completed',
  },
  {
    id: 'PAY-002',
    date: '2023-01-10',
    amount: 65,
    method: 'Bank Transfer',
    reference: 'GCB-2023011000456',
    status: 'completed',
  },
  {
    id: 'PAY-003',
    date: '2022-01-08',
    amount: 60,
    method: 'Mobile Money',
    reference: 'VOD-2022010800789',
    status: 'completed',
  },
];

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export const DemoAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DemoUser | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Demo mode - accept any credentials
    setUser({
      ...mockUser,
      email: email || mockUser.email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <DemoAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        claims: mockClaims,
        payments: mockPayments,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
};

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};
