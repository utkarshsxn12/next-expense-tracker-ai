'use client';
import { useRef, useState } from 'react';
import addExpenseRecord from '@/app/actions/addExpenseRecord';
import { suggestCategory } from '@/app/actions/suggestCategory';

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(50);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isCategorizingAI, setIsCategorizingAI] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    formData.set('amount', amount.toString());
    formData.set('category', category);

    const { error } = await addExpenseRecord(formData);

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType('error');
    } else {
      setAlertMessage('Expense record added successfully!');
      setAlertType('success');
      formRef.current?.reset();
      setAmount(50);
      setCategory('');
      setDescription('');
    }

    setIsLoading(false);
  };

  const handleAISuggestCategory = async () => {
    if (!description.trim()) {
      setAlertMessage('Please enter a description first');
      setAlertType('error');
      return;
    }

    setIsCategorizingAI(true);
    setAlertMessage(null);

    try {
      const result = await suggestCategory(description);
      if (result.error) {
        setAlertMessage(`AI Suggestion: ${result.error}`);
        setAlertType('error');
      } else {
        setCategory(result.category);
        setAlertMessage(`AI suggested category: ${result.category}`);
        setAlertType('success');
      }
    } catch {
      setAlertMessage('Failed to get AI category suggestion');
      setAlertType('error');
    } finally {
      setIsCategorizingAI(false);
    }
  };

  return (
    <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl'>

      {/* Header */}
      <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center shadow-lg'>
          <span className='text-white text-sm sm:text-lg'>💳</span>
        </div>
        <div>
          <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight'>
            Add New Expense
          </h3>
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
            Track your spending with AI assistance
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          clientAction(formData);
        }}
        className='space-y-6 sm:space-y-8'
      >

        {/* Expense Description & Date */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#D7F6FF]/50 to-[#E8FAFF]/50 dark:from-blue-900/10 dark:to-blue-800/10 rounded-xl border border-[#00AEEF]/20 dark:border-blue-700/40'>

          {/* Description */}
          <div className='space-y-1.5'>
            <label className='flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide'>
              <span className='w-1.5 h-1.5 bg-[#00AEEF] rounded-full'></span>
              Expense Description
            </label>

            <div className='relative'>
              <input
                type='text'
                name='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full pl-3 pr-12 sm:pr-14 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00AEEF]/40 focus:border-[#00AEEF] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm shadow-sm hover:shadow-md transition-all duration-200'
                placeholder='Coffee, groceries, gas...'
                required
              />

              {/* AI Suggest Button */}
              <button
                type='button'
                onClick={handleAISuggestCategory}
                disabled={isCategorizingAI || !description.trim()}
                className='absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-7 bg-gradient-to-r from-[#00AEEF] to-[#0096D1] hover:from-[#0096D1] hover:to-[#007EAA] disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg text-xs font-medium flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200'
              >
                {isCategorizingAI ? (
                  <div className='w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                ) : (
                  <span className='text-xs'>✨</span>
                )}
              </button>
            </div>

            {isCategorizingAI && (
              <div className='flex items-center gap-2 text-xs text-[#0096D1] dark:text-blue-300'>
                <div className='w-1.5 h-1.5 bg-[#00AEEF] rounded-full animate-pulse'></div>
                AI is analyzing your description...
              </div>
            )}
          </div>

          {/* Date */}
          <div className='space-y-1.5'>
            <label className='flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide'>
              <span className='w-1.5 h-1.5 bg-[#00AEEF] rounded-full'></span>
              Expense Date
            </label>

            <input
              type='date'
              id='date'
              name='date'
              className='w-full px-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00AEEF]/40 focus:border-[#00AEEF] text-gray-900 dark:text-gray-100 text-sm shadow-sm hover:shadow-md transition-all duration-200'
              required
              onFocus={(e) => e.target.showPicker()}
            />
          </div>
        </div>

        {/* Category + Amount */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#E8FAFF]/50 to-[#D7F6FF]/50 dark:from-blue-900/10 dark:to-blue-800/10 rounded-xl border border-[#00AEEF]/20 dark:border-blue-700/40'>

          {/* Category */}
          <div className='space-y-1.5'>
            <label className='flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide'>
              <span className='w-1.5 h-1.5 bg-[#00AEEF] rounded-full'></span>
              Category
            </label>

            <select
              id='category'
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00AEEF]/40 focus:border-[#00AEEF] text-gray-900 dark:text-gray-100 cursor-pointer text-sm shadow-sm hover:shadow-md transition-all duration-200'
              required
            >
              <option value='' disabled>Select category...</option>
              <option value='Food'>🍔 Food & Dining</option>
              <option value='Transportation'>🚗 Transportation</option>
              <option value='Shopping'>🛒 Shopping</option>
              <option value='Entertainment'>🎬 Entertainment</option>
              <option value='Bills'>💡 Bills & Utilities</option>
              <option value='Healthcare'>🏥 Healthcare</option>
              <option value='Other'>📦 Other</option>
            </select>
          </div>

          {/* Amount */}
          <div className='space-y-1.5'>
            <label className='flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide'>
              <span className='w-1.5 h-1.5 bg-[#00AEEF] rounded-full'></span>
              Amount
            </label>

            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm'>₹</span>

              <input
                type='number'
                name='amount'
                value={amount}
                min='0'
                max='1000'
                step='0.01'
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className='w-full pl-6 pr-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00AEEF]/40 focus:border-[#00AEEF] text-gray-900 dark:text-gray-100 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200'
                placeholder='0.00'
                required
              />
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full relative overflow-hidden bg-gradient-to-r from-[#00AEEF] via-[#0096D1] to-[#007EAA] hover:from-[#0096D1] hover:via-[#007EAA] hover:to-[#006A93] text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl group transition-all duration-300 text-sm sm:text-base'
        >
          <div className='relative flex items-center justify-center gap-2'>
            {isLoading ? (
              <>
                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className='text-lg'>💫</span>
                <span>Add Expense</span>
              </>
            )}
          </div>
        </button>
      </form>

      {/* ALERT */}
      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-xl border-l-4 backdrop-blur-sm ${
            alertType === 'success'
              ? 'bg-blue-50/80 dark:bg-blue-900/20 border-l-[#00AEEF] text-blue-800 dark:text-blue-200'
              : 'bg-red-50/80 dark:bg-red-900/20 border-l-red-500 text-red-800 dark:text-red-200'
          }`}
        >
          <div className='flex items-center gap-2'>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                alertType === 'success'
                  ? 'bg-blue-100 dark:bg-blue-800'
                  : 'bg-red-100 dark:bg-red-800'
              }`}
            >
              <span className='text-sm'>
                {alertType === 'success' ? '✅' : '⚠️'}
              </span>
            </div>
            <p className='font-medium text-sm'>{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecord;
