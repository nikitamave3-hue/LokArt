import { useState } from "react";
import { Link } from "react-router-dom";

function AddSkill() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    skill: "",
    village: "",
    description: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.skill || !form.village || !form.description) {
      alert("कृपया सभी जरूरी जानकारी भरें।");
      return;
    }

    console.log("Local Skill:", form);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container section-block add-skill-page">
        <div className="add-skill-card skill-success">
          <div className="success-icon">✓</div>

          <h2>आपका हुनर जुड़ गया! 🎉</h2>

          <p>
            धन्यवाद! आपकी स्थानीय कला और हुनर को LokArt पर जोड़ने की
            जानकारी मिल गई है।
          </p>

          <Link to="/services" className="success-button">
            वापस Local Skills पर जाएँ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-block add-skill-page">
      <div className="add-skill-card">
        <div className="add-skill-icon">✋</div>

        <p className="services-tag">LOKART LOCAL WORKERS</p>

        <h1>अपना हुनर जोड़ें</h1>

        <p className="add-skill-subtitle">
          अगर आपका कोई स्थानीय हुनर, handmade काम या गाँव से जुड़ा
          कोई खास उत्पाद है, तो उसे LokArt पर जोड़ें।
        </p>

        <form className="add-skill-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>आपका नाम *</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="जैसे - सीता देवी"
              />
            </div>

            <div className="form-group">
              <label>आपका हुनर *</label>

              <input
                type="text"
                name="skill"
                value={form.skill}
                onChange={handleChange}
                placeholder="जैसे - सांगरी बनाना"
              />
            </div>
          </div>

          <div className="form-group">
            <label>गाँव / स्थान *</label>

            <input
              type="text"
              name="village"
              value={form.village}
              onChange={handleChange}
              placeholder="अपने गाँव का नाम"
            />
          </div>

          <div className="form-group">
            <label>अपने हुनर के बारे में बताएं *</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="आप क्या बनाते हैं? कैसे बनाते हैं? आपके काम की खासियत क्या है?"
            />
          </div>

          <div className="form-group">
            <label>मोबाइल नंबर</label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="मोबाइल नंबर"
            />

            <small>
              यह जानकारी बाद में service/product contact के लिए इस्तेमाल
              की जा सकती है।
            </small>
          </div>

          <button type="submit" className="add-skill-button">
            अपना हुनर जोड़ें
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSkill;
