function Loader({
  title = "Loading",
  subtitle = "Please wait while we prepare your workspace..."
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-sm rounded-[28px]
          border border-slate-200 bg-white
          shadow-xl shadow-slate-200/50
          px-8 py-10 text-center
        "
      >
        {/* Spinner */}
        <div className="relative mx-auto h-20 w-20">
          <div
            className="
              absolute inset-0 rounded-full
              border-[6px] border-slate-200
            "
          />

          <div
            className="
              absolute inset-0 rounded-full
              border-[6px] border-transparent
              border-t-green-600 border-r-emerald-500
              animate-spin
            "
          />

          <div
            className="
              absolute inset-[18px] rounded-full
              bg-slate-50 border border-slate-200
              shadow-inner
            "
          />
        </div>

        {/* Text */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {subtitle}
          </p>
        </div>

        {/* Loading bars */}
        <div className="mt-6 space-y-3">
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
          </div>

          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-slate-300 to-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;