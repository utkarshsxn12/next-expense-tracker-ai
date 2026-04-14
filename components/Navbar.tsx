'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-blue-300/40 dark:border-blue-700/40 shadow-lg shadow-blue-900/5 dark:shadow-black/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14 sm:h-16'>

          {/* Logo Section */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center gap-2 sm:gap-3 shrink-0 group transition-all duration-300 hover:scale-105'
              onClick={closeMobileMenu}
            >
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10"
              />

              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-200 bg-clip-text text-transparent">
                <span className='hidden sm:inline'>ExpenseTracker AI</span>
                <span className='sm:hidden'>ExpenseTracker</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            <Link
              href='/'
              className='relative text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group'
            >
              <span className='relative z-10'>Home</span>
              <div className='absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
            </Link>

            <Link
              href='/about'
              className='relative text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group'
            >
              <span className='relative z-10'>About</span>
              <div className='absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
            </Link>

            <Link
              href='/contact'
              className='relative text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group'
            >
              <span className='relative z-10'>Contact</span>
              <div className='absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
            </Link>
          </div>

          {/* Right Section */}
          <div className='flex items-center space-x-1 sm:space-x-2'>
            <div className='p-0.5 sm:p-1'>
              <ThemeToggle />
            </div>

            {/* Auth Buttons Desktop */}
            <div className='hidden sm:block'>
              <SignedOut>
                <SignInButton>
                  <button className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95'>
                    <div className='relative z-10 flex items-center gap-1 sm:gap-2'>
                      <span>Sign In</span>
                      <svg
                        className='w-3 h-3 sm:w-4 sm:h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                      </svg>
                    </div>
                    <div className='absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className='p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-blue-100/50 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30'>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className='md:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200 active:scale-95'
              aria-label='Toggle mobile menu'
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className='px-2 pt-2 pb-3 space-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-300/40 dark:border-blue-700/40 mt-2 shadow-lg'>

            <Link
              href='/'
              onClick={closeMobileMenu}
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 text-sm font-medium transition-all active:scale-95'
            >
              <span>🏠</span> Home
            </Link>

            <Link
              href='/about'
              onClick={closeMobileMenu}
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 text-sm font-medium transition-all active:scale-95'
            >
              <span>ℹ️</span> About
            </Link>

            <Link
              href='/contact'
              onClick={closeMobileMenu}
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 text-sm font-medium transition-all active:scale-95'
            >
              <span>📞</span> Contact
            </Link>

            {/* Mobile Auth */}
            <div className='pt-3 border-t border-blue-300/40 dark:border-blue-700/40'>
              <SignedOut>
                <SignInButton>
                  <button
                    onClick={closeMobileMenu}
                    className='w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95'
                  >
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className='flex items-center justify-center p-3 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 border border-blue-300/40 dark:border-blue-700/40'>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}
