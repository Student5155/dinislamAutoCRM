"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

/**
 * Абстрактная 3D-композиция первого экрана (three.js).
 * Кольцо в духе фирменного знака, узлы бизнес-систем, связи со световыми импульсами,
 * «пиксели» логотипа и цифровая пыль. Загружается лениво; рендер останавливается вне экрана.
 */
export function HeroScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const T = await import("three");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const LIME = new T.Color("#A6FF24");
      const MINT = new T.Color("#69D9B4");

      const renderer = new T.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 10.5);

      const root = new T.Group();
      scene.add(root);

      // Мягкое свечение в центре
      const glowTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const g = c.getContext("2d")!;
        const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
        grd.addColorStop(0, "rgba(166,255,36,0.55)");
        grd.addColorStop(0.35, "rgba(105,217,180,0.18)");
        grd.addColorStop(1, "rgba(6,18,27,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 128, 128);
        return new T.CanvasTexture(c);
      })();
      const glow = new T.Sprite(new T.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
      glow.scale.set(7.5, 7.5, 1);
      root.add(glow);

      // Фирменные кольца
      const ring = new T.Mesh(new T.TorusGeometry(2.55, 0.02, 12, 220), new T.MeshBasicMaterial({ color: LIME }));
      root.add(ring);
      const ring2 = new T.Mesh(
        new T.TorusGeometry(3.35, 0.008, 8, 220),
        new T.MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0.45 }),
      );
      ring2.rotation.set(1.15, 0.25, 0);
      root.add(ring2);
      const ring3 = new T.Mesh(
        new T.TorusGeometry(3.9, 0.006, 8, 220),
        new T.MeshBasicMaterial({ color: LIME, transparent: true, opacity: 0.22 }),
      );
      ring3.rotation.set(-0.9, -0.5, 0.3);
      root.add(ring3);

      // Узлы бизнес-систем
      const nodeCount = 7;
      const nodes: THREE.Vector3[] = [];
      const nodeGroup = new T.Group();
      root.add(nodeGroup);
      const nodeGeo = new T.SphereGeometry(0.075, 16, 16);
      const haloGeo = new T.RingGeometry(0.14, 0.17, 32);
      for (let i = 0; i < nodeCount; i++) {
        const a = (i / nodeCount) * Math.PI * 2 + 0.4;
        const r = 3.35 + (i % 2 ? 0.35 : -0.15);
        const p = new T.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.78, Math.sin(a * 2) * 1.1);
        nodes.push(p);
        const m = new T.Mesh(nodeGeo, new T.MeshBasicMaterial({ color: i % 3 === 0 ? LIME : 0xffffff }));
        m.position.copy(p);
        nodeGroup.add(m);
        const h = new T.Mesh(haloGeo, new T.MeshBasicMaterial({ color: LIME, transparent: true, opacity: 0.5, side: T.DoubleSide }));
        h.position.copy(p);
        nodeGroup.add(h);
      }

      // Связи: соседние узлы + центр
      const segments: [THREE.Vector3, THREE.Vector3][] = [];
      const center = new T.Vector3(0, 0, 0);
      for (let i = 0; i < nodeCount; i++) {
        segments.push([nodes[i], nodes[(i + 1) % nodeCount]]);
        if (i % 2 === 0) segments.push([nodes[i], center]);
      }
      segments.push([nodes[1], nodes[4]]);
      const linePos: number[] = [];
      segments.forEach(([a, b]) => linePos.push(a.x, a.y, a.z, b.x, b.y, b.z));
      const lineGeo = new T.BufferGeometry();
      lineGeo.setAttribute("position", new T.Float32BufferAttribute(linePos, 3));
      const lines = new T.LineSegments(lineGeo, new T.LineBasicMaterial({ color: MINT, transparent: true, opacity: 0.22 }));
      root.add(lines);

      // Световые импульсы по связям
      const pulseMat = new T.SpriteMaterial({ map: glowTex, color: LIME, transparent: true, depthWrite: false, blending: T.AdditiveBlending });
      const pulses = segments.map((seg, i) => {
        const s = new T.Sprite(pulseMat);
        s.scale.set(0.42, 0.42, 1);
        root.add(s);
        return { s, seg, t: (i * 0.37) % 1, speed: 0.12 + (i % 4) * 0.04 };
      });

      // «Пиксели» фирменного знака
      const cubeGeo = new T.BoxGeometry(1, 1, 1);
      const cubes = Array.from({ length: mobile ? 6 : 10 }, (_, i) => {
        const m = new T.Mesh(
          cubeGeo,
          new T.MeshBasicMaterial({ color: i % 2 ? LIME : new T.Color("#5aa832"), transparent: true, opacity: 0.85 }),
        );
        const s = 0.12 + Math.random() * 0.18;
        m.scale.setScalar(s);
        const a = Math.random() * Math.PI * 2;
        const r = 1.6 + Math.random() * 3.2;
        m.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.7, -1.5 + Math.random() * 3);
        m.rotation.set(Math.random(), Math.random(), Math.random());
        root.add(m);
        return { m, base: m.position.clone(), phase: Math.random() * 10 };
      });

      // Цифровая пыль
      const count = mobile ? 160 : 420;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 2 + Math.random() * 6;
        const a = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const dustGeo = new T.BufferGeometry();
      dustGeo.setAttribute("position", new T.BufferAttribute(pos, 3));
      const dust = new T.Points(dustGeo, new T.PointsMaterial({ color: 0xcfe9dc, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false }));
      scene.add(dust);

      // Размеры
      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / h;
        camera.position.z = w / h < 0.9 ? 12.5 : 10.5;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      // Параллакс от указателя (малая амплитуда)
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
        target.y = (e.clientY / window.innerHeight - 0.5) * 0.25;
      };
      if (!mobile) window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(host);

      const clock = new T.Clock();
      let raf = 0;
      const tmp = new T.Vector3();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        root.rotation.y += (target.x + Math.sin(t * 0.15) * 0.12 - root.rotation.y) * 0.04;
        root.rotation.x += (target.y + 0.12 - root.rotation.x) * 0.04;
        ring.rotation.z = t * 0.05;
        ring2.rotation.z = -t * 0.07;
        ring3.rotation.z = t * 0.04;
        dust.rotation.y = t * 0.012;

        pulses.forEach((p) => {
          p.t = (p.t + dt * p.speed) % 1;
          tmp.lerpVectors(p.seg[0], p.seg[1], p.t);
          p.s.position.copy(tmp);
          const f = Math.sin(p.t * Math.PI);
          p.s.scale.setScalar(0.18 + f * 0.32);
        });
        cubes.forEach((c) => {
          c.m.position.y = c.base.y + Math.sin(t * 0.6 + c.phase) * 0.18;
          c.m.rotation.x += dt * 0.15;
          c.m.rotation.y += dt * 0.2;
        });
        nodeGroup.children.forEach((n, i) => {
          if (i % 2 === 1) n.lookAt(camera.position);
        });
        renderer.render(scene, camera);
      };

      if (reduce) {
        root.rotation.set(0.12, 0.1, 0);
        pulses.forEach((p) => p.s.position.lerpVectors(p.seg[0], p.seg[1], 0.5));
        nodeGroup.children.forEach((n, i) => i % 2 === 1 && n.lookAt(camera.position));
        renderer.render(scene, camera);
      } else {
        tick();
      }
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        scene.traverse((o) => {
          const obj = o as THREE.Mesh;
          obj.geometry?.dispose?.();
          const mat = obj.material as THREE.Material | THREE.Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose?.();
        });
        glowTex.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    type IdleWin = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const w = window as IdleWin;
    const handle = w.requestIdleCallback ? w.requestIdleCallback(() => start(), { timeout: 900 }) : window.setTimeout(() => start(), 250);

    return () => {
      disposed = true;
      if (!w.requestIdleCallback) window.clearTimeout(handle);
      cleanup();
    };
  }, []);

  return (
    <div className={className}>
      {/* Лёгкая CSS-заглушка до загрузки 3D */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <div className="aspect-square w-[62%] rounded-full border-2 border-lime/70 shadow-[0_0_60px_-10px_rgba(166,255,36,0.6)]" />
      </div>
      <div ref={hostRef} className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
