"use client";

import MobileBar from "@/features/ui/MobileBar";

export default function NearbyPage() {
  return (
    <main className="relative flex flex-col h-screen pb-16">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* 귀여운 위치 아이콘 */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="w-24 h-24 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {/* 귀여운 파도 효과 */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 메시지 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">내 주변</h2>
          <p className="text-lg text-gray-600 mb-4">준비하고 있어요! 📍</p>
          <p className="text-sm text-gray-500">가까운 카페들을 찾아보세요</p>
        </div>
      </div>
      <MobileBar />
    </main>
  );
}
