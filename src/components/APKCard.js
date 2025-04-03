import React from "react";

// Import React Icons
import { FaWhatsapp } from "react-icons/fa";
//import { FaSpotify } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFileWord } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { MdConnectedTv } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { FaSun } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";

function APKCard({ apk, onDownload }) {
  // Map app names to React Icons
  const getAppIcon = (appName) => {
    switch (appName.toLowerCase()) {
      case "whatsapp":
        return <FaWhatsapp size={48} />;
      case "truecaller":
        return <FaPhoneAlt size={48} />;
      case "tiktok":
        return <FaTiktok size={48} />;
      case "instagram":
        return <FaInstagram size={48} />;
      case "x (twitter)":
        return <FaTwitter size={48} />;
      case "wps office":
        return <FaFileWord size={48} />;
      case "telegram":
        return <FaTelegram size={48} />;
      case "snapchat":
        return <FaSnapchat size={48} />;
      case "newpipe":
        return <FaYoutube size={48} />;
      case "onstream":
        return <FaFilm size={48} />;
      case "shazam":
        return <FaMicrophone size={48} />;
      case "hd streamz":
        return <MdLiveTv size={48} />;
      case "cricfy tv":
        return <MdConnectedTv size={48} />;
      case "adguard":
        return <SiAdguard size={48} />;
      case "solar vpn":
        return <FaSun size={48} />;
      default:
        return <CgUnavailable size={48} />;
    }
  };

  return (
    <div className="card">
      <div className="icon">{getAppIcon(apk.name)}</div>
      <h3>{apk.name}</h3>
      <p>{apk.version}</p>
      <p>{apk.description}</p>
      <p>File Size: {apk.fileSize}</p>
      <button className="download-button" onClick={() => onDownload(apk)}>
        Download APK
      </button>
    </div>
  );
}

export default APKCard;
