import React from 'react';
import { Bot, Sparkles, RefreshCw } from 'lucide-react';

function Error() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Bot Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping opacity-25">
            <Bot size={120} className="mx-auto text-blue-400" />
          </div>
          <div className="relative">
            <Bot size={120} className="mx-auto text-blue-500" />
          </div>
          {/* Floating Sparkles */}
          <Sparkles 
            size={24} 
            className="absolute -top-4 -right-4 text-yellow-400 animate-bounce" 
          />
          <Sparkles 
            size={24} 
            className="absolute -bottom-4 -left-4 text-yellow-400 animate-bounce delay-150" 
          />
          {/* Processing Circle */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2">
            <RefreshCw size={32} className="text-blue-400 animate-spin" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-7xl font-bold text-white mb-4 animate-pulse">404</h1>
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          My circuits are having trouble locating the page you're looking for. 
          Let's get you back on track!
        </p>

        {/* Action Button */}
        <a 
          href="/"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 hover:scale-105 transform"
        >
          Return Home
          <Sparkles className="ml-2 h-5 w-5" />
        </a>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-200" />
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-500" />
        </div>
      </div>
    </div>
  );
}

export default Error;