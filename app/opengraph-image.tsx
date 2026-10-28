import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "McPrime Digital: AI-native films, commercials and automation systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
    const logo = await readFile(path.join(process.cwd(), "public", "logo.png"));
    const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background: "linear-gradient(135deg, #05070c 0%, #0b1020 55%, #141a33 100%)",
                    color: "#ffffff",
                    fontFamily: "Helvetica, Arial, sans-serif",
                }}
            >
                <img src={logoSrc} alt="" width={260} height={65} style={{ objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ fontSize: 30, letterSpacing: 8, color: "#7dd3fc", textTransform: "uppercase" }}>Architects of</div>
                    <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>AI-Native Film &amp; Automation Systems</div>
                    <div style={{ fontSize: 28, color: "#cbd5e1", marginTop: 12 }}>
                        Broadcast-grade commercials and governed automation infrastructure for enterprise teams.
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#94a3b8" }}>
                    <span>www.mcprimedigital.com</span>
                    <span>Film · Automation · Add-Ons</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
