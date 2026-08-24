const whatsappNumber = "919999999999";

export default function WhatsAppButton({
  message = "Hello, I need help on LokArt",
}) {
  const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a href={link} target="_blank" rel="noreferrer" className="wa-btn">
      💬 WhatsApp Help
    </a>
  );
}