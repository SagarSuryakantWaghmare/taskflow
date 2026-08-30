import React, { useRef, useEffect } from "react";

const shapesConfig = [
  {
    className: "shape-1",
    style: {
      width: 100,
      height: 100,
      top: "20%",
      left: "10%",
      background: "rgba(37,99,235,0.08)", // blue-600/20
      animationDelay: "0s",
    },
  },
  {
    className: "shape-2",
    style: {
      width: 150,
      height: 150,
      top: "60%",
      right: "15%",
      background: "rgba(147,51,234,0.08)", // purple-600/20
      animationDelay: "2s",
    },
  },
  {
    className: "shape-3",
    style: {
      width: 80,
      height: 80,
      bottom: "20%",
      left: "20%",
      background: "rgba(34,197,94,0.08)", // green-600/20
      animationDelay: "4s",
    },
  },
];

function randomFloatTransform() {
  const randomX = Math.random() * 50 - 25;
  const randomY = Math.random() * 50 - 25;
  return `translate(${randomX}px, ${randomY}px)`;
}

const NotFound = () => {
  const shapeRefs = [useRef(), useRef(), useRef()];
  const errorCodeRef = useRef();

  useEffect(() => {
    const intervals = shapeRefs.map((ref, idx) =>
      setInterval(() => {
        if (ref.current) {
          ref.current.style.transform = randomFloatTransform();
        }
      }, 3000 + idx * 1000)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const handleErrorCodeClick = () => {
    if (errorCodeRef.current) {
      errorCodeRef.current.style.transform = "scale(1.1)";
      errorCodeRef.current.style.transition = "transform 0.4s ease";
      setTimeout(() => {
        errorCodeRef.current.style.transform = "scale(1)";
      }, 400);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white overflow-x-hidden font-sans relative">
      {/* Animated background shapes */}
      <div className="fixed w-full h-full top-0 left-0 z-0 pointer-events-none">
        {shapesConfig.map((shape, idx) => (
          <div
            key={shape.className}
            ref={shapeRefs[idx]}
            className="absolute rounded-full"
            style={{
              ...shape.style,
              position: "absolute",
              borderRadius: "50%",
              boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
              animation: "float 6s ease-in-out infinite",
            }}
          />
        ))}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 relative z-10 w-full">
        <div
          ref={errorCodeRef}
          className="error-code font-extrabold mb-4"
          style={{
            fontSize: "clamp(5rem, 15vw, 10rem)",
            color: "#3b82f6", // Tailwind blue-500
            lineHeight: 0.9,
            animation: "pulse 2s ease-in-out infinite",
            cursor: "pointer",
            textShadow: "0 2px 16px rgba(59,130,246,0.15)",
          }}
          onClick={handleErrorCodeClick}
        >
          404
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
          }
        `}</style>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-400">Page Not Found</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have vanished into the digital void.<br />
          Don't worry though - we'll help you get back on track to boost your productivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 w-full max-w-md mx-auto">
          <a
            href="/"
            className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all bg-blue-600 text-white shadow-lg hover:bg-blue-700 font-semibold w-full sm:w-auto justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </a>
          <button
            className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 font-semibold w-full sm:w-auto justify-center"
            onClick={() => window.history.back()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Go Back
          </button>
        </div>

        
      </main>
    </div>
  );
};

export default NotFound;