import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
  return (
    <div className='font-sans bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 text-gray-800 dark:text-gray-200 transition-all duration-300 min-h-screen'>
      
      {/* Hero Section */}
      <section className='relative overflow-hidden flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/10 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/30'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10'></div>
        
        <div className='relative z-10 max-w-4xl mx-auto w-full'>

          {/* Blue Badge */}
          <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg'>
            <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 dark:bg-blue-300 rounded-full animate-pulse'></span>
            <span className='hidden sm:inline'>AI-Powered Financial Management</span>
            <span className='sm:hidden'>AI Financial Management</span>
          </div>

          {/* Heading */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight'>
            Welcome to{" "}
            <span className='bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent'>
              ExpenseTracker AI
            </span>
          </h1>

          <p className='text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0'>
            Track your expenses, manage your budget, and get AI-powered insights
            to take control of your finances with intelligent automation.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2 sm:px-0'>
            <SignInButton>
              <button className='group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-0.5'>
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  Get Started Free
                  <span className='text-lg'>→</span>
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
              </button>
            </SignInButton>

            <button className='group border-2 border-blue-500/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 backdrop-blur-sm'>
              Learn More
            </button>
          </div>

          {/* FEATURE HIGHLIGHTS */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0'>
            
            {/* Card 1 */}
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-200/40 dark:border-blue-700/40'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 mx-auto'>
                <span className='text-white text-base sm:text-lg'>🤖</span>
              </div>
              <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center'>AI Insights</h3>
              <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center'>Smart analysis of your spending patterns</p>
            </div>

            {/* Card 2 */}
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-200/40 dark:border-blue-700/40'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 mx-auto'>
                <span className='text-white text-base sm:text-lg'>✨</span>
              </div>
              <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center'>Auto Categories</h3>
              <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center'>Intelligent expense categorization</p>
            </div>

            {/* Card 3 */}
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-200/40 dark:border-blue-700/40 sm:col-span-2 md:col-span-1'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-400 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 mx-auto'>
                <span className='text-white text-base sm:text-lg'>📊</span>
              </div>
              <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center'>Smart Dashboard</h3>
              <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center'>Beautiful, intuitive financial overview</p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600'></div>

        <div className='max-w-4xl mx-auto'>
          
          <div className='text-center mb-10 sm:mb-12 md:mb-16'>
            <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6'>
              <span className='w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full'></span>
              FAQ
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6'>
              Frequently Asked{" "}
              <span className='text-blue-600 dark:text-blue-400'>Questions</span>
            </h2>

            <p className='text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Everything you need to know about ExpenseTracker AI
            </p>
          </div>

          {/* FAQ Items */}
          <div className='space-y-4 sm:space-y-6'>
            {[ 
              {
                title: "What is ExpenseTracker AI?",
                icon: "❔",
                text: "ExpenseTracker AI is an intelligent financial management tool powered by artificial intelligence."
              },
              {
                title: "How does the AI work?",
                icon: "🤖",
                text: "Our AI analyzes your spending data to automatically categorize expenses, detect patterns, and provide insights."
              },
              {
                title: "Is ExpenseTracker AI free?",
                icon: "💎",
                text: "Yes, ExpenseTracker AI offers a free plan with smart categorization and insights."
              }
            ].map((item, i) => (
              <div key={i} className='group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-200/40 dark:border-blue-700/40 hover:shadow-xl transition-all duration-200'>
                <div className='flex items-start gap-3 sm:gap-4'>
                  <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg flex-shrink-0'>
                    <span className='text-white text-xs sm:text-sm'>{item.icon}</span>
                  </div>

                  <div>
                    <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                      {item.title}
                    </h3>

                    <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed'>
                      {item.text}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20'>
        <div className='max-w-6xl mx-auto'>

          <div className='text-center mb-10 sm:mb-12 md:mb-16'>
            <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6'>
              <span className='w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full'></span>
              Testimonials
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100'>
              What Our Users{" "}
              <span className='text-blue-600 dark:text-blue-400'>Say</span>
            </h2>

            <p className='text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Join thousands of satisfied users who have transformed their financial habits.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>

            {/* Testimonial 1 */}
            <div className='group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-200/40 dark:border-blue-700/40 hover:-translate-y-1 transition-all'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold'>
                  S
                </div>
                <div>
                  <div className='font-bold text-gray-900 dark:text-gray-100'>Sarah L.</div>
                  <div className='text-gray-500 dark:text-gray-400 text-sm'>Verified User</div>
                </div>
              </div>
              <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                “ExpenseTracker AI has completely transformed my budgeting.”
              </p>
              <div className='text-blue-500 mt-3'>⭐⭐⭐⭐⭐</div>
            </div>

            {/* Testimonial 2 */}
            <div className='group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-200/40 dark:border-blue-700/40 hover:-translate-y-1 transition-all'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                  J
                </div>
                <div>
                  <div className='font-bold text-gray-900 dark:text-gray-100'>John D.</div>
                  <div className='text-gray-500 dark:text-gray-400 text-sm'>Verified User</div>
                </div>
              </div>
              <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                “The AI insights helped me reduce unnecessary spending.”
              </p>
              <div className='text-blue-500 mt-3'>⭐⭐⭐⭐⭐</div>
            </div>

            {/* Testimonial 3 */}
            <div className='group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-200/40 dark:border-blue-700/40 hover:-translate-y-1 transition-all sm:col-span-2 lg:col-span-1'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold'>
                  E
                </div>
                <div>
                  <div className='font-bold text-gray-900 dark:text-gray-100'>Emily R.</div>
                  <div className='text-gray-500 dark:text-gray-400 text-sm'>Verified User</div>
                </div>
              </div>
              <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                “The AI recommendations are spot-on and very useful!”
              </p>
              <div className='text-blue-500 mt-3'>⭐⭐⭐⭐⭐</div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Guest;
