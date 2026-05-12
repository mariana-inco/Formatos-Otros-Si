import type { NextConfig } from "next";
import path from "path";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const esDesarrollo = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    distDir: esDesarrollo ? ".next-dev" : ".next-build",
    turbopack: {
      root: path.resolve(__dirname),
    },
  };
}
