import React, { useEffect } from "react";

export default function PitchDeck() {
  useEffect(() => {
    window.location.href =
      "https://drive.google.com/file/d/19MBGjozu7d-x8HrAJys_DoPm58wnBZXe/view?usp=sharing";
  }, []);

  return <p>Opening pitchdeck...</p>;
}
