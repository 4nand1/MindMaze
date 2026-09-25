"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Six-piece burr (зургаан модны оньс): three pairs of 2×2×8 sticks, each pair offset along the
// next axis. Every stick slides in along its own axis — the way real burr pieces move.
const STICKS = [
  { axis: 0, pos: [0, 0, 1] },
  { axis: 0, pos: [0, 0, -1] },
  { axis: 1, pos: [1, 0, 0] },
  { axis: 1, pos: [-1, 0, 0] },
  { axis: 2, pos: [0, 1, 0] },
  { axis: 2, pos: [0, -1, 0] },
] as const;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Warm wood grain drawn on a canvas — no image file needed.
function woodTexture(THREE: typeof import("three")) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const g = c.getContext("2d")!;
  const base = g.createLinearGradient(0, 0, 0, 128);
  base.addColorStop(0, "#d9a86c");
  base.addColorStop(1, "#b77f45");
  g.fillStyle = base;
  g.fillRect(0, 0, 512, 128);
  for (let i = 0; i < 70; i++) {
    const y = Math.random() * 128;
    const f = 18 + Math.random() * 60;
    g.strokeStyle = `rgba(88,48,18,${0.04 + Math.random() * 0.14})`;
    g.lineWidth = 0.6 + Math.random() * 1.8;
    g.beginPath();
    for (let x = 0; x <= 512; x += 8) g.lineTo(x, y + Math.sin(x / f + i) * 3);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// Scroll-driven 3D assembly. three.js loads only on the client, only for this section.
export function Burr({ fallback }: { fallback: ReactNode }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.closest("section");
    if (!canvas || !section) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stopped = false;
    let raf = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoundedBoxGeometry } = await import("three/addons/geometries/RoundedBoxGeometry.js");
      if (stopped) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 1, 100);
      camera.position.set(0, 0, 30);
      scene.add(new THREE.HemisphereLight(0xfff6ea, 0x9c7a55, 1.7));
      const key = new THREE.DirectionalLight(0xffe7c4, 2.8);
      key.position.set(8, 12, 10);
      const rim = new THREE.DirectionalLight(0x7fd0ea, 1.4);
      rim.position.set(-10, -6, -8);
      scene.add(key, rim);

      const wood = new THREE.MeshStandardMaterial({ map: woodTexture(THREE), roughness: 0.6 });
      const shapes = [new RoundedBoxGeometry(8, 2, 2, 3, 0.16), new RoundedBoxGeometry(2, 8, 2, 3, 0.16), new RoundedBoxGeometry(2, 2, 8, 3, 0.16)];
      const group = new THREE.Group();
      scene.add(group);
      const sticks = STICKS.map((s, i) => {
        const mesh = new THREE.Mesh(shapes[s.axis], wood);
        const home = new THREE.Vector3(...s.pos);
        const from = home.clone().setComponent(s.axis, i % 2 ? -18 : 18);
        group.add(mesh);
        return { mesh, home, from };
      });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = canvas;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      addEventListener("resize", resize);

      const t0 = performance.now();
      const frame = () => {
        const r = section.getBoundingClientRect();
        // 0 → 1 over the pinned stretch of the section; reduced motion shows it assembled.
        const p = reduce ? 1 : clamp(-r.top / Math.max(1, r.height - innerHeight));
        sticks.forEach(({ mesh, home, from }, i) => {
          const t = clamp((p * 1.4 - i * 0.08) / 0.6);
          mesh.position.lerpVectors(from, home, 1 - (1 - t) ** 3);
        });
        const time = reduce ? 0 : (performance.now() - t0) / 1000;
        group.rotation.set(0.55 - p * 0.2, 0.7 + p * Math.PI * 1.2 + time * 0.12, 0.15);
        renderer.render(scene, camera);
        if (!reduce) raf = requestAnimationFrame(frame);
      };

      // Only render while the section is on screen.
      const io = new IntersectionObserver(([e]) => {
        cancelAnimationFrame(raf);
        if (e.isIntersecting) raf = requestAnimationFrame(frame);
      });
      io.observe(section);

      cleanup = () => {
        io.disconnect();
        removeEventListener("resize", resize);
        shapes.forEach((g) => g.dispose());
        wood.map?.dispose();
        wood.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return failed ? fallback : <canvas ref={ref} aria-hidden className="burr-canvas" />;
}
