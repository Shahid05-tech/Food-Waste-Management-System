function ReportCard({ report }) {
  const getStatusStyles = () => {
    if (report.status === "reported") {
      return {
        badge:
          "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
        label: "Reported",
      };
    }

    if (report.status === "accepted") {
      return {
        badge:
          "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
        label: "Accepted",
      };
    }

    if (report.status === "collected") {
      return {
        badge:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        label: "Collected",
      };
    }

    if (report.status === "processed") {
      return {
        badge:
          "bg-violet-50 text-violet-700 border-violet-200",
        dot: "bg-violet-500",
        label: "Processed",
      };
    }

    return {
      badge:
        "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-500",
      label: report.status || "Unknown",
    };
  };

  const status = getStatusStyles();

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const latitude =
    report?.location?.coordinates?.[1];
  const longitude =
    report?.location?.coordinates?.[0];

  return (
    <article
      className="
        group overflow-hidden rounded-[28px]
        border border-slate-200 bg-white
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={report.imageUrl}
          alt="Waste report"
          className="
            h-64 w-full object-cover
            transition duration-500 group-hover:scale-[1.02]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span
            className={`
              inline-flex items-center gap-2 rounded-full border px-3 py-1.5
              text-xs font-semibold backdrop-blur-sm
              ${status.badge}
            `}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${status.dot}`}
            />
            {status.label}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 px-4 py-3 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Reported On
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatDate(report.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE + DESCRIPTION */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 leading-7">
            {report.description}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Submitted waste report with AI-assisted waste classification and
            status tracking.
          </p>
        </div>

        {/* META GRID */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Latitude
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 break-all">
              {latitude !== undefined &&
              latitude !== null
                ? Number(latitude).toFixed(5)
                : "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Longitude
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 break-all">
              {longitude !== undefined &&
              longitude !== null
                ? Number(longitude).toFixed(5)
                : "N/A"}
            </p>
          </div>
        </div>

        {/* AI ANALYSIS */}
        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              AI Analysis
            </h3>

            {report.aiAnalysis?.confidence !==
              undefined &&
              report.aiAnalysis?.confidence !==
                null && (
                <span className="text-xs font-medium text-slate-500">
                  Confidence:{" "}
                  {Math.round(
                    report.aiAnalysis.confidence
                  )}
                  %
                </span>
              )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Food Type
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {report.aiAnalysis?.foodType ||
                  "Not available"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Quantity
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {report.aiAnalysis?.quantity ||
                    "Not available"}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Edible
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {report.aiAnalysis?.edible === true
                    ? "Yes"
                    : report.aiAnalysis?.edible ===
                      false
                    ? "No"
                    : "Unknown"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Urgency
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 capitalize">
                {report.aiAnalysis?.urgency ||
                  "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER STRIP */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Current Status
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 capitalize">
              {report.status}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Report ID
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {report._id?.slice(-6) || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReportCard;