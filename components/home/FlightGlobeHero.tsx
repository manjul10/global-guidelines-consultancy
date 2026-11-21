"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  Plane,
  Navigation,
  Compass,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";

interface Destination {
  id: string;
  name: string;
  code: string;
  flag: string;
  city: string;
  intake: string;
  visaType: string;
  successRate: string;
  lat: number;
  lng: number;
  perks: string[];
}

const DESTINATIONS: Destination[] = [
  {
    id: "uk",
    name: "United Kingdom",
    code: "LHR",
    flag: "🇬🇧",
    city: "London / Manchester",
    intake: "Jan & Sept Intakes",
    visaType: "Student Visa (Tier 4) • 2-Yr Post-Study Work",
    successRate: "99.1%",
    lat: 51.5,
    lng: -0.1,
    perks: ["No IELTS waiver options", "2-year PSW Graduate Route", "Affordable Master's in 1 Year"],
  },
  {
    id: "usa",
    name: "United States",
    code: "JFK",
    flag: "🇺🇸",
    city: "Boston / California / NYC",
    intake: "Fall & Spring Intakes",
    visaType: "F-1 Academic Student Visa • STEM OPT 3 Yrs",
    successRate: "97.8%",
    lat: 40.7,
    lng: -74.0,
    perks: ["1-on-1 Mock Visa Drills", "STEM 36-month Work Extension", "Generous Merit Scholarships"],
  },
  {
    id: "australia",
    name: "Australia",
    code: "SYD",
    flag: "🇦🇺",
    city: "Sydney / Melbourne / Brisbane",
    intake: "Feb & July Intakes",
    visaType: "Subclass 500 • Genuine Student (GS) Test",
    successRate: "98.4%",
    lat: -33.8,
    lng: 151.2,
    perks: ["Level-1 University Access", "Fortnightly Part-time Work Rights", "Direct Regional PR Pathways"],
  },
  {
    id: "canada",
    name: "Canada",
    code: "YYZ",
    flag: "🇨🇦",
    city: "Toronto / Vancouver / Montreal",
    intake: "Sept & Jan Intakes",
    visaType: "Study Permit • Post-Graduation Work Permit (PGWP)",
    successRate: "97.5%",
    lat: 43.6,
    lng: -79.3,
    perks: ["Provincial Attestation Letter (PAL) support", "3-Year Open PGWP", "High Quality of Life"],
  },
  {
    id: "europe",
    name: "Europe / Schengen",
    code: "BER",
    flag: "🇪🇺",
    city: "Germany / France / Finland",
    intake: "Winter & Summer Intakes",
    visaType: "National D Visa • Schengen 29-Country Free Travel",
    successRate: "98.9%",
    lat: 52.5,
    lng: 13.4,
    perks: ["Tuition-free in German Public Unis", "English-taught degrees", "Shengen-wide career mobility"],
  },
];

// Tribhuvan International Airport, Kathmandu
const ORIGIN = {
  name: "Kathmandu, Nepal",
  code: "KTM",
  lat: 27.7172,
  lng: 85.324,
};

export default function FlightGlobeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [flightProgress, setFlightProgress] = useState(0.2);
  const [isAutoFlying, setIsAutoFlying] = useState(true);

  const activeDest = DESTINATIONS[activeDestIndex];

  // Canvas 3D rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere / Outer Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.3
      );
      glowGrad.addColorStop(0, "rgba(15, 44, 89, 0.45)");
      glowGrad.addColorStop(0.7, "rgba(229, 57, 53, 0.08)");
      glowGrad.addColorStop(1, "rgba(15, 44, 89, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Fill
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, "#1e3a68");
      sphereGrad.addColorStop(0.7, "#0f2c59");
      sphereGrad.addColorStop(1, "#07172e");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Globe Latitude & Longitude Wireframe
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 20) {
        const y = centerY + Math.sin((lat * Math.PI) / 180) * radius;
        const rLat = Math.cos((lat * Math.PI) / 180) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX, y, rLat, rLat * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Longitude meridians
      rotationAngle += 0.004;
      for (let i = 0; i < 8; i++) {
        const offset = rotationAngle + (i * Math.PI) / 4;
        const xOffset = Math.sin(offset) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.stroke();
      }

      // Helper to project 3D sphere coordinate to 2D screen
      const project = (lat: number, lng: number, rot: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + rot * 60) * (Math.PI / 180);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return {
          x: centerX + x,
          y: centerY - y,
          visible: z > -radius * 0.2, // Front hemisphere
        };
      };

      // 4. Draw Origin: Kathmandu (Tribhuvan Int'l)
      const ktm = project(ORIGIN.lat, ORIGIN.lng, rotationAngle * 0.3);
      if (ktm.visible) {
        // Sonar ring
        const pulse = (Date.now() / 800) % 1;
        ctx.beginPath();
        ctx.arc(ktm.x, ktm.y, 6 + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(229, 57, 53, ${1 - pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pin center
        ctx.beginPath();
        ctx.arc(ktm.x, ktm.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#E53935"; // Brand Red
        ctx.fill();

        // Label
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px monospace";
        ctx.fillText("KTM (Nepal)", ktm.x + 8, ktm.y - 4);
      }

      // 5. Draw Flight Route & Destination
      const dest = project(activeDest.lat, activeDest.lng, rotationAngle * 0.3);

      if (ktm.visible || dest.visible) {
        // Draw Curved Great-Circle Flight Path
        const ctrlX = (ktm.x + dest.x) / 2 - (ktm.y - dest.y) * 0.3;
        const ctrlY = (ktm.y + dest.y) / 2 + (ktm.x - dest.x) * 0.3;

        // Path glow
        ctx.beginPath();
        ctx.moveTo(ktm.x, ktm.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, dest.x, dest.y);
        ctx.strokeStyle = "rgba(229, 57, 53, 0.3)";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Core dashed flight path
        ctx.setLineDash([5, 4]);
        ctx.lineDashOffset = -Date.now() / 40;
        ctx.beginPath();
        ctx.moveTo(ktm.x, ktm.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, dest.x, dest.y);
        ctx.strokeStyle = "#F59E0B"; // Warm Gold
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Calculate Plane Position on quadratic bezier curve
        const t = flightProgress;
        const planeX = (1 - t) * (1 - t) * ktm.x + 2 * (1 - t) * t * ctrlX + t * t * dest.x;
        const planeY = (1 - t) * (1 - t) * ktm.y + 2 * (1 - t) * t * ctrlY + t * t * dest.y;

        // Plane angle tangent
        const dx = 2 * (1 - t) * (ctrlX - ktm.x) + 2 * t * (dest.x - ctrlX);
        const dy = 2 * (1 - t) * (ctrlY - ktm.y) + 2 * t * (dest.y - ctrlY);
        const angle = Math.atan2(dy, dx);

        // Draw Airplane Icon
        ctx.save();
        ctx.translate(planeX, planeY);
        ctx.rotate(angle);

        // Jet contrail trail
        const trailGrad = ctx.createLinearGradient(-30, 0, 0, 0);
        trailGrad.addColorStop(0, "rgba(245, 158, 11, 0)");
        trailGrad.addColorStop(1, "rgba(245, 158, 11, 0.9)");
        ctx.fillStyle = trailGrad;
        ctx.fillRect(-28, -1.5, 28, 3);

        // Airplane body (stylized jet)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-6, -6);
        ctx.lineTo(-4, -1.5);
        ctx.lineTo(-10, -5);
        ctx.lineTo(-8, 0);
        ctx.lineTo(-10, 5);
        ctx.lineTo(-4, 1.5);
        ctx.lineTo(-6, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw Destination Pin
      if (dest.visible) {
        ctx.beginPath();
        ctx.arc(dest.x, dest.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#F59E0B";
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px monospace";
        ctx.fillText(`${activeDest.code} (${activeDest.name})`, dest.x + 8, dest.y + 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeDest, flightProgress]);

  // Airplane flight progress simulation
  useEffect(() => {
    if (!isAutoFlying) return;
    const interval = setInterval(() => {
      setFlightProgress((prev) => {
        if (prev >= 0.95) {
          // cycle to next destination after pause
          setTimeout(() => {
            setActiveDestIndex((curr) => (curr + 1) % DESTINATIONS.length);
            setFlightProgress(0.05);
          }, 600);
          return 1;
        }
        return prev + 0.015;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isAutoFlying]);

  return (
    <div className="w-full bg-gradient-to-b from-brand-navy-900 via-slate-900 to-brand-navy-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background radar rings & glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
            <Plane className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            <span>Interactive 3D Study Radar • Live Flight Airways</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            From Kathmandu to Top World Universities
          </h2>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setIsAutoFlying(!isAutoFlying)}
            className={`px-3 py-1.5 rounded-lg font-bold border transition ${
              isAutoFlying
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-white/10 text-slate-300 border-white/15"
            }`}
          >
            {isAutoFlying ? "● Autopilot Active" : "○ Manual Mode"}
          </button>

          <Link
            href="/upload"
            className="inline-flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-md transition text-xs"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Documents Directly</span>
          </Link>
        </div>
      </div>

      {/* Destination Country Pills */}
      <div className="relative z-10 pt-6 flex flex-wrap gap-2">
        {DESTINATIONS.map((d, index) => {
          const isActive = index === activeDestIndex;
          return (
            <button
              key={d.id}
              onClick={() => {
                setActiveDestIndex(index);
                setFlightProgress(0.1);
                setIsAutoFlying(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                isActive
                  ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/30 scale-105"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              <span>{d.flag}</span>
              <span>{d.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({d.code})</span>
            </button>
          );
        })}
      </div>

      {/* Main Radar Screen: 3D Canvas + Live Flight Telemetry Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* Left: 3D Flight Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[480px] aspect-square relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={560}
              height={560}
              className="w-full h-full max-w-full drop-shadow-2xl cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Subtext info */}
          <div className="flex items-center space-x-4 text-[11px] text-slate-400 mt-2 font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span>Origin: Tribhuvan Int'l (KTM)</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Destination: {activeDest.code}</span>
            </div>
          </div>
        </div>

        {/* Right: Live Flight Status & Study Track Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-5 shadow-xl">
            {/* Country Banner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{activeDest.flag}</span>
                <div>
                  <h3 className="text-xl font-black text-white">{activeDest.name}</h3>
                  <div className="text-xs text-slate-300 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    <span>{activeDest.city}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider block">
                  Visa Grant Rate
                </span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {activeDest.successRate}
                </span>
              </div>
            </div>

            {/* Flight Route Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Intake Timing</span>
                <span className="font-bold text-amber-300">{activeDest.intake}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Visa Pathway</span>
                <span className="font-bold text-white truncate block">{activeDest.visaType}</span>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Why Study in {activeDest.name} With Us:
              </span>
              <ul className="space-y-2">
                {activeDest.perks.map((perk, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <Link
                href="/upload"
                className="w-full inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-brand-red/30 transition text-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Documents for {activeDest.name} Assessment</span>
              </Link>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-xl border border-white/15 transition text-xs"
              >
                <span>Book 1-on-1 Counseling for {activeDest.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
