import React, { useState } from "react";
//import { FaWhatsapp } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import "./App.css";
import APKCard from "./components/APKCard";
import emailjs from "emailjs-com";
import Navbar from "./components/Navbar";
import NoResultsFound from "./components/NoResultsFound";

const apkData = [
  {
    id: 1,
    name: "WhatsApp",
    description:
      "v2.25.8.84\nChat and call with friends and family.\nFoud Whatsapp.",
    fileSize: "83.9 MB",
    fileId: "1R4QRtTjZql2q46-FV0Ir708sd6SU7_6b",
  },
  {
    id: 2,
    name: "Truecaller",
    description:
      "v15.7.6 \nMake and receive secure HD calls by blocking spam callers and messages.\nPremium unlocked!",
    fileSize: "113.4 MB",
    fileId: "1px7thRXpaZ1kM17w5EW-ZC_bJpzlGxvq",
  },
  {
    id: 3,
    name: "TikTok",
    description: "v39.3.5 \nCreate and share short videos.\nPremium unlocked!",
    fileSize: "222.9 MB",
    fileId: "10sItLEwDyMlUBF4qwm2GbQZuES2F3RM_",
  },
  {
    id: 4,
    name: "Instagram",
    description:
      "v22 \nShare photos and connect with friends.\nOptimized, no ADs!",
    fileSize: "88.4 MB",
    fileId: "17-zacib3boEZAd4nfDmi--te7fnOjVPP",
  },
  {
    id: 5,
    name: "X (Twitter)",
    description:
      "v 10.86.0 \nStay updated with news and trends.\nPremium unlocked!",
    fileSize: "159.1 MB",
    fileId: "1mVcGVue01Rh2yml3JsxVjDTeIOHfd-Ef",
  },
  {
    id: 6,
    name: "WPS Office",
    description:
      "v18.16.1 \nEdit documents, spreadsheets, and presentations.\nPremium unlocked!",
    fileSize: "275.6 MB",
    fileId: "1rx0rcQubaSXbCw0gl8k37ZJMFPRPM6hA",
  },
  {
    id: 7,
    name: "Telegram",
    description:
      "v11.9.0 \nSecure messaging and file sharing.\nPremium unlocked!",
    fileSize: "82.6 MB",
    fileId: "1hIdrRjkbNsgcQrdi5MSkjM2DfuDIxhTq",
  },
  {
    id: 8,
    name: "Snapchat",
    description: "v13.35.0.46 \nShare moments with friends.\nPremium unlocked!",
    fileSize: "191 MB",
    fileId: "1sG7g_OgCFnYy-w0hqshAv0VAD3SMtM1Y",
  },
  {
    id: 9,
    name: "NewPipe",
    description: "v0.27.6 \nLightweight YouTube client.\nOptimized",
    fileSize: "10.95 MB",
    fileId: "1fmN7higwPVieonrSGzl17SV39iYcVhet",
  },
  {
    id: 10,
    name: "Onstream",
    description:
      "v1.1.6 \nStream movies and TV shows for free.\nNetflix alternative.",
    fileSize: "17.5 MB",
    fileId: "1h3jnVTJQP6MPLwB0CmBUE_8Bc-vSDFI3",
  },
  {
    id: 11,
    name: "Shazam",
    description:
      "v15.16.0 \nIdentify different genres of songs.\nPremium unlocked",
    fileSize: "20.95 MB",
    fileId: "1aBCtbIMNQ2Z5JUZDHxUxje0k5CABJDij",
  },
  {
    id: 12,
    name: "HD Streamz",
    description:
      "v3.9.2-a-170 \nStream a vast majority of Sports for free.\n No ADs!",
    fileSize: "21.1 MB",
    fileId: "1M6mOJat9hAs2vTibRTP8Av9LpoLfUMHw",
  },
  {
    id: 13,
    name: "Cricfy TV",
    description:
      "v5.0 \nStream a vast majority of Sports and Channels for free!\n Has popup ADs!",
    fileSize: "15.9 MB",
    fileId: "1oDXVimRkSaXuenpQfcGR0NAx3bJvYN1w",
  },
  {
    id: 14,
    name: "Adguard",
    description:
      "v4.10.4 \nProtect yourself from the dangers of the internet by blocking malware and trackers.\nPremium unlocked!",
    fileSize: "60.5 MB",
    fileId: "1L1qIotFilngbev4LN42fhnHKzDS9NZ_b",
  },
  {
    id: 15,
    name: "Solar VPN",
    description:
      "v4.10.1 \nMask your IP address location from trackers for free.\nNo ADs!",
    fileSize: "13.1 MB",
    fileId: "1M6mOJat9hAs2vTibRTP8Av9LpoLfUMHw",
  },
];

