import AddNewRecord from '@/components/AddNewRecord';
import AIInsights from '@/components/AIInsights';
import ExpenseStats from '@/components/ExpenseStats';
import Guest from '@/components/Guest';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';
import { currentUser } from '@clerk/nextjs/server';

export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-4 sm:space-y-6">

            {/* BLUE THEMED WELCOME SECTION */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40 hover:shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              
              {/* PROFILE IMAGE */}
              <div className="relative flex-shrink-0">
                <img
                  src={user.imageUrl}
                  alt={`${user.firstName}'s profile`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white dark:border-gray-600 shadow-lg"
                />

                {/* BLUE BADGE */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#00AEEF] to-[#0096D1] rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>

              {/* TEXT + DETAILS */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-3 mb-3">

                  {/* BLUE ICON */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm sm:text-lg">👋</span>
                  </div>

                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Welcome Back, {user.firstName}!
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0">
                  Here's a quick overview of your recent expense activity.
                  Track your spending, analyze patterns, and manage your budget efficiently!
                </p>

                {/* JOINED + LAST ACTIVE in BLUE */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">

                  {/* JOINED */}
                  <div className="bg-[#D7F6FF]/60 dark:bg-blue-900/30 border border-[#00AEEF]/30 dark:border-blue-700/40 px-3 py-2 rounded-xl flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#00AEEF] to-[#0096D1] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📅</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">Joined</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* LAST ACTIVE */}
                  <div className="bg-[#D7F6FF]/60 dark:bg-blue-900/30 border border-[#00AEEF]/30 dark:border-blue-700/40 px-3 py-2 rounded-xl flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#00AEEF] to-[#0096D1] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">Last Active</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {user.lastActiveAt ? new Date(user.lastActiveAt).toLocaleDateString() : "Today"}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ADD NEW EXPENSE */}
            <AddNewRecord />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            <RecordChart />
            <ExpenseStats />
          </div>

        </div>

        {/* FULL WIDTH SECTIONS */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <AIInsights />
          <RecordHistory />
        </div>

      </div>
    </main>
  );
}
