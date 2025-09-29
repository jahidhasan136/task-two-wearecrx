"use client";

import siteDataJson from "../../../site-data.json";

const Contact = () => {
  return (
    <div>
      <h2>Contact {siteDataJson?.title}</h2>
      <p>Phone: {siteDataJson?.phone}</p>
      <p>Address: {siteDataJson?.address}</p>
    </div>
  );
};

export default Contact;
