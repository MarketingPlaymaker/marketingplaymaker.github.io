"use client";

/*
 * WebGL backdrop for the Horizon hero (adapted from the 21st.dev "Horizon"
 * component). The scene is a silhouette journey: a football stadium at dusk,
 * then, as the visitor scrolls, an indoor court seen from the stands.
 *
 * Kept as an isolated leaf: it reads scroll progress from a Motion value inside
 * its own rAF loop and never touches React state, so scrolling causes zero
 * React re-renders.
 */

import { useEffect, useRef } from "react";
import { animate, type MotionValue } from "motion/react";
import * as THREE from "three";

type HorizonSceneProps = {
  /** 0 → 1 progress through the hero, from Motion's useScroll. */
  progress: MotionValue<number>;
  /** Step between still views with a fade instead of flying the camera. */
  reducedMotion: boolean;
  /** Fired after the first frame is drawn. */
  onReady?: () => void;
  className?: string;
};

const BRAND = new THREE.Color("#c8f135");
const INK = new THREE.Color("#0a0a0a");
// Near-black with a hint of green, so silhouettes read against the lit sky.
const SILHOUETTE = "#070a06";
const LAMP = "#efffc8";

const STADIUM_Z = -370; // pitch centre
const COURT_Z = -1300; // court centre

// Camera and look-at keyframes: outside the stadium → on the pitch → above the court.
const CAMERA_PATH = [
  new THREE.Vector3(0, 30, 300),
  new THREE.Vector3(0, 22, -120),
  new THREE.Vector3(-120, 110, -1150),
];
const LOOK_PATH = [
  new THREE.Vector3(0, 25, -500),
  new THREE.Vector3(0, 30, -700),
  new THREE.Vector3(-45, 0, -1300), // aimed left so the court sits right of the copy on desktop
];

function along(path: THREE.Vector3[], p: number, out: THREE.Vector3) {
  const t = THREE.MathUtils.clamp(p, 0, 1) * (path.length - 1);
  const i = Math.min(Math.floor(t), path.length - 2);
  return out.lerpVectors(path[i], path[i + 1], t - i);
}

/* ---------- material + geometry helpers ---------- */

/** Mark a material as fadeable: its opacity is scaled by the set it belongs to. */
function fadeable<T extends THREE.Material>(material: T, base = 1): T {
  material.transparent = true;
  material.opacity = base;
  material.userData.base = base;
  return material;
}

function setOpacity(group: THREE.Object3D, factor: number) {
  group.visible = factor > 0.001;
  group.traverse((obj) => {
    const material = (obj as THREE.Mesh).material as THREE.Material | undefined;
    if (material && material.userData.base !== undefined) material.opacity = material.userData.base * factor;
  });
}

const silhouette = () => fadeable(new THREE.MeshBasicMaterial({ color: SILHOUETTE }));

function box(w: number, h: number, d: number, x: number, y: number, z: number, material = silhouette()) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  return mesh;
}

function lines(points: number[], color: THREE.ColorRepresentation, opacity: number) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  return new THREE.LineSegments(geometry, fadeable(new THREE.LineBasicMaterial({ color }), opacity));
}

function addLine(out: number[], x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) {
  out.push(x0, y0, z0, x1, y1, z1);
}

function addRect(out: number[], x0: number, z0: number, x1: number, z1: number, y: number) {
  addLine(out, x0, y, z0, x1, y, z0);
  addLine(out, x1, y, z0, x1, y, z1);
  addLine(out, x1, y, z1, x0, y, z1);
  addLine(out, x0, y, z1, x0, y, z0);
}

function addArc(
  out: number[],
  cx: number,
  cz: number,
  r: number,
  y: number,
  a0 = 0,
  a1 = Math.PI * 2,
  segments = 64,
  dashed = false,
) {
  for (let i = 0; i < segments; i++) {
    if (dashed && i % 2) continue;
    const a = a0 + ((a1 - a0) * i) / segments;
    const b = a0 + ((a1 - a0) * (i + 1)) / segments;
    addLine(out, cx + Math.cos(a) * r, y, cz + Math.sin(a) * r, cx + Math.cos(b) * r, y, cz + Math.sin(b) * r);
  }
}

