import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const workers = [
  {
    id: 1,
    name: "Ravi Sharma",
    village: "Bishanpur",
    skill: "Electrician",
    experience: "8 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    price: "₹450/hr",
    phone: "919876543210",
  },
  {
    id: 2,
    name: "Meera Devi",
    village: "Khurja",
    skill: "Tailor",
    experience: "6 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    price: "₹300/hr",
    phone: "919812345670",
  },
  {
    id: 3,
    name: "Amit Yadav",
    village: "Ramnagar",
    skill: "Plumber",
    experience: "10 years",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    price: "₹400/hr",
    phone: "919999887766",
  },
  {
    id: 4,
    name: "Pooja Kumari",
    village: "Sultanpur",
    skill: "Tutor",
    experience: "5 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    price: "₹250/hr",
    phone: "919600112233",
  },
];

function FindWork({ t = {} }) {
  const [query, setQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedVillage, setSelectedVillage] = useState("All");

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const matchesQuery = `${worker.name} ${worker.skill} ${worker.village}`.toLowerCase().includes(query.toLowerCase());
      const matchesSkill = selectedSkill === "All" || worker.skill === selectedSkill;
      const matchesVillage = selectedVillage === "All" || worker.village === selectedVillage;
      return matchesQuery && matchesSkill && matchesVillage;
    });
  }, [query, selectedSkill, selectedVillage]);

  return (
    <div className="find-work-page">
      <section className="container section-block">
        <div className="hero-card find-work-hero">
          <div>
            <p className="eyebrow">{t?.findWork || "Find Work"}</p>
            <h1>Hire trusted artisans from your village network</h1>
            <p className="lede">Book electricians, tailors, tutors, and local specialists with a single WhatsApp message.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/services">Explore Services</Link>
              <Link className="btn btn-secondary" to="/marketplace">Browse Products</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="filter-bar">
          <input
            type="search"
            placeholder="Search by name, skill or village"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
            <option value="All">All Skills</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Tailor">Tailor</option>
            <option value="Tutor">Tutor</option>
          </select>
          <select value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)}>
            <option value="All">All Villages</option>
            <option value="Bishanpur">Bishanpur</option>
            <option value="Khurja">Khurja</option>
            <option value="Ramnagar">Ramnagar</option>
            <option value="Sultanpur">Sultanpur</option>
          </select>
        </div>

        <div className="card-grid three-up">
          {filteredWorkers.map((worker) => (
            <article className="card worker-card" key={worker.id}>
              <img src={worker.image} alt={worker.name} loading="lazy" />
              <div className="worker-info">
                <h3>{worker.name}</h3>
                <p className="worker-meta">📍 {worker.village}</p>
                <p className="worker-meta">🛠 {worker.skill}</p>
                <p className="worker-meta">⏳ {worker.experience}</p>
                <p className="worker-meta">⭐ {worker.rating.toFixed(1)}</p>
                <div className="product-meta">
                  <strong>{worker.price}</strong>
                  <a className="btn btn-primary" href={`https://wa.me/${worker.phone}?text=Hello%20${encodeURIComponent(worker.name)},%20I%20would%20like%20to%20book%20your%20service%20on%20LokArt.`} target="_blank" rel="noreferrer">Book Now</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FindWork;
