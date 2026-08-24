import { useParams, Link } from "react-router-dom";

function ServiceDetails() {
  const { service } = useParams();

  const serviceData = {
    electrician: {
      title: "Electrician Service",
      icon: "⚡",
      description:
        "घर और दुकान के लिए बिजली से जुड़ी सेवाएं।",
      services: [
        "Electrical wiring",
        "Fan installation",
        "Light installation",
        "Switch and socket repair",
      ],
    },

    plumber: {
      title: "Plumber Service",
      icon: "🔧",
      description:
        "घर और दुकान के लिए plumbing और पानी से जुड़ी सेवाएं।",
      services: [
        "Pipe repair",
        "Water tap repair",
        "Leakage repair",
        "Bathroom plumbing",
      ],
    },

    tutor: {
      title: "Tutor Service",
      icon: "📚",
      description:
        "बच्चों के लिए पढ़ाई और learning से जुड़ी सेवाएं।",
      services: [
        "Home tuition",
        "School subject help",
        "Homework help",
        "Exam preparation",
      ],
    },
  };

  const data = serviceData[service];

  if (!data) {
    return (
      <div className="container section-block">
        <h1>Service Not Found</h1>
        <Link to="/services">← Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="container section-block service-details">
      <Link to="/services" className="back-link">
        ← Back to Services
      </Link>

      <div className="service-details-card">
        <div className="service-details-icon">
          {data.icon}
        </div>

        <h1>{data.title}</h1>

        <p className="service-description">
          {data.description}
        </p>

        <h2>Available Services</h2>

        <div className="service-list">
          {data.services.map((item) => (
            <div className="service-item" key={item}>
              ✅ {item}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="service-contact-button"
          onClick={() => alert("Service booking will be connected soon!")}
        >
          Contact Service Provider
        </button>
      </div>
    </div>
  );
}

export default ServiceDetails;
