'use client';

const ContactPage = () => {
  return (
    <div className='font-sans bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen'>

      {/* Hero Section */}
      <section className='relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/10 dark:from-blue-900/30 dark:via-blue-900/20 dark:to-blue-900/30'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10'></div>

        <div className='relative z-10 max-w-4xl mx-auto w-full'>
          {/* Blue Badge */}
          <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg'>
            <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse'></span>
            Get in Touch
          </div>

          {/* Title */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight'>
            Contact{' '}
            <span className='bg-gradient-to-r from-[#00AEEF] via-[#0096D1] to-[#007EAA] bg-clip-text text-transparent'>
              ExpenseTracker AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0'>
            Have questions about AI-powered expense tracking or need help?
            We're here to assist you with intelligent financial management.
          </p>

          {/* Buttons */}
          <div className='mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0'>

            {/* Email Button */}
            <a
              href='mailto:utkarshsxn12@gmail.com'
              className='group relative overflow-hidden bg-gradient-to-r from-[#00AEEF] via-[#0096D1] to-[#007EAA] hover:from-[#0096D1] hover:via-[#007EAA] hover:to-[#006688] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5'
            >
              <span className='relative z-10 flex items-center justify-center gap-2'>
                Send us an Email
                <span className='text-lg'>✉️</span>
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
            </a>

            {/* Call Button */}
            <a
              href='tel:+11234567890'
              className='group border-2 border-blue-500/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2'
            >
              Call Us
              <span className='text-lg'>📞</span>
            </a>

          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden'>
        
        {/* Blue Top Strip */}
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00AEEF] via-[#0096D1] to-[#007EAA]'></div>

        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-10 sm:mb-12 md:mb-16'>

            {/* Blue Badge */}
            <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6'>
              <span className='w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full'></span>
              Contact Information
            </div>

            {/* Title */}
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0'>
              Multiple Ways to{' '}
              <span className='text-blue-600 dark:text-blue-400'>Connect</span>
            </h2>

            <p className='text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0'>
              Choose the most convenient way to reach our ExpenseTracker AI support team.
            </p>

          </div>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>

            {/* Email Card */}
            <div className='group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-center'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-400/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center text-white text-xl shadow-lg mx-auto mb-6'>✉️</div>

                <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3'>Email Support</h3>

                <p className='text-gray-600 dark:text-gray-400 mb-4'>We typically respond within 24 hours.</p>

                <a href='mailto:utkarshsxn12@gmail.com'
                  className='text-blue-600 dark:text-blue-400 hover:underline font-medium'>
                  utkarshsxn12@gmail.com →
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className='group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-center'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center text-white text-xl shadow-lg mx-auto mb-6'>📞</div>

                <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3'>Phone Support</h3>

                <p className='text-gray-600 dark:text-gray-400 mb-4'>Speak directly with our team.<br />(not functional)</p>

                <a href='tel:+11234567890'
                  className='text-blue-600 dark:text-blue-400 hover:underline font-medium'>
                  +1 (123) 456-7890 →
                </a>
              </div>
            </div>

            {/* Office Card */}
            <div className='group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-center sm:col-span-2 lg:col-span-1'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center text-white text-xl shadow-lg mx-auto mb-6'>📍</div>

                <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3'>Office Location</h3>

                <p className='text-gray-600 dark:text-gray-400 mb-4'>Visit us at our headquarters.</p>

                <div className='font-medium text-blue-700 dark:text-blue-300'>
                  N/A
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Support Hours & FAQ */}
      <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20'>
        <div className='max-w-4xl mx-auto'>

          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-6'>
              <span className='w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full'></span>
              Support Information
            </div>

            <h2 className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
              We’re Here to <span className='text-blue-600 dark:text-blue-400'>Help</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

            {/* Support Hours */}
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-lg flex items-center justify-center text-white shadow-lg'>
                  🕒
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Support Hours</h3>
              </div>

              <div className='space-y-2 text-gray-600 dark:text-gray-400 text-sm'>
                <div className='flex justify-between'>
                  <span>Mon - Fri:</span><span className='font-medium'>9 AM – 6 PM PST</span>
                </div>
                <div className='flex justify-between'>
                  <span>Saturday:</span><span className='font-medium'>10 AM – 4 PM PST</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sunday:</span><span className='font-medium'>Closed</span>
                </div>
              </div>

              <div className='mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-xs text-blue-700 dark:text-blue-300'>
                Email support available 24/7 (Responses within 24 hours)
              </div>
            </div>

            {/* Quick Help */}
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-700/50'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-lg flex items-center justify-center text-white shadow-lg'>
                  ❓
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Quick Help</h3>
              </div>

              <div className='space-y-3'>
                <div className='p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                  <h4 className='font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1'>Technical Issues</h4>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>App not working? Start here.</p>
                </div>

                <div className='p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                  <h4 className='font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1'>AI Features</h4>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>Learn how our AI insights work.</p>
                </div>

                <div className='p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                  <h4 className='font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1'>Account & Billing</h4>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>Need help with your account?</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