/** Soft round glow, shared by every lamp sprite. */
function createGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function glow(texture: THREE.Texture, scale: number, x: number, y: number, z: number, opacity = 0.9) {
  const sprite = new THREE.Sprite(
    fadeable(
      new THREE.SpriteMaterial({
        map: texture,
        color: LAMP,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      opacity,
    ),
  );
  sprite.scale.setScalar(scale);
  sprite.position.set(x, y, z);
  return sprite;
}

/* ---------- sky ---------- */

function createStarField(count: number, depth: number, pixelRatio: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const color = new THREE.Color();

  for (let j = 0; j < count; j++) {
    // A wide shell around the whole journey, stadium to court.
    const radius = 300 + Math.random() * 2100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[j * 3 + 1] = Math.abs(radius * Math.sin(phi) * Math.sin(theta)) + 40; // above the horizon
    positions[j * 3 + 2] = radius * Math.cos(phi) - 700;

    // Mostly white stars, a few tinted with the brand lime.
    if (Math.random() < 0.85) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
    else color.copy(BRAND).multiplyScalar(0.9);
    colors[j * 3] = color.r;
    colors[j * 3 + 1] = color.g;
    colors[j * 3 + 2] = color.b;

    sizes[j] = Math.random() * 2 + 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      depth: { value: depth },
      pixelRatio: { value: pixelRatio },
    },
    vertexShader: /* glsl */ `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      uniform float depth;
      uniform float pixelRatio;

      void main() {
        vColor = color;
        vec3 pos = position;
        float angle = time * 0.02 * (1.0 - depth * 0.3);
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        pos.xz = rot * (pos.xz - vec2(0.0, -700.0)) + vec2(0.0, -700.0);
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        // Capped: near the camera, unclamped additive points balloon into a full-screen haze.
        gl_PointSize = min(size * pixelRatio * (300.0 / -mvPosition.z), 6.0 * pixelRatio);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, dist));
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function createNebula() {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#2d4a0a") },
      color2: { value: BRAND.clone() },
      opacity: { value: 0.14 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying float vElevation;
      uniform float time;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
        pos.z += elevation;
        vElevation = elevation;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float opacity;
      uniform float time;
      varying vec2 vUv;
      varying float vElevation;
      void main() {
        float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
        vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
        float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
        alpha *= 1.0 + vElevation * 0.01;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const nebula = new THREE.Mesh(new THREE.PlaneGeometry(14000, 7000, 100, 100), material);
  nebula.position.set(0, 600, -2600);
  return nebula;
}

/* ---------- stadium ---------- */

function createStadium(glowTexture: THREE.Texture) {
  const group = new THREE.Group();
  const halfLength = 320;
  const halfWidth = 210;
  const y = 0.4;


  // Pitch markings in brand lime.
  const marks: number[] = [];
  addRect(marks, -halfWidth, STADIUM_Z - halfLength, halfWidth, STADIUM_Z + halfLength, y);
  addLine(marks, -halfWidth, y, STADIUM_Z, halfWidth, y, STADIUM_Z);
  addArc(marks, 0, STADIUM_Z, 55, y);
  const arcOffset = Math.asin(30 / 55);
  for (const side of [-1, 1]) {
    const goalZ = STADIUM_Z + side * halfLength;
    addRect(marks, -120, goalZ, 120, goalZ - side * 100, y); // penalty area
    addRect(marks, -55, goalZ, 55, goalZ - side * 35, y); // goal area
    // Penalty arc, the part outside the box.
    const [a0, a1] = side === 1 ? [Math.PI + arcOffset, Math.PI * 2 - arcOffset] : [arcOffset, Math.PI - arcOffset];
    addArc(marks, 0, goalZ - side * 70, 55, y, a0, a1, 24);
  }
  // Advertising boards along both touchlines, with a lit top edge.
  for (const side of [-1, 1]) {
    const x = side * (halfWidth + 18);
    group.add(box(2, 7, halfLength * 2, x, 3.5, STADIUM_Z));
    addLine(marks, x, 7.5, STADIUM_Z - halfLength, x, 7.5, STADIUM_Z + halfLength);
  }
  group.add(lines(marks, BRAND, 0.38));

  // Main grandstand (right): tall stepped tiers up to a back wall.
  const main: [number, number][] = [
    [225, 0],
    [240, 0],
  ];
  let x = 240;
  let tier = 6;
  for (let i = 0; i < 12; i++) {
    main.push([x, tier], [x + 15, tier]);
    x += 15;
    tier += 11;
  }
  main.push([x, tier + 30], [x + 12, tier + 30], [x + 12, 0]);
  group.add(extrudeStand(main, 640));

  // Covered stand (left): low tiers under a cantilevered roof, sky visible between.
  const covered: [number, number][] = [
    [-225, 0],
    [-238, 0],
  ];
  x = -238;
  tier = 6;
  for (let i = 0; i < 8; i++) {
    covered.push([x, tier], [x - 13, tier]);
    x -= 13;
    tier += 6;
  }
  covered.push([x - 10, tier], [x - 10, 88], [-218, 96], [-218, 101], [x - 18, 92], [x - 18, 0]);
  group.add(extrudeStand(covered, 640));
  for (let z = STADIUM_Z - 300; z <= STADIUM_Z + 300; z += 100) group.add(box(3, 96, 3, -222, 48, z));

  // Low stand behind the far goal.
  for (let i = 0; i < 6; i++) {
    const h = 10 + i * 9;
    group.add(box(470, h, 16, 0, h / 2, STADIUM_Z - halfLength - 22 - i * 16));
  }

  // City blocks beyond the far stand.
  const blocks: [number, number, number][] = [
    [-380, 150, 120],
    [-210, 110, 80],
    [-60, 170, 135],
    [130, 120, 95],
    [290, 160, 70],
  ];
  for (const [bx, w, h] of blocks) group.add(box(w, h, 60, bx, h / 2, -900 - Math.random() * 80));

  // Floodlight towers: dark poles, bright heads that bloom.
  for (const [tx, tz] of [
    [-450, -60],
    [450, -60],
    [-450, -680],
    [450, -680],
  ]) {
    group.add(box(5, 290, 5, tx, 145, tz));
    const head = box(46, 30, 4, tx, 300, tz, fadeable(new THREE.MeshBasicMaterial({ color: LAMP })));
    head.lookAt(0, 300, STADIUM_Z);
    group.add(head);
    group.add(glow(glowTexture, 170,tx * 0.97, 300, tz + (STADIUM_Z - tz) * 0.03));
  }

  return group;
}

/** A stand cross-section (x, y) extruded along the touchline. */
function extrudeStand(profile: [number, number][], length: number) {
  const shape = new THREE.Shape(profile.map(([px, py]) => new THREE.Vector2(px, py)));
  const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false }), silhouette());
  mesh.position.z = STADIUM_Z - length / 2;
  return mesh;
}

/* ---------- indoor court ---------- */

function createCourt(glowTexture: THREE.Texture) {
  const group = new THREE.Group();
  const y = 0.5;
  const halfLength = 150;
  const halfWidth = 80;

  // Inner court, filled with a faint brand tint (the orange court in the reference photo).
  const inner = new THREE.Mesh(new THREE.PlaneGeometry(190, 96), fadeable(new THREE.MeshBasicMaterial({ color: BRAND }), 0.1));
  inner.rotation.x = -Math.PI / 2;
  inner.position.set(0, 0.2, COURT_Z);
  group.add(inner);

  // Multi-sport court markings.
  const marks: number[] = [];
  addRect(marks, -halfLength, COURT_Z - halfWidth, halfLength, COURT_Z + halfWidth, y);
  addRect(marks, -95, COURT_Z - 48, 95, COURT_Z + 48, y);
  addLine(marks, 0, y, COURT_Z - halfWidth, 0, y, COURT_Z + halfWidth);
  addArc(marks, 0, COURT_Z, 32, y);
  addArc(marks, 0, COURT_Z, 18, y);
  for (const side of [-1, 1]) {
    // Arcs open toward the centre of the court.
    const [a0, a1] = side === 1 ? [Math.PI / 2, Math.PI * 1.5] : [-Math.PI / 2, Math.PI / 2];
    addArc(marks, side * halfLength, COURT_Z, 60, y, a0, a1, 40);
    addArc(marks, side * halfLength, COURT_Z, 90, y, a0, a1, 40, true);
    addArc(marks, side * (halfLength - 15), COURT_Z, 67, y, a0, a1, 40);
  }
  group.add(lines(marks, BRAND, 0.6));

  // Perimeter railing.
  const rail: number[] = [];
  const rx = 185;
  const rz = 108;
  addRect(rail, -rx, COURT_Z - rz, rx, COURT_Z + rz, 12);
  for (let px = -rx; px <= rx; px += 18) {
    addLine(rail, px, 0, COURT_Z - rz, px, 12, COURT_Z - rz);
    addLine(rail, px, 0, COURT_Z + rz, px, 12, COURT_Z + rz);
  }
  for (let pz = -rz; pz <= rz; pz += 18) {
    addLine(rail, -rx, 0, COURT_Z + pz, -rx, 12, COURT_Z + pz);
    addLine(rail, rx, 0, COURT_Z + pz, rx, 12, COURT_Z + pz);
  }
  group.add(lines(rail, "#c9d3b6", 0.28));

  // Roof trusses, dark against the sky glow.
  const span = 280;
  const topAt = (tx: number) => 150 + 40 * (1 - Math.abs(tx) / span);
  const truss: number[] = [];
  for (let k = 0; k <= 9; k++) {
    const z = COURT_Z - 180 + k * 40;
    addLine(truss, -span, 150, z, span, 150, z);
    addLine(truss, -span, 150, z, 0, 190, z);
    addLine(truss, 0, 190, z, span, 150, z);
    for (let tx = -span; tx < span; tx += 35) {
      addLine(truss, tx, 150, z, tx, topAt(tx), z);
      addLine(truss, tx, 150, z, tx + 35, topAt(tx + 35), z);
    }
  }
  for (const tx of [-span, -140, 0, 140, span]) addLine(truss, tx, topAt(tx), COURT_Z - 180, tx, topAt(tx), COURT_Z + 180);
  group.add(lines(truss, "#0b1009", 1));

  // Hanging lamps.
  for (const lx of [-140, 0, 140]) {
    for (const lz of [-60, 60]) group.add(glow(glowTexture, 30, lx, 140, COURT_Z + lz, 0.85));
  }

  // Gym walls (far end and both sides; the near side stays open for the camera),
  // topped by a faint ventilation strip like the block vents in the reference photo.
  const wallH = 150;
  group.add(box(2 * span, wallH, 4, 0, wallH / 2, COURT_Z - 180));
  group.add(box(4, wallH, 360, -span, wallH / 2, COURT_Z));
  group.add(box(4, wallH, 360, span, wallH / 2, COURT_Z));
  const vents: number[] = [];
  for (const vy of [128, 134]) {
    addLine(vents, -span + 3, vy, COURT_Z - 177, span - 3, vy, COURT_Z - 177);
    addLine(vents, -span + 3, vy, COURT_Z - 177, -span + 3, vy, COURT_Z + 180);
    addLine(vents, span - 3, vy, COURT_Z - 177, span - 3, vy, COURT_Z + 180);
  }
  group.add(lines(vents, BRAND, 0.22));

  return group;
}

/* ---------- scheduling ---------- */

/** Resolve when the main thread is idle, so setup never blocks hydration or input. */
function idle() {
  return new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 1000 });
    else setTimeout(resolve, 16);
  });
}

const WAKE_EVENTS = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;

/**
 * Resolve on the visitor's first interaction, or `fallbackMs` after the page
 * has loaded. WebGL context creation and shader compilation are expensive, so
 * they wait until the page is interactive instead of competing with hydration.
 */
function whenEngaged(fallbackMs: number) {
  return new Promise<void>((resolve) => {
    let timer = 0;
    const done = () => {
      window.clearTimeout(timer);
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, done));
      window.removeEventListener("load", arm);
      resolve();
    };
    const arm = () => {
      timer = window.setTimeout(done, fallbackMs);
    };
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, done, { once: true, passive: true }));
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
  });
}

type Composer = { render: () => void; setSize: (w: number, h: number) => void; dispose: () => void };

export function HorizonScene({ progress, reducedMotion, onReady, className }: HorizonSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let composer: Composer | null = null;
    let glowTexture: THREE.Texture | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let unsubscribe: (() => void) | null = null;
    const scene = new THREE.Scene();

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Setup runs in small idle-time chunks instead of one long task.
    const setup = async () => {
      await whenEngaged(3500);
      await idle();
      if (disposed) return;

      // Phones and low-core devices get fewer stars, no bloom, 1x pixels.
      const lowPower =
        window.matchMedia("(max-width: 767px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
      const pixelRatio = Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5);

      const gl = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: "high-performance" });
      renderer = gl;
      gl.setClearColor(INK, 1);
      gl.setPixelRatio(pixelRatio);
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = 0.5;

      scene.fog = new THREE.FogExp2(INK, 0.00025);
      const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 5000);

      const starsPerLayer = lowPower ? 1000 : 4000;
      const stars: THREE.Points[] = [];
      for (const depth of [0, 1, 2]) {
        await idle();
        if (disposed) return;
        const layer = createStarField(starsPerLayer, depth, pixelRatio);
        stars.push(layer);
        scene.add(layer);
      }

      await idle();
      if (disposed) return;
      glowTexture = createGlowTexture();
      const nebula = createNebula();
      const stadium = createStadium(glowTexture);
      const court = createCourt(glowTexture);
      // One continuous dark ground under the whole journey, so there is never a visible edge.
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.MeshBasicMaterial({ color: "#090d08" }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -0.1, -700);
      scene.add(nebula, ground, stadium, court);

      const timeUniforms = stars.map((obj) => (obj.material as THREE.ShaderMaterial).uniforms.time);
      const nebulaUniforms = (nebula.material as THREE.ShaderMaterial).uniforms;
      const nebulaBaseOpacity = nebulaUniforms.opacity.value as number;

      const render = () => (composer ? composer.render() : gl.render(scene, camera));

      const smoothPos = along(CAMERA_PATH, progress.get(), new THREE.Vector3());
      const smoothLook = along(LOOK_PATH, progress.get(), new THREE.Vector3());
      const target = new THREE.Vector3();

      const applyScroll = (p: number) => {
        // Stadium dissolves into the court as the camera crosses the pitch.
        setOpacity(stadium, 1 - THREE.MathUtils.smoothstep(p, 0.45, 0.62));
        setOpacity(court, THREE.MathUtils.smoothstep(p, 0.45, 0.7));
        nebulaUniforms.opacity.value = nebulaBaseOpacity * (1 - 0.5 * THREE.MathUtils.smoothstep(p, 0.6, 1));
      };

      const placeCamera = (t: number) => {
        camera.position.set(
          smoothPos.x + Math.sin(t * 0.1) * 2,
          smoothPos.y + Math.cos(t * 0.15),
          smoothPos.z,
        );
        camera.lookAt(smoothLook);
      };

      const resize = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        gl.setSize(width, height, false);
        composer?.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (reducedMotion) render();
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();

      // Compile shaders up front (in parallel where the GPU allows) rather than on the first frame.
      await idle();
      if (disposed) return;
      await gl.compileAsync(scene, camera);
      if (disposed) return;

      if (reducedMotion) {
        // Reduced motion: no flying camera. The scene steps between three still
        // views (outside the stadium, on the pitch, the court) in sync with the
        // text panels, joined by a soft fade.
        const stationFor = (p: number) => (p < 0.28 ? 0 : p < 0.62 ? 1 : 2);
        const showStation = (s: number) => {
          smoothPos.copy(CAMERA_PATH[s]);
          smoothLook.copy(LOOK_PATH[s]);
          setOpacity(stadium, s < 2 ? 1 : 0);
          setOpacity(court, s === 2 ? 1 : 0);
          placeCamera(0);
          render();
        };

        let shown = stationFor(progress.get());
        showStation(shown);
        onReadyRef.current?.();

        let busy = false;
        const sync = async () => {
          if (busy || disposed) return;
          const next = stationFor(progress.get());
          if (next === shown) return;
          busy = true;
          await animate(canvas, { opacity: 0 }, { duration: 0.3, ease: "easeOut" });
          if (disposed) return;
          shown = next;
          showStation(shown);
          await animate(canvas, { opacity: 1 }, { duration: 0.5, ease: "easeOut" });
          busy = false;
          sync(); // catch up if the visitor kept scrolling during the fade
        };
        unsubscribe = progress.on("change", sync);
        return;
      }

      // Animation loop, paused while the hero is off screen.
      const clock = new THREE.Clock();
      let readyFired = false;

      const frame = () => {
        raf = requestAnimationFrame(frame);
        const t = clock.getElapsedTime();
        timeUniforms.forEach((u) => (u.value = t));
        nebulaUniforms.time.value = t * 0.5;

        const p = progress.get();
        smoothPos.lerp(along(CAMERA_PATH, p, target), 0.06);
        smoothLook.lerp(along(LOOK_PATH, p, target), 0.06);
        placeCamera(t);
        applyScroll(p);
        render();

        if (!readyFired) {
          readyFired = true;
          onReadyRef.current?.();
        }
      };

      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) stop();
        else if (!raf && !disposed) raf = requestAnimationFrame(frame);
      });
      intersectionObserver.observe(host);

      // Bloom is loaded only where it is affordable.
      if (!lowPower) {
        const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }] = await Promise.all([
          import("three/examples/jsm/postprocessing/EffectComposer.js"),
          import("three/examples/jsm/postprocessing/RenderPass.js"),
          import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
        ]);
        if (disposed) return;
        const fx = new EffectComposer(gl);
        fx.addPass(new RenderPass(scene, camera));
        fx.addPass(new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), 0.35, 0.4, 0.9));
        composer = fx;
        resize();
      }
    };

    setup();

    return () => {
      disposed = true;
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      unsubscribe?.();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Sprite) {
          obj.material.dispose(); // sprite geometry is shared by three.js
        } else if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      glowTexture?.dispose();
      composer?.dispose();
      renderer?.dispose();
    };
  }, [progress, reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
