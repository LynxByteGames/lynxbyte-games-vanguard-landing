import React, { useEffect } from "react";

export default function PitchDeck() {
  useEffect(() => {
    window.location.href =
      "https://drive.google.com/file/d/1EHUYC-tnpvjPUZHQ8CXd610rDaYgleR1/view?usp=sharing";
  }, []);

  return <p>Opening pitchdeck...</p>;
}
