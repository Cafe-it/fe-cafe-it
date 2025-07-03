export default function Home() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">Cafe-it</h1>
      </header>

      <main className="px-4 py-6">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-base font-medium text-gray-900 mb-2">
              실시간 카페 현황
            </h2>
            <p className="text-sm text-gray-600">
              현재 이용 가능한 자리를 확인해보세요
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              인기 카페
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    스타벅스 강남점
                  </p>
                  <p className="text-xs text-gray-500">강남대로 123</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    자리 있음
                  </p>
                  <p className="text-xs text-gray-500">5석</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    투썸플레이스 홍대점
                  </p>
                  <p className="text-xs text-gray-500">홍대로 456</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">자리 없음</p>
                  <p className="text-xs text-gray-500">0석</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
