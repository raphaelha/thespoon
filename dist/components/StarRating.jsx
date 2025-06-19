import React from "react";
// SVG étoile moderne pleine, demi, vide
function ModernStar({ type }) {
    if (type === "full") {
        return (<svg className="w-5 h-5 text-blue-500 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
        <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36"/>
      </svg>);
    }
    if (type === "half") {
        return (<svg className="w-5 h-5 text-blue-500 drop-shadow" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stopColor="currentColor"/>
            <stop offset="50%" stopColor="transparent" stopOpacity="1"/>
          </linearGradient>
        </defs>
        <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36" fill="url(#half-grad)" stroke="currentColor" strokeWidth={1}/>
        <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36" fill="none" stroke="currentColor" strokeWidth={1}/>
      </svg>);
    }
    // empty
    return (<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 20 20">
      <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36"/>
    </svg>);
}
// Composant principal
export default function StarRating({ value, className = "" }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (value >= i) {
            stars.push(<ModernStar key={i} type="full"/>);
        }
        else if (value >= i - 0.5) {
            stars.push(<ModernStar key={i} type="half"/>);
        }
        else {
            stars.push(<ModernStar key={i} type="empty"/>);
        }
    }
    return <span className={`flex ${className}`}>{stars}</span>;
}
