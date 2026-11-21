"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Plane,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  ChevronDown,
  Globe2,
  MapPin,
} from "lucide-react";

interface DestinationInfo {
  id: string;
  name: string;
  code: string;
  flag: string;
  city: string;
  lat: number;
  lng: number;
  intake: string;
  visaType: string;
  successRate: string;
  perks: string[];
}

const DESTINATIONS: DestinationInfo[] = [
  {
    id: "usa",
    name: "United States",
    code: "JFK / IAD",
    flag: "🇺🇸",
    city: "New York / Washington / Boston",
    lat: 38.9072,
    lng: -77.0369,
    intake: "Fall & Spring Intakes",
    visaType: "F-1 Student Visa • 3-Year STEM OPT",
    successRate: "97.8%",
    perks: ["1-on-1 Mock Visa Drills", "STEM 36-month Work Extension", "Top University Scholarships"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "LHR / MAN",
    flag: "🇬🇧",
    city: "London / Manchester",
    lat: 51.5074,
    lng: -0.1278,
    intake: "Jan & Sept Intakes",
    visaType: "Student Route • 2-Year Graduate PSW",
    successRate: "99.1%",
    perks: ["1-Year Fast Master's", "No IELTS Waiver Options", "High Visa Turnaround"],
  },
  {
    id: "australia",
    name: "Australia",
    code: "SYD / MEL",
    flag: "🇦🇺",
    city: "Sydney / Melbourne / Brisbane",
    lat: -33.8688,
    lng: 151.2093,
    intake: "Feb & July Intakes",
    visaType: "Subclass 500 • Genuine Student (GS)",
    successRate: "98.4%",
    perks: ["Level-1 University Priority", "Fortnightly Part-time Work", "Post-Study Regional PR"],
  },
  {
    id: "canada",
    name: "Canada",
    code: "YYZ / YVR",
    flag: "🇨🇦",
    city: "Toronto / Vancouver",
    lat: 43.6532,
    lng: -79.3832,
    intake: "Sept & Jan Intakes",
    visaType: "Study Permit • 3-Yr Open PGWP",
    successRate: "97.5%",
    perks: ["Provincial Attestation (PAL) Guidance", "Spouse Open Work Permit", "Top Co-op Programs"],
  },
  {
    id: "europe",
    name: "Europe / Schengen",
    code: "FRA / BER",
    flag: "🇪🇺",
    city: "Germany / France / Finland",
    lat: 52.52,
    lng: 13.405,
    intake: "Winter & Summer",
    visaType: "National D Visa • 29 Schengen Countries",
    successRate: "98.9%",
    perks: ["Zero Tuition in Public German Universities", "English-taught Courses", "EU-wide Job Mobility"],
  },
];

// Tribhuvan International Airport, Kathmandu (KTM / VNKT)
const KATHMANDU = {
  name: "Kathmandu, Nepal",
  code: "KTM",
  lat: 27.7172,
  lng: 85.324,
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// -------------------------------------------------------------
// PROCEDURAL NATURAL RUNWAY TEXTURE GENERATORS
// -------------------------------------------------------------

function createThresholdTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Weathered Bitumen Asphalt Base
  ctx.fillStyle = "#121722";
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Micro-aggregate Mineral Grain (Pebble Noise)
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 20;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  // 3. Solid White Runway Edge Lines (0.9m ICAO standard)
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(52, 0, 14, 1024);
  ctx.fillRect(1024 - 52 - 14, 0, 14, 1024);

  // 4. Threshold Entry Green Line at y = 990
  ctx.fillStyle = "#10b981";
  ctx.fillRect(52, 990, 1024 - 104, 10);

  // 5. 12 Symmetrical Runway Threshold "Piano Keys"
  ctx.fillStyle = "#f8fafc";
  const numBars = 12;
  const barWidth = 44;
  const barHeight = 280;
  const totalSpan = 1024 - 240;
  const spacing = (totalSpan - numBars * barWidth) / (numBars - 1);
  const startX = 120;

  for (let i = 0; i < numBars; i++) {
    const x = startX + i * (barWidth + spacing);
    ctx.fillRect(x, 660, barWidth, barHeight);
  }

  // 6. Bold Airport Stencil Designation: "02" (Tribhuvan Int'l KTM Runway 02)
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 130px 'Courier New', monospace, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("0 2", 512, 490);
  ctx.restore();

  // 7. Centerline Dashes starting after designation
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(512 - 7, 120, 14, 180);
  ctx.fillRect(512 - 7, 0, 14, 60);

  // 8. Initial Touchdown Tire Skid Marks
  const leftTrackX = 435;
  const rightTrackX = 589;
  for (let s = 0; s < 25; s++) {
    ctx.fillStyle = `rgba(5, 7, 10, ${0.15 + Math.random() * 0.35})`;
    const w = 6 + Math.random() * 14;
    const h = 100 + Math.random() * 320;
    const y = Math.random() * 360;
    ctx.fillRect(leftTrackX + (Math.random() - 0.5) * 36, y, w, h);
    ctx.fillRect(rightTrackX + (Math.random() - 0.5) * 36, y, w, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createMainRunwayTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Base Asphalt
  ctx.fillStyle = "#121722";
  ctx.fillRect(0, 0, 1024, 2048);

  // 2. Aggregate Noise
  const imgData = ctx.getImageData(0, 0, 1024, 2048);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  // 3. Outer Edge Solid Lines
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(52, 0, 14, 2048);
  ctx.fillRect(1024 - 52 - 14, 0, 14, 2048);

  // 4. Centerline Yellow Dashes
  ctx.fillStyle = "#fbbf24";
  const dashLength = 160;
  const gapLength = 100;
  const cycle = dashLength + gapLength;
  for (let y = 0; y < 2048; y += cycle) {
    ctx.fillRect(512 - 7, y, 14, dashLength);
  }

  // 5. Heavy Touchdown Zone Tire Rubber Deposits (Authentic Airline Rubber Deposition)
  const leftTrackX = 436;
  const rightTrackX = 588;

  for (let s = 0; s < 50; s++) {
    const alpha = 0.12 + Math.random() * 0.38;
    ctx.fillStyle = `rgba(4, 6, 9, ${alpha})`;
    const w = 7 + Math.random() * 18;
    const len = 350 + Math.random() * 1100;
    const yStart = Math.random() * (2048 - len);

    ctx.fillRect(leftTrackX + (Math.random() - 0.5) * 45, yStart, w, len);
    ctx.fillRect(rightTrackX + (Math.random() - 0.5) * 45, yStart, w, len);
  }

  // Touchdown aiming point blocks ("Captain's Bars")
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(260, 600, 80, 280);
  ctx.fillRect(1024 - 260 - 80, 600, 80, 280);

  // Touchdown zone distance hash marks
  for (let y = 1300; y < 1950; y += 220) {
    ctx.fillRect(310, y, 32, 120);
    ctx.fillRect(355, y, 32, 120);
    ctx.fillRect(1024 - 310 - 32, y, 32, 120);
    ctx.fillRect(1024 - 355 - 32, y, 32, 120);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createShoulderTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#0c1018";
  ctx.fillRect(0, 0, 256, 512);

  // Diagonal warning chevrons
  ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
  ctx.lineWidth = 10;
  for (let y = -256; y < 768; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y + 160);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createShadowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const radGrad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
  radGrad.addColorStop(0, "rgba(0, 0, 0, 0.85)");
  radGrad.addColorStop(0.45, "rgba(0, 0, 0, 0.4)");
  radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function HeroTakeoffExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [activePhase, setActivePhase] = useState<"runway" | "takeoff" | "orbit">("runway");
  const [activeDestIndex, setActiveDestIndex] = useState(0);

  const activeDest = DESTINATIONS[activeDestIndex];

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Atmospheric night fog blending runway into distance
    scene.fog = new THREE.Fog(0x060e1a, 40, 260);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.8, 15);
    camera.lookAt(0, 0.75, -14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Airfield Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    sunLight.position.set(15, 25, 20);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(-20, -10, -15);
    scene.add(rimLight);

    // 3. Airport Runway & Ground Construction
    const runwayGroup = new THREE.Group();

    // Vast Surrounding Airfield Terrain (Eliminates sharp cutoffs)
    const airfieldGroundGeo = new THREE.PlaneGeometry(600, 750);
    const airfieldGroundMat = new THREE.MeshStandardMaterial({
      color: 0x081014,
      roughness: 0.98,
      metalness: 0.02,
    });
    const airfieldGround = new THREE.Mesh(airfieldGroundGeo, airfieldGroundMat);
    airfieldGround.rotation.x = -Math.PI / 2;
    airfieldGround.position.set(0, -0.12, -280);
    runwayGroup.add(airfieldGround);

    // Threshold Section (First 90m of Runway where aircraft stands)
    const thresholdTex = createThresholdTexture();
    if (thresholdTex) {
      const thresholdGeo = new THREE.PlaneGeometry(44, 90);
      const thresholdMat = new THREE.MeshStandardMaterial({
        map: thresholdTex,
        roughness: 0.85,
        metalness: 0.12,
      });
      const thresholdMesh = new THREE.Mesh(thresholdGeo, thresholdMat);
      thresholdMesh.rotation.x = -Math.PI / 2;
      thresholdMesh.position.set(0, -0.04, -20);
      runwayGroup.add(thresholdMesh);
    }

    // Main Runway Tarmac (Extending from z = -65 down to z = -580)
    const mainRunwayTex = createMainRunwayTexture();
    if (mainRunwayTex) {
      mainRunwayTex.repeat.set(1, 4);
      const mainGeo = new THREE.PlaneGeometry(44, 520);
      const mainMat = new THREE.MeshStandardMaterial({
        map: mainRunwayTex,
        roughness: 0.85,
        metalness: 0.12,
      });
      const mainMesh = new THREE.Mesh(mainGeo, mainMat);
      mainMesh.rotation.x = -Math.PI / 2;
      mainMesh.position.set(0, -0.05, -325);
      runwayGroup.add(mainMesh);
    }

    // Asphalt Shoulders with Chevron Hazard Striping
    const shoulderTex = createShoulderTexture();
    if (shoulderTex) {
      shoulderTex.repeat.set(1, 16);
      const shoulderGeo = new THREE.PlaneGeometry(8, 610);
      const shoulderMat = new THREE.MeshStandardMaterial({
        map: shoulderTex,
        roughness: 0.92,
        metalness: 0.08,
      });

      const leftShoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
      leftShoulder.rotation.x = -Math.PI / 2;
      leftShoulder.position.set(-26, -0.07, -280);
      runwayGroup.add(leftShoulder);

      const rightShoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
      rightShoulder.rotation.x = -Math.PI / 2;
      rightShoulder.position.set(26, -0.07, -280);
      runwayGroup.add(rightShoulder);
    }

    // PAPI (Precision Approach Path Indicator) 4-Light Array on Left Side
    const papiGroup = new THREE.Group();
    papiGroup.position.set(-25, 0.35, -45);
    const papiBoxGeo = new THREE.BoxGeometry(0.8, 0.5, 0.8);
    const papiBoxMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
    const whiteLensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const redLensMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    [-1.8, -0.6, 0.6, 1.8].forEach((xOffset, idx) => {
      const box = new THREE.Mesh(papiBoxGeo, papiBoxMat);
      box.position.set(xOffset, 0, 0);
      papiGroup.add(box);

      const lensGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const lens = new THREE.Mesh(lensGeo, idx < 2 ? whiteLensMat : redLensMat);
      lens.position.set(xOffset, 0, 0.42);
      papiGroup.add(lens);
    });
    runwayGroup.add(papiGroup);

    // Green Runway Threshold Light Bar
    const greenLightMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const greenBulbGeo = new THREE.SphereGeometry(0.14, 8, 8);
    for (let x = -20; x <= 20; x += 2.5) {
      const gLight = new THREE.Mesh(greenBulbGeo, greenLightMat);
      gLight.position.set(x, 0.12, 24.5);
      runwayGroup.add(gLight);
    }

    // Elevated Edge Lights (Blue Taxiway / Runway Outlines)
    const blueBulbGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const blueLightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const amberLightMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const stanchionGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.28, 6);
    const stanchionMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });

    for (let z = -560; z <= 24; z += 18) {
      // Left Stanchion & Light
      const leftStanchion = new THREE.Mesh(stanchionGeo, stanchionMat);
      leftStanchion.position.set(-22.4, 0.14, z);
      runwayGroup.add(leftStanchion);
      const leftLight = new THREE.Mesh(blueBulbGeo, blueLightMat);
      leftLight.position.set(-22.4, 0.3, z);
      runwayGroup.add(leftLight);

      // Right Stanchion & Light
      const rightStanchion = new THREE.Mesh(stanchionGeo, stanchionMat);
      rightStanchion.position.set(22.4, 0.14, z);
      runwayGroup.add(rightStanchion);
      const rightLight = new THREE.Mesh(blueBulbGeo, blueLightMat);
      rightLight.position.set(22.4, 0.3, z);
      runwayGroup.add(rightLight);

      // Embedded Amber Centerline Beacons
      if (z === 0 || z === -100 || z === -200 || z === -300 || z === -400) {
        const centerAmber = new THREE.Mesh(blueBulbGeo, amberLightMat);
        centerAmber.position.set(0, 0.12, z);
        runwayGroup.add(centerAmber);
      }
    }

    // Ground Contact Shadow Beneath Aircraft (Eliminates floaty look)
    const shadowTex = createShadowTexture();
    let shadowMesh: THREE.Mesh | null = null;
    let shadowMat: THREE.MeshBasicMaterial | null = null;
    if (shadowTex) {
      shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 12), shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.set(0, 0.02, 2.0);
      runwayGroup.add(shadowMesh);
    }

    scene.add(runwayGroup);

    // 4. Forward Aircraft Taxi & Runway Illumination Cone
    const aircraftSpotlight = new THREE.SpotLight(0xfff7ed, 4.5, 65, Math.PI / 3.8, 0.45, 1.2);
    aircraftSpotlight.position.set(0, 1.4, 3.0);
    const spotlightTarget = new THREE.Object3D();
    spotlightTarget.position.set(0, 0, -32.0);
    scene.add(spotlightTarget);
    aircraftSpotlight.target = spotlightTarget;
    scene.add(aircraftSpotlight);

    // 5. Authentic Nepal Airlines Airbus A320 Jetliner
    const airlinerHolder = new THREE.Group();
    airlinerHolder.position.set(0, 0.75, -2.5);
    scene.add(airlinerHolder);

    // Initial sleek placeholder while 3D model loads
    const placeholderAirliner = new THREE.Group();
    {
      const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.2 });
      const wingMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35, metalness: 0.3 });
      const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2, metalness: 0.2 });

      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.32, 7.2, 16), whiteMat);
      body.rotation.x = Math.PI / 2;
      placeholderAirliner.add(body);

      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.6, 16), whiteMat);
      nose.rotation.x = -Math.PI / 2;
      nose.position.set(0, 0, 4.4);
      placeholderAirliner.add(nose);

      const wings = new THREE.Mesh(new THREE.BoxGeometry(8.0, 0.08, 1.3), wingMat);
      wings.position.set(0, -0.05, 0.4);
      placeholderAirliner.add(wings);

      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 1.4), redMat);
      tail.position.set(0, 0.85, -3.1);
      tail.rotation.x = -0.25;
      placeholderAirliner.add(tail);

      placeholderAirliner.scale.set(0.8, 0.8, 0.8);
      airlinerHolder.add(placeholderAirliner);
    }

    // Load High-Poly Realistic Commercial Jetliner with Authentic Nepal Airlines Livery Textures
    const texLoader = new THREE.TextureLoader();
    const fuselageTex = texLoader.load("/textures/airplane/nepal_airlines_fuselage.png");
    fuselageTex.flipY = false;
    fuselageTex.colorSpace = THREE.SRGBColorSpace;

    const tailTex = texLoader.load("/textures/airplane/nepal_airlines_tail.png");
    tailTex.flipY = false;
    tailTex.colorSpace = THREE.SRGBColorSpace;

    const wingsTex = texLoader.load("/textures/airplane/nepal_airlines_wings.png");
    wingsTex.flipY = false;
    wingsTex.colorSpace = THREE.SRGBColorSpace;

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/airplane.glb",
      (gltf) => {
        const gltfModel = gltf.scene;

        gltfModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const name = mesh.name.toLowerCase();
            if (name === "top" || name === "t.001") {
              mesh.material = new THREE.MeshStandardMaterial({
                map: tailTex,
                roughness: 0.25,
                metalness: 0.2,
              });
            } else if (name === "body" || name === "b.001") {
              mesh.material = new THREE.MeshStandardMaterial({
                map: fuselageTex,
                roughness: 0.25,
                metalness: 0.25,
              });
            } else if (name.includes("wing") || name === "lw.001" || name === "rw.001") {
              mesh.material = new THREE.MeshStandardMaterial({
                map: wingsTex,
                roughness: 0.35,
                metalness: 0.4,
              });
            } else {
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0xe2e8f0,
                roughness: 0.35,
                metalness: 0.3,
              });
            }
          }
        });

        const box = new THREE.Box3().setFromObject(gltfModel);
        const center = new THREE.Vector3();
        box.getCenter(center);
        gltfModel.position.sub(center);

        const airplanePivot = new THREE.Group();
        airplanePivot.add(gltfModel);
        airplanePivot.rotation.y = Math.PI;
        airplanePivot.scale.set(0.125, 0.125, 0.125);

        airlinerHolder.clear();
        airlinerHolder.add(airplanePivot);
      },
      undefined,
      (err) => {
        console.warn("GLB load note:", err);
      }
    );

    // 6. Jet Engine Exhaust Contrail Particle Ribbon
    const contrailGeo = new THREE.BufferGeometry();
    const contrailCount = 140;
    const contrailPositions = new Float32Array(contrailCount * 3);
    for (let i = 0; i < contrailCount * 3; i++) {
      contrailPositions[i] = 0;
    }
    contrailGeo.setAttribute("position", new THREE.BufferAttribute(contrailPositions, 3));
    const contrailMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.35,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const contrailPoints = new THREE.Points(contrailGeo, contrailMat);
    scene.add(contrailPoints);

    // 7. Realistic 3D Earth Globe (Clean, Natural NASA Blue Marble)
    const earthRadius = 4.2;
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, -35, -30);

    const textureLoader = new THREE.TextureLoader();
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("/textures/earth/earth-blue-marble.jpg"),
      bumpMap: textureLoader.load("/textures/earth/earth-topology.png"),
      bumpScale: 0.08,
      roughness: 0.65,
      metalness: 0.15,
    });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, 64, 64), earthMaterial);
    earthGroup.add(earthMesh);

    // Semi-transparent Atmospheric Clouds
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("/textures/earth/earth-clouds.png"),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius + 0.05, 64, 64),
      cloudsMaterial
    );
    earthGroup.add(cloudsMesh);

    // Atmospheric Rayleigh Glow
    const atmosphereGeo = new THREE.SphereGeometry(earthRadius + 0.35, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0) * intensity * 0.9;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    scene.add(earthGroup);

    // -------------------------------------------------------------
    // UNIFIED CONTINUOUS TRAJECTORY (NO CLIPPING, NO PENETRATION)
    // -------------------------------------------------------------
    function getOrbitPoint(angle: number, targetEarthY: number): THREE.Vector3 {
      // Safe orbital altitude comfortably above atmosphere (4.55) & clouds (4.25)
      const r = earthRadius + 1.25; // 5.45 units
      const x = Math.sin(angle) * (r * 1.18);
      const y = targetEarthY + 0.85 + Math.sin(angle * 0.8 + 0.4) * (r * 0.35);
      const z = -8.5 + Math.cos(angle) * (r * 1.08);
      return new THREE.Vector3(x, y, z);
    }

    function getUnifiedFlightState(p: number, time: number) {
      let planePos = new THREE.Vector3();
      let nextPos = new THREE.Vector3();
      let camPos = new THREE.Vector3();
      let lookTarget = new THREE.Vector3();
      let planeScale = 1.0;
      let earthPos = new THREE.Vector3(0, -35, -30);
      let earthScale = 0.5;
      let contrailOpacity = 0.0;
      let runwayY = 0;
      let spotIntensity = 4.5;

      if (p <= 0.25) {
        // --- STAGE 1: RUNWAY ROLL & ACCELERATION (p: 0 -> 0.25) ---
        const u = p / 0.25;
        const z = -2.5 - u * 24.5; // -2.5 to -27.0
        planePos.set(0, 0.75, z);
        nextPos.set(0, 0.75, z - 1.0);
        camPos.set(0, 4.4, z + 16.5);
        lookTarget.set(0, 0.75, z - 16.0);
        earthPos.set(0, -35, -30);
        earthScale = 0.5;
        runwayY = 0;
        planeScale = 1.0;
        contrailOpacity = 0.0;
        spotIntensity = 4.5;
      } else if (p <= 0.60) {
        // --- STAGE 2: AERODYNAMIC ROTATION & CLIMB (p: 0.25 -> 0.60) ---
        const u = (p - 0.25) / 0.35;
        const z = -25.0 - u * 45.0; // -25.0 to -70.0
        const liftY = 0.75 + Math.pow(u, 1.4) * 14.0;
        const x = Math.sin(u * Math.PI) * 2.0;

        planePos.set(x, liftY, z);

        const uNext = Math.min(u + 0.02, 1.0);
        const zNext = -25.0 - uNext * 45.0;
        const liftYNext = 0.75 + Math.pow(uNext, 1.4) * 14.0;
        const xNext = Math.sin(uNext * Math.PI) * 2.0;
        nextPos.set(xNext, liftYNext, zNext);

        camPos.set(x * 0.5, 4.0 + (liftY - 0.75) * 0.7, z + 14.0);
        lookTarget.set(x * 0.7, liftY * 0.9, z - 15.0);

        earthPos.set(0, THREE.MathUtils.lerp(-35, -15, u), THREE.MathUtils.lerp(-30, -18, u));
        earthScale = THREE.MathUtils.lerp(0.5, 0.75, u);
        runwayY = -u * 15.0;
        planeScale = 1.0;
        contrailOpacity = Math.min(u * 1.5, 0.85);
        spotIntensity = Math.max(0, 4.5 * (1 - u));
      } else {
        // --- STAGE 3: SEAMLESS INSERTION INTO ORBIT (p: 0.60 -> 1.0) ---
        const s = (p - 0.60) / 0.40;
        const targetEarthY = -0.5;

        earthPos.set(
          0,
          THREE.MathUtils.lerp(-15, targetEarthY, s),
          THREE.MathUtils.lerp(-18, -8.5, s)
        );
        earthScale = THREE.MathUtils.lerp(0.75, 1.0, s);

        const exitPlane = new THREE.Vector3(0, 14.75, -70.0);
        const exitCam = new THREE.Vector3(0, 13.8, -56.0);
        const exitTarget = new THREE.Vector3(0, 13.2, -85.0);

        const orbitAngle = time * 0.25 + s * (Math.PI * 1.5);
        const orbitPlane = getOrbitPoint(orbitAngle, targetEarthY);
        const orbitPlaneNext = getOrbitPoint(orbitAngle + 0.04, targetEarthY);
        const orbitCam = new THREE.Vector3(0, 2.2, 12.0);
        const orbitTarget = new THREE.Vector3(0, targetEarthY, -8.5);

        const smoothS = Math.min(s * 1.25, 1.0);
        planePos.lerpVectors(exitPlane, orbitPlane, smoothS);
        nextPos.lerpVectors(new THREE.Vector3(0, 15.0, -75.0), orbitPlaneNext, smoothS);
        camPos.lerpVectors(exitCam, orbitCam, smoothS);
        lookTarget.lerpVectors(exitTarget, orbitTarget, s);

        // Anti-penetration safety clamp: airplane strictly remains outside atmosphere & clouds
        const toEarth = planePos.clone().sub(earthPos);
        const currentDist = toEarth.length();
        const minSafeDist = earthRadius * earthScale + 0.95;
        if (currentDist < minSafeDist && currentDist > 0.001) {
          toEarth.setLength(minSafeDist);
          planePos.copy(earthPos.clone().add(toEarth));
        }

        planeScale = THREE.MathUtils.lerp(1.0, 0.16, s);
        runwayY = -120;
        contrailOpacity = Math.max(0, 0.85 - s * 2.0);
        spotIntensity = 0;
      }

      return {
        planePos,
        nextPos,
        camPos,
        lookTarget,
        planeScale,
        earthPos,
        earthScale,
        contrailOpacity,
        runwayY,
        spotIntensity,
      };
    }

    // 8. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let smoothedProgress = 0;
    let lastReportedPhase = "runway";

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const time = now / 1000;

      let rawProgress = 0;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const total = containerRef.current.offsetHeight - window.innerHeight;
        if (total > 0) {
          rawProgress = Math.min(Math.max(-rect.top / total, 0), 1);
        }
      }

      smoothedProgress += (rawProgress - smoothedProgress) * Math.min(delta * 9, 1);

      let currentPhase: "runway" | "takeoff" | "orbit" = "runway";
      if (smoothedProgress >= 0.72) {
        currentPhase = "orbit";
      } else if (smoothedProgress >= 0.18) {
        currentPhase = "takeoff";
      }

      if (currentPhase !== lastReportedPhase) {
        lastReportedPhase = currentPhase;
        setActivePhase(currentPhase);
      }

      // Clouds rotation
      cloudsMesh.rotation.y += delta * 0.03;
      earthMesh.rotation.y += delta * 0.045;

      const state = getUnifiedFlightState(smoothedProgress, time);

      // Airplane transformation
      airlinerHolder.position.copy(state.planePos);
      airlinerHolder.lookAt(state.nextPos);
      airlinerHolder.scale.set(state.planeScale, state.planeScale, state.planeScale);

      if (smoothedProgress > 0.15 && smoothedProgress < 0.72) {
        airlinerHolder.rotateZ(Math.sin(time * 3) * 0.02);
      } else if (smoothedProgress >= 0.72) {
        airlinerHolder.rotateZ(-0.25);
      }

      // Aircraft Spotlight
      aircraftSpotlight.position.set(state.planePos.x, state.planePos.y + 0.6, state.planePos.z + 1.0);
      spotlightTarget.position.set(state.nextPos.x, 0, state.planePos.z - 28.0);
      aircraftSpotlight.intensity = state.spotIntensity;

      // Contact Ground Shadow
      if (shadowMesh && shadowMat) {
        shadowMesh.position.x = state.planePos.x;
        shadowMesh.position.z = state.planePos.z;
        const groundDist = state.planePos.y - 0.75;
        shadowMat.opacity = Math.max(0, 0.85 - groundDist * 0.18);
      }

      // Camera
      camera.position.copy(state.camPos);
      camera.lookAt(state.lookTarget);

      // Earth
      earthGroup.position.copy(state.earthPos);
      earthGroup.scale.set(state.earthScale, state.earthScale, state.earthScale);

      // Runway
      runwayGroup.position.y = state.runwayY;

      // Contrail
      if (state.contrailOpacity > 0.01) {
        const positions = contrailGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < contrailCount; i++) {
          const spread = (i / contrailCount) * 12;
          positions[i * 3] = (i % 2 === 0 ? -2.2 : 2.2) + (Math.random() - 0.5) * 0.25;
          positions[i * 3 + 1] = state.planePos.y - 0.2 - Math.random() * 0.3;
          positions[i * 3 + 2] = state.planePos.z + 3.0 + spread;
        }
        contrailGeo.attributes.position.needsUpdate = true;
        contrailMat.opacity = state.contrailOpacity;
      } else {
        contrailMat.opacity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const scrollToHeroContent = () => {
    if (!containerRef.current) return;
    const targetScroll = containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.6;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-slate-950 text-white">
      {/* Sticky 3D Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Three.js Canvas Container */}
        <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Cinematic Atmospheric Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,14,26,0.9)_100%)] pointer-events-none z-10" />

        {/* ========================================================================= */}
        {/* SCREEN 1: PRE-TAKEOFF RUNWAY HUD (Visible ONLY in "runway" phase)         */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 transition-all duration-700 pointer-events-none ${
            activePhase === "runway"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-12 pointer-events-none"
          }`}
        >
          {/* Top Title Section (Positioned high so runway & plane are in clear view) */}
          <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-6">
            <div className="text-center max-w-3xl mx-auto space-y-2 pt-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
                From Nepal to <br />
                <span className="text-brand-red">World Universities</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium drop-shadow leading-relaxed">
                Your international study journey begins on this runway. Scroll down to accelerate, take off, and explore top destination universities.
              </p>
            </div>
          </div>

          {/* Bottom Prompt: Scroll Down */}
          <div className="max-w-md mx-auto text-center space-y-2 pointer-events-auto pb-10 sm:pb-14">
            <button
              onClick={scrollToHeroContent}
              className="inline-flex flex-col items-center space-y-2 text-xs font-semibold text-white/90 hover:text-white transition group cursor-pointer"
            >
              <div className="flex items-center space-x-2 bg-slate-900/85 px-5 py-2.5 rounded-full border border-white/20 backdrop-blur-md shadow-2xl group-hover:border-brand-red group-hover:bg-slate-900 transition">
                <Plane className="w-4 h-4 text-brand-red fill-brand-red transition transform -rotate-45" />
                <span className="font-bold tracking-wide text-white text-xs sm:text-sm">Scroll Down</span>
              </div>
              <ChevronDown className="w-4 h-4 text-white/70 animate-bounce" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCREEN 2: ORBITAL EARTH & HERO DESTINATIONS (Visible ONLY in "orbit" phase)*/}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8 lg:p-12 transition-all duration-700 ${
            activePhase === "orbit"
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          {/* Top Flight Radar Bar */}
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-0.5">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400">
                <Globe2 className="w-4 h-4 text-brand-red animate-spin" style={{ animationDuration: "12s" }} />
                <span>IN ORBIT: KATHMANDU (KTM) ➔ {activeDest.code}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white">
                Global Education & Visa Pathways
              </h2>
            </div>
          </div>

          {/* Bottom Destination HUD Card + Destination Selector Tabs */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4">
            {/* Left: Destination Pills */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Select Destination Country:
              </span>
              <div className="flex flex-wrap gap-2">
                {DESTINATIONS.map((d, index) => {
                  const isActive = index === activeDestIndex;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveDestIndex(index)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 border backdrop-blur-md ${
                        isActive
                          ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/40 scale-105"
                          : "bg-white/10 text-slate-300 border-white/15 hover:bg-white/20"
                      }`}
                    >
                      <span className="text-base">{d.flag}</span>
                      <span>{d.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">({d.code})</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Headline */}
              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Official Admissions & Airtight Visa Filing
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
                  MOEST Approval No. 1459 verified documentation, direct university tie-ups, and embassy interview coaching with 98.4% success.
                </p>
              </div>
            </div>

            {/* Right: Active Destination Details Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="text-3xl">{activeDest.flag}</span>
                  <div>
                    <h4 className="text-lg font-black text-white">{activeDest.name}</h4>
                    <div className="text-xs text-slate-300 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-red" />
                      <span>{activeDest.city}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-300 uppercase block">Visa Clearance</span>
                  <span className="text-base font-black text-emerald-400 font-mono">
                    {activeDest.successRate}
                  </span>
                </div>
              </div>

              {/* Perks list */}
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeDest.perks.map((perk, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-1.5 bg-brand-navy hover:bg-brand-navy-900 border border-white/20 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition"
                >
                  <span>Book Counseling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/study-abroad?country=${activeDest.id.toUpperCase()}`}
                  className="inline-flex items-center justify-center space-x-1.5 bg-brand-red hover:bg-brand-red-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-md transition"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
