import React from "react";

function Loader({ message = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "20px",
      }}
    >
      {/* Spinning diya */}
      <div style={{ position: "relative", width: "70px", height: "70px" }}>
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "4px solid #ffe0c0",
            borderTop: "4px solid #ff6b00",
            animation: "spin 1s linear infinite",
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            inset: "12px",
            borderRadius: "50%",
            border: "3px solid #ffe0c0",
            borderBottom: "3px solid #ff8533",
            animation: "spin 0.7s linear infinite reverse",
          }}
        />
        {/* Center emoji */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          🪔
        </div>
      </div>

      {/* Message */}
      <p
        style={{
          color: "#ff6b00",
          fontWeight: "600",
          fontSize: "1rem",
          margin: 0,
          letterSpacing: "0.5px",
        }}
      >
        {message}
      </p>

      {/* Dot trail */}
      <div style={{ display: "flex", gap: "6px" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ff6b00",
              animation: `bounce 0.9s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.15); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(-6px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

export default Loader;