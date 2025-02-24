import React, { useState } from "react";
import "./App.css";
import APKCard from "./components/APKCard";
import emailjs from 'emailjs-com';

const apkData = [
  {
    id: 1,
    name: "WhatsApp",
    description: "Chat and call with friends and family. Foud Whatsapp.",
    fileSize: "83.9 MB",
    fileId: "1R4QRtTjZql2q46-FV0Ir708sd6SU7_6b",
  },
  {
    id: 2,
    name: "Spotify",
    description: "Stream music and podcasts. Premium unlocked, AMOLED.",
    fileSize: "93.2 MB",
    fileId: "1sczZx1oUY_g8fwZtdACSyjLbMbqDC4vP",
  },
  {
    id: 3,
    name: "TikTok",
    description: "Create and share short videos. Premium unlocked!",
    fileSize: "222.9 MB",
    fileId: "1_V5mu80NA0sIHqzJYP_nDgRABZo7isT0",
  },
  {
    id: 4,
    name: "Instagram",
    description: "Share photos and connect with friends. Optimized, no ADs!",
    fileSize: "88.4 MB",
    fileId: "19vEC63pcoOynlim9-ziz4HIcDaxeq8-O",
  },
  {
    id: 5,
    name: "X (Twitter)",
    description: "Stay updated with news and trends. Premium unlocked!",
    fileSize: "153.1 MB",
    fileId: "1QgxpBtNfgAOD_8KRZb0xAoUi3p5xtAKe",
  },
  {
    id: 6,
    name: "WPS Office",
    description: "Edit documents, spreadsheets, and presentations. Premium unlocked!",
    fileSize: "193 MB",
    fileId: "1ccNcB4b-DlO1SoEysd1IQjOuihTvYCyt",
  },
  {
    id: 7,
    name: "Telegram",
    description: "Secure messaging and file sharing. Premium unlocked!",
    fileSize: "50.6 MB",
    fileId: "",
  },
  {
    id: 8,
    name: "Snapchat",
    description: "Share moments with friends. Premium unlocked!",
    fileSize: "191 MB",
    fileId: "1sG7g_OgCFnYy-w0hqshAv0VAD3SMtM1Y",
  },
  {
    id: 9,
    name: "NewPipe",
    description: "Lightweight YouTube client. Optimized",
    fileSize: "10.95 MB",
    fileId: "1fmN7higwPVieonrSGzl17SV39iYcVhet",
  },
  {
    id: 10,
    name: "Netflix",
    description: "Stream movies and TV shows. Netflix alternative.",
    fileSize: "17.5 MB",
    fileId: "1h3jnVTJQP6MPLwB0CmBUE_8Bc-vSDFI3",
  },
  {
    id: 11,
    name: "Shazam",
    description: "Identify different genres of songs. Premium unlocked",
    fileSize: "20.95 MB",
    fileId: "",
  },
];

function App() {
  const [selectedAPK, setSelectedAPK] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  // Handle APK download using Google Drive direct link
  const isValidFileId = (fileId) => /^[a-zA-Z0-9_-]+$/.test(fileId);
  const handleDownload = (apk) => {
    if (!isValidFileId(apk.fileId)) {
    console.error("Invalid file ID detected.");
    return;
    }
    const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${apk.fileId}&confirm=t`;
    window.open(googleDriveUrl, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const suffix = "\n\n\n (Message was sent from Neshacks APK Store)";
    const fullMessage = `${message}${suffix}`;
    const serviceID = ''; // Your service ID
    const templateID = ''; // Your template ID
    const userID = ''; // Your user ID
    emailjs.send(serviceID, templateID, {
      name: name,
      email: email,
      message: fullMessage,
    }, userID)
      .then((response) => {
        alert('Message sent successfully!');
        setName("");
        setEmail("");
        setMessage("");
      }, (error) => {
        alert('Failed to send the message, please try again.');
      });
  };

  const getPayPalLink = () => {
    const baseUrl = "https://www.paypal.com/donate";
    const businessEmail = "nehmz254@gmail.com";
    const currency = "USD";
    const purpose = "Donation to Neshacks APK Store";
    return `${baseUrl}?business=${encodeURIComponent(
      businessEmail
    )}&currency_code=${currency}&amount=${donationAmount}&item_name=${encodeURIComponent(
      purpose
    )}`;
  };

  return (
    <div className="container">
      <header className="header">
        <h1>NESHACKS APKS STORE</h1>
        <p>Discover and download amazing mobile applications</p>
      </header>
      <div className="card-container">
        {apkData.map((apk) => (
          <APKCard key={apk.id} apk={apk} onDownload={handleDownload} />
        ))}
      </div>
      {/* Wrapped Donate and Contact Sections */}
      <div className="side-by-side-container">
        <div className="side-by-side-sections">
          {/* Donation Section */}
          <section className="card donation-section">
            <h2>Support Us</h2>
            <p>If you find our service helpful, consider supporting us with a donation.</p>
            <div className="donation-form">
              <input
                type="number"
                placeholder="Enter donation amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                min="1"
                step="1"
                required
              />
              <a
                href={donationAmount ? getPayPalLink() : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="donate-button"
                style={{ pointerEvents: donationAmount ? "auto" : "none" }}
              >
                Donate via PayPal
              </a>
            </div>
          </section>
          {/* Contact Section */}
          <section className="card contact-section">
            <h2>Contact Us</h2>
            <p>Have questions or suggestions? Reach out to us!</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                className="textarea-field"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="download-button"
                type="submit"
                disabled={!name || !email || !message}
              >
                Send Message
              </button>
            </form>
          </section>
        </div>
      </div>
      <footer className="footer">
        <h3>About Neshacks apk store</h3>
        <p>
          We are dedicated to providing high-quality mobile applications that enhance your digital experience. Our
          curated selection ensures you get the best apps for your needs.
        </p>
        <div>© 2025 NesHacks Apps. All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default App;