function App() {
  const [selectedAPK, setSelectedAPK] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Validation functions
  const filteredApks = searchTerm
    ? apkData.filter(
        (apk) =>
          apk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apk.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : apkData;
  const validateName = (name) => name.trim().length >= 3;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMessage = (message) => message.trim().length >= 10;

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

  // Add validation handlers for form inputs
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim() && !validateName(value)) {
      setNameError("Name must be at least 3 characters");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim() && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (value.trim() && !validateMessage(value)) {
      setMessageError("Message must be at least 10 characters");
    } else {
      setMessageError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submission
    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validateMessage(message)
    ) {
      return;
    }

    // Set loading state to true
    setIsSending(true);

    const suffix = "\n\n\n (Message was sent from Neshacks APK Store)";
    const fullMessage = `${message}${suffix}`;
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: name,
          email: email,
          message: fullMessage,
        },
        userID,
      )
      .then(
        (response) => {
          setIsSending(false); // Set loading state to false
          alert("Message sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
          setNameError("");
          setEmailError("");
          setMessageError("");
        },
        (error) => {
          setIsSending(false); // Set loading state to false even in case of error
          alert("Failed to send the message, please try again.");
        },
      );
  };

  const getPayPalLink = () => {
    const baseUrl = "https://www.paypal.com/donate";
    const businessEmail = "nehmz254@gmail.com";
    const currency = "USD";
    const purpose = "Donation to Neshacks APK Store";
    return `${baseUrl}?business=${encodeURIComponent(
      businessEmail,
    )}&currency_code=${currency}&amount=${donationAmount}&item_name=${encodeURIComponent(
      purpose,
    )}`;
  };

  // Check if form is valid
  const isFormValid =
    validateName(name) && validateEmail(email) && validateMessage(message);

  return (
    <div id="home" className="container">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <header id="home" className="header">
          <p className="header-tagline">
            Discover and download amazing mobile applications
          </p>
        </header>
      </div>
      <div className="card-container">
        {filteredApks.length > 0 ? (
          filteredApks.map((apk) => (
            <APKCard key={apk.id} apk={apk} onDownload={handleDownload} />
          ))
        ) : (
          <NoResultsFound
            searchTerm={searchTerm}
            resetSearch={() => setSearchTerm("")}
          />
        )}
      </div>
      {/* Wrapped Donate and Contact Sections */}
      <div className="side-by-side-container">
        <div className="side-by-side-sections">
          {/* Donation Section */}
          <section id="donate" className="card donation-section">
            <h2>Support Us</h2>
            <p>
              If you find our service helpful, consider supporting us with a
              donation.
            </p>
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
          <section id="contact" className="card contact-section">
            <h2>Contact Us</h2>
            <p>Have questions or suggestions? Reach out to us!</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Name (min 3 characters)"
                  className={`input-field ${nameError ? "input-error" : ""}`}
                  value={name}
                  onChange={handleNameChange}
                  required
                  disabled={isSending}
                />
                {nameError && <div className="error-message">{nameError}</div>}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`input-field ${emailError ? "input-error" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={isSending}
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>

              <div className="input-group">
                <textarea
                  placeholder="Your Message (min 10 characters)"
                  className={`textarea-field ${messageError ? "input-error" : ""}`}
                  value={message}
                  onChange={handleMessageChange}
                  required
                  disabled={isSending}
                />
                {messageError && (
                  <div className="error-message">{messageError}</div>
                )}
              </div>

              <button
                className="download-button"
                type="submit"
                disabled={!isFormValid || isSending}
              >
                {isSending ? (
                  <span className="button-with-spinner">
                    <ImSpinner8 className="spinner" /> Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
      <footer id="about" className="footer">
        <h3>About Neshacks apk store</h3>
        <p>
          We are dedicated to providing high-quality mobile applications that
          enhance your digital experience. Our curated selection ensures you get
          the best apps for your needs.
        </p>
        <div>© 2025 NesHacks. All Rights Reserved.</div>
        <a
          href="https://chat.whatsapp.com/BcWnInIGwoD9DQNUxISlGP"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon"
        >
          <FaWhatsapp size={30} color="green" />
        </a>
      </footer>
    </div>
  );
}

export default App;
