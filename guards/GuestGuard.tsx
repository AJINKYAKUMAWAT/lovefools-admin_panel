import { useEffect, ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const isAuthenticated = Boolean(getCookie('isAuthenticated'));
  const router = useRouter();
  const pathname = usePathname();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null,
  );
  useEffect(() => {
    if (isAuthenticated) {
      // router.push('/'); // Redirect to login if not authenticated
      if (pathname == '/login') {
        router.push('/');
      } else if (
        pathname !== '/login' &&
        requestedLocation &&
        pathname !== requestedLocation
      ) {
        setRequestedLocation(null);
        router.push(requestedLocation);
      }
    }
  }, [isAuthenticated]);

  return !isAuthenticated ? children : null;
}
