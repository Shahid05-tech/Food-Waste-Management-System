import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

function CreateReport() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(
          position.coords.latitude.toString()
        );
        setLongitude(
          position.coords.longitude.toString()
        );
      },
      () => {
        alert("Unable to fetch location");
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!latitude || !longitude) {
      alert("Please provide location");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("description", description);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      await api.post("/reports", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Report submitted successfully");

      setDescription("");
      setLatitude("");
      setLongitude("");
      setImage(null);
      setPreview("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to submit report"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen">
      <Navbar />

      <main className="page-container max-w-7xl">
        {/* Page Header */}
        <section className="mb-8">
          <div
            className="
              relative overflow-hidden rounded-[28px]
              border border-slate-200/70
              bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900
              px-8 py-10 text-white
              shadow-[0_24px_70px_rgba(15,23,42,0.22)]
            "
          >
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <span
                className="
                  inline-flex items-center rounded-full
                  border border-white/15 bg-white/10
                  px-4 py-1.5 text-sm font-medium text-white/90
                "
              >
                Waste Reporting Portal
              </span>

              <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight">
                Create New Waste Report
              </h1>

              <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-slate-200">
                Submit food waste details with an image and accurate location so
                the collection team can review and process it quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left - Form */}
          <div className="xl:col-span-2">
            <div className="app-card card-padding">
              <div className="page-header mb-8">
                <div>
                  <h2 className="page-title text-[1.55rem]">
                    Report Details
                  </h2>
                  <p className="page-subtitle">
                    Provide image evidence, a clear description, and the waste
                    location details.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Upload Section */}
                <div>
                  <label className="form-label mb-3 block">
                    Upload Waste Image
                  </label>

                  <label
                    className="
                      group relative flex min-h-[220px] cursor-pointer
                      flex-col items-center justify-center rounded-3xl
                      border-2 border-dashed border-slate-300
                      bg-slate-50 px-6 py-8 text-center
                      transition-all duration-300
                      hover:border-emerald-400 hover:bg-emerald-50/50
                    "
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {!preview ? (
                      <>
                        <div
                          className="
                            flex h-16 w-16 items-center justify-center
                            rounded-2xl bg-white shadow-sm border border-slate-200
                          "
                        >
                          <svg
                            className="h-7 w-7 text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5V18a2 2 0 002 2h14a2 2 0 002-2v-1.5M16 8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-slate-900">
                          Drag and drop an image here
                        </h3>

                        <p className="mt-2 text-sm text-slate-500 max-w-md leading-6">
                          Upload a clear image of the waste item or food waste
                          collection point. Supported formats include JPG, PNG,
                          and JPEG.
                        </p>

                        <span
                          className="
                            mt-5 inline-flex rounded-xl border border-slate-200
                            bg-white px-4 py-2 text-sm font-medium text-slate-700
                            shadow-sm
                          "
                        >
                          Browse files
                        </span>
                      </>
                    ) : (
                      <div className="w-full">
                        <img
                          src={preview}
                          alt="Preview"
                          className="
                            h-[320px] w-full rounded-2xl object-cover
                            shadow-md border border-slate-200
                          "
                        />

                        <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {image?.name || "Selected image"}
                            </p>
                            <p className="text-xs text-slate-500">
                              Preview ready for submission
                            </p>
                          </div>

                          <span className="text-sm font-medium text-emerald-600">
                            Image attached
                          </span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="form-label mb-3 block">
                    Description
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Enter a clear description of the waste, estimated quantity, condition, or any collection note."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    className="
                      input-field min-h-[150px] resize-none
                    "
                  />
                </div>

                {/* Location Section */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Location Information
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Add the waste location coordinates manually or fetch
                        them from your current device location.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="
                        inline-flex items-center justify-center rounded-xl
                        bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white
                        transition hover:bg-slate-800
                      "
                    >
                      Use Current Location
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label mb-2 block">
                        Latitude
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 17.3850"
                        value={latitude}
                        onChange={(e) =>
                          setLatitude(e.target.value)
                        }
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label mb-2 block">
                        Longitude
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 78.4867"
                        value={longitude}
                        onChange={(e) =>
                          setLongitude(e.target.value)
                        }
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Ready to submit the report
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Please verify the uploaded image, description, and
                      location details before submitting.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      inline-flex min-w-[220px] items-center justify-center
                      rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500
                      px-6 py-3.5 text-sm font-semibold text-white
                      shadow-lg shadow-emerald-500/20 transition
                      hover:translate-y-[-1px] hover:shadow-xl
                      disabled:cursor-not-allowed disabled:opacity-70
                    "
                  >
                    {loading
                      ? "Submitting Report..."
                      : "Submit Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right - Side Panel */}
          <div className="space-y-6">
            {/* Guidelines */}
            <div className="app-card card-padding">
              <h2 className="section-title">
                Reporting Guidelines
              </h2>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Use a clear image
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Ensure the waste item or affected area is visible and
                    captured in good lighting.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Add useful description
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Mention the food type, approximate quantity, packaging
                    condition, or urgency if applicable.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Verify the location
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Accurate coordinates help collectors identify the report
                    location and complete pickup efficiently.
                  </p>
                </div>
              </div>
            </div>

            {/* Submission Checklist */}
            <div className="app-card card-padding">
              <h2 className="section-title">
                Submission Checklist
              </h2>

              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm font-medium text-slate-800">
                    Image uploaded
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Attach at least one clear waste image.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm font-medium text-slate-800">
                    Description added
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Include the relevant details for review.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm font-medium text-slate-800">
                    Coordinates confirmed
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Use current location or enter values manually.
                  </p>
                </div>
              </div>
            </div>

            {/* User Summary */}
            <div className="app-card card-padding">
              <h2 className="section-title">
                Submitted By
              </h2>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Name
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {user?.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Role
                  </p>
                  <p className="mt-1 font-semibold capitalize text-slate-900">
                    {user?.role}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Badge
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {user?.badge || "Beginner"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CreateReport;