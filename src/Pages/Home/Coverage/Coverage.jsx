import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = serviceCenters.find((s) =>
      s.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const cordin = [district.latitude, district.longitude];
      mapRef.current.flyTo(cordin, 14);
    }
  };

  return (
    <div className="my-10 bg-base-100 rounded-2xl shadow-lg p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-secondary">
          We are available in all 64 districts
        </h2>
        <p className="text-gray-600 mt-2">
          Search your area and instantly locate our nearest service center.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
        <label className="input input-bordered rounded-2xl shadow-md flex items-center gap-2 bg-white w-full">
          <svg
            className="h-[1em] opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="location"
            placeholder="Search district..."
            className="grow"
          />
        </label>
      </form>

      <div className="text-center mb-6">
        <h3 className="text-secondary font-bold text-2xl">
          We deliver almost all over Bangladesh
        </h3>
      </div>

      {/* Map Section */}
      <div className="border rounded-2xl shadow-xl overflow-hidden z-0">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[700px] rounded-2xl"
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((serviceCenter, index) => (
            <Marker
              key={index}
              position={[serviceCenter.latitude, serviceCenter.longitude]}
            >
              <Popup>
                <strong>{serviceCenter.district}</strong>
                <br />
                Areas: {serviceCenter.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
