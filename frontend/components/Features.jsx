import { useState, useRef, useEffect } from "react";

export default function Features() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rightFeatureRef = useRef(null);
  const [rightScale, setRightScale] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Right object scaling based on cursor proximity
      if (rightFeatureRef.current) {
        const rect = rightFeatureRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Max distance for scaling effect (dramatic means large range)
        const maxDistance = 400;
        const scale = Math.max(
          0.85,
          Math.min(1.15, 1 + ((maxDistance - distance) / maxDistance) * 0.3),
        );

        setRightScale(scale);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      title: "Real Data",
      description:
        "Predictions grounded in actual user behavior patterns and real ratings.",
      svg: () => (
        <svg viewBox="0 0 200 200" className="w-32 h-32">
          <style>{`
            @keyframes rotatePlus {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes orbitLeft {
              from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
              to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
            }
            .plus-sign {
              animation: rotatePlus 8s linear infinite;
              transform-origin: center;
            }
            .orbit-container {
              animation: orbitLeft 6s linear infinite;
              transform-origin: center;
            }
          `}</style>

          {/* Orbiting circles */}
          <g className="orbit-container">
            <circle
              cx="140"
              cy="100"
              r="8"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </g>

          <g className="orbit-container" style={{ animationDelay: "3s" }}>
            <circle
              cx="60"
              cy="100"
              r="8"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </g>

          {/* Center plus sign */}
          <g className="plus-sign">
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="120"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="80"
              y1="100"
              x2="120"
              y2="100"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </svg>
      ),
    },
    {
      title: "Audience Match",
      description:
        "Discover exactly who would care about your project and why.",
      svg: () => (
        <svg viewBox="0 0 200 200" className="w-32 h-32">
          {/* Three circles in a cluster */}
          <circle
            cx="70"
            cy="60"
            r="15"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <circle
            cx="130"
            cy="60"
            r="15"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="120"
            r="15"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />

          {/* Connecting lines */}
          <line
            x1="75"
            y1="72"
            x2="95"
            y2="105"
            stroke="white"
            strokeWidth="1"
            opacity="0.4"
          />
          <line
            x1="125"
            y1="72"
            x2="105"
            y2="105"
            stroke="white"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      ),
    },
    {
      title: "Build Confidence",
      description:
        "Ship knowing exactly how your work will resonate with your audience.",
      svg: () => (
        <svg
          viewBox="0 0 200 200"
          className="w-32 h-32"
          style={{
            transform: `scale(${rightScale})`,
            transition: "transform 0.2s ease-out",
            transformOrigin: "center",
          }}
        >
          {/* Growth chart bars */}
          <rect
            x="50"
            y="130"
            width="15"
            height="50"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <rect
            x="75"
            y="110"
            width="15"
            height="70"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <rect
            x="100"
            y="80"
            width="15"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <rect
            x="125"
            y="90"
            width="15"
            height="90"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <rect
            x="150"
            y="100"
            width="15"
            height="80"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />

          {/* Base line */}
          <line
            x1="45"
            y1="180"
            x2="170"
            y2="180"
            stroke="white"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
            Built for creators
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to understand if your work will resonate.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              ref={idx === 2 ? rightFeatureRef : null}
              className="flex flex-col items-center text-center"
            >
              {/* SVG object */}
              <div className="h-40 flex items-center justify-center mb-8">
                {feature.svg()}
              </div>

              {/* Text content */}
              <h3 className="text-xl font-medium text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
