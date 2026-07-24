import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D globe made of glowing points, wrapped in a drifting
 * particle field. Drag to rotate, mouse-parallax when idle. Uses three.js
 * with a WebGL renderer. Falls back gracefully if WebGL is unavailable and
 * respects prefers-reduced-motion (auto-rotation disabled).
 */
export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

    // ----- Globe of points (fibonacci sphere) -----
    const GLOBE_POINTS = 1600;
    const globeGeo = new THREE.BufferGeometry();
    const gPos = new Float32Array(GLOBE_POINTS * 3);
    const radius = 2;
    for (let i = 0; i < GLOBE_POINTS; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / GLOBE_POINTS);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      gPos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      gPos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      gPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    globeGeo.setAttribute("position", new THREE.BufferAttribute(gPos, 3));
    const globeMat = new THREE.PointsMaterial({
      color: 0xa5b4fc,
      size: 0.035,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const globe = new THREE.Points(globeGeo, globeMat);
    scene.add(globe);

    // Wireframe sphere for a subtle grid feel
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(radius * 0.995, 3)),
      new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.12 }),
    );
    scene.add(wire);

    // Inner glow
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.92, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.08 }),
    );
    scene.add(glow);

    // ----- Drifting particle field -----
    const FIELD = 500;
    const fieldGeo = new THREE.BufferGeometry();
    const fPos = new Float32Array(FIELD * 3);
    for (let i = 0; i < FIELD; i++) {
      fPos[i * 3] = (Math.random() - 0.5) * 14;
      fPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      fPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fPos, 3));
    const field = new THREE.Points(
      fieldGeo,
      new THREE.PointsMaterial({
        color: 0xc7d2fe,
        size: 0.02,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    );
    scene.add(field);

    // ----- Interaction -----
    const rot = { x: 0.2, y: 0, vx: 0, vy: 0.003 };
    const pointer = { x: 0, y: 0 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function onDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    }
    function onUp(e: PointerEvent) {
      dragging = false;
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    function onMove(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        rot.vy = dx * 0.004;
        rot.vx = dy * 0.004;
        rot.y += rot.vy;
        rot.x += rot.vx;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    }
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointermove", onMove);

    // ----- Resize -----
    function resize() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ----- Animation loop -----
    let raf = 0;
    function frame() {
      if (!dragging) {
        // damp velocity, add auto-spin
        rot.vy = rot.vy * 0.94 + (reduced ? 0 : 0.0025) * 0.06;
        rot.vx *= 0.9;
        rot.y += rot.vy;
        rot.x += rot.vx;
        // gentle parallax toward pointer
        rot.x += (pointer.y * 0.25 - rot.x) * 0.01;
      }
      globe.rotation.y = rot.y;
      globe.rotation.x = rot.x;
      wire.rotation.copy(globe.rotation);
      glow.rotation.copy(globe.rotation);
      field.rotation.y += reduced ? 0 : 0.0004;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointermove", onMove);
      globeGeo.dispose();
      globeMat.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      fieldGeo.dispose();
      (field.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
    />
  );
}