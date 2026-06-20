function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="
                h-10 w-10 rounded-2xl
                bg-gradient-to-br from-green-600 to-emerald-500
                text-white font-bold
                flex items-center justify-center
                shadow-md
              "
            >
              F
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                FoodWise
              </h3>
              <p className="text-xs text-slate-500">
                Smart food waste management platform
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Built for reporting, tracking and reducing food waste efficiently.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} FoodWise
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;