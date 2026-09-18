import { useNavigate } from "react-router-dom";
import carpenterImage from "../assets/home/carpenter.png";
import electricianImage from "../assets/home/electrician.png";
import housePainterImage from "../assets/home/house-painter.png";
import handmadeCraftsImage from "../assets/home/handmade-crafts.png";
import homeDecorImage from "../assets/home/home-decor.png";
import paintingsImage from "../assets/home/paintings.png";
import potteryImage from "../assets/home/pottery.png";
import woodCraftImage from "../assets/home/wood-craft.png";
import textilesImage from "../assets/home/textiles.png";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Pottery & Clay Work",
      hindi: "मिट्टी के बर्तन और कलाकारी",
      image: potteryImage,
      description: "गाँव के कुम्हारों द्वारा हाथ से बनाए गए मिट्टी के सामान।",
    },
    {
      title: "Handmade Crafts",
      hindi: "हस्तनिर्मित सामान",
      image: handmadeCraftsImage,
      description: "हाथ से बनाए गए पारंपरिक और खूबसूरत हस्तशिल्प।",
    },
    {
      title: "Pickle & Papad",
      hindi: "अचार और पापड़",
      image: textilesImage,
      description: "गाँव के घरों में बनाए गए स्वादिष्ट स्थानीय खाद्य पदार्थ।",
    },
    {
      title: "Embroidery & Stitching",
      hindi: "कढ़ाई और सिलाई",
      image: textilesImage,
      description: "स्थानीय महिलाओं और कारीगरों द्वारा किया गया हाथ का काम।",
    },
    {
      title: "Folk Art",
      hindi: "लोक कला",
      image: paintingsImage,
      description: "गाँव की पारंपरिक कला, चित्रकारी और सजावटी सामान।",
    },
    {
      title: "Bamboo & Basket Work",
      hindi: "बांस और टोकरी का काम",
      image: woodCraftImage,
      description: "बांस, लकड़ी और प्राकृतिक सामग्री से बने सामान।",
    },
    {
      title: "Handmade Jewellery",
      hindi: "हस्तनिर्मित आभूषण",
      image: homeDecorImage,
      description: "स्थानीय कारीगरों द्वारा बनाए गए अनोखे handmade jewellery items।",
    },
    {
      title: "Local Food Products",
      hindi: "स्थानीय खाद्य उत्पाद",
      image: homeDecorImage,
      description: "सांगरी, मसाले और गाँव में बनाए जाने वाले अन्य स्थानीय खाद्य उत्पाद।",
    },
    {
      title: "Other Local Skills",
      hindi: "अन्य स्थानीय हुनर",
      image: handmadeCraftsImage,
      description: "गाँव के लोगों का कोई भी खास हुनर या handmade काम।",
    },
    {
      title: "Carpenter",
      hindi: "बढ़ई का काम",
      image: carpenterImage,
      description: "फर्नीचर, दरवाजे, खिड़कियों और लकड़ी के interior work के लिए कुशल बढ़ई।",
    },
    {
      title: "Electrician",
      hindi: "इलेक्ट्रिशियन",
      image: electricianImage,
      description: "घर की wiring, repair और electrical installation के लिए professional electricians।",
    },
    {
      title: "House Painter",
      hindi: "घर की पेंटिंग",
      image: housePainterImage,
      description: "अनुभवी workers द्वारा घर की interior और exterior painting services।",
    },
    {
      title: "Other / Add Your Skill",
      hindi: "अपना हुनर जोड़ें",
      icon: "➕",
      description: "आपका हुनर हमारी categories में नहीं है? यहाँ अपना काम जोड़ें।",
      isOther: true,
    },
  ];

  const handleServiceClick = (service) => {
    if (service.isOther) {
      navigate("/services/add-skill");
      return;
    }

    navigate(`/services/${encodeURIComponent(service.title.toLowerCase())}`);
  };

  return (
    <div className="container section-block services-page">
      <div className="services-heading">
        <p className="services-tag">LOKART LOCAL WORKERS</p>

        <h1>Local Skills & Handmade Work</h1>

        <p>
          गाँव के कारीगरों, कलाकारों और स्थानीय कामगारों का हुनर एक जगह।
        </p>
      </div>

      <div className="card-grid three-up">
        {services.map((service) => (
          <article className="card service-card" key={service.title}>
            {service.image ? (
              <img src={service.image} alt={service.title} />
            ) : (
              <div className="service-icon">{service.icon}</div>
            )}

            <h3>{service.title}</h3>

            <p className="service-hindi">{service.hindi}</p>

            <p className="service-description">
              {service.description}
            </p>

            <button
              type="button"
              className="service-button"
              onClick={() => handleServiceClick(service)}
            >
              View Category
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Services;
