const ORBS = [
  { size: 280, x: "10%", y: "15%", duration: "24s", delay: "0s" },
  { size: 320, x: "80%", y: "70%", duration: "30s", delay: "-6s" },
  { size: 220, x: "50%", y: "55%", duration: "28s", delay: "-12s" },
];

export function BackgroundAnimation() {
  return (
    <div
      aria-hidden
      className="bg-orbs pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {ORBS.map((orb, i) => (
        <span
          key={i}
          className="bg-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            animationDuration: orb.duration,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
