import { ImageResponse } from "next/og";

export const alt = "Rox & Nex sports products";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at 78% 22%, rgba(215,25,32,0.34), transparent 34%), linear-gradient(135deg, #0c0b0b 0%, #161111 52%, #0c0b0b 100%)",
          color: "#f7f5f2",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
          <div
            style={{
              background: "#d71920",
              borderRadius: 999,
              height: 46,
              width: 10,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 400,
                letterSpacing: 0,
                lineHeight: 1,
              }}
            >
              ROX & NEX
            </div>
            <div
              style={{
                color: "#d8d2cc",
                fontSize: 18,
                fontWeight: 400,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              Sports Products
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              color: "#ff3b42",
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Fitness / Games / Sports
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 400,
              letterSpacing: 0,
              lineHeight: 0.96,
              maxWidth: 860,
            }}
          >
            Product catalog for active lifestyles.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {["Rox Fitness", "Nex Games"].map((label) => (
            <div
              key={label}
              style={{
                border: "1px solid rgba(247,245,242,0.18)",
                borderRadius: 999,
                color: "#f7f5f2",
                fontSize: 24,
                fontWeight: 400,
                padding: "18px 26px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
