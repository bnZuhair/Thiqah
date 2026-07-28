import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from other devices on the LAN (e.g. testing on a phone
  // via the "Network" URL printed by `next dev`). Without this, Next.js blocks cross-origin
  // requests to its dev assets, so the page loads but never hydrates — buttons look present
  // but clicks do nothing.
  allowedDevOrigins: ["192.168.1.*", "10.207.61.62", "172.20.10.*", "0.0.0.0"],
};

export default nextConfig;
