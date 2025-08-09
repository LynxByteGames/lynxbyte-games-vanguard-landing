import React, { useEffect } from "react";

export default function Estimator() {
  useEffect(() => {
    window.location.href =
      "https://docs.google.com/spreadsheets/d/1MTGJ-xRlCNssbOJJNKSHyibF2qRDWCjtmNM673lZ7wM/edit?usp=sharing";
  }, []);

  return <p>Opening pitchdeck...</p>;
}
