'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSignInModal } from './sign-in-modal';
import UserDropdown from '@/components/shared/user-dropdown';
import { siteConfig } from '@/config/site';
import { Session } from 'next-auth';

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all`}
      >
        <div className='mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full'>
          <Link href='/' className='flex items-center font-display text-2xl'>
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name + ' logo'}
              width='30'
              height='30'
              className='mr-2 rounded-sm'
            ></Image>
            <p>{siteConfig.name}</p>
          </Link>
          <div>
            {session?.user ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className='rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black'
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}