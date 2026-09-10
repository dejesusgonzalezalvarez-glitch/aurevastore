import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultConfig = {
  showBar: true,
  text: "SAVE UP TO 40% WHEN YOU BUNDLE",
  buttonText: "SHOP BUNDLES",
  buttonLink: "/shop",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  textColor: "#FFFFFF",
  buttonColor: "#FFFFFF",
  buttonHoverColor: "rgba(255, 255, 255, 0.85)",
};

export function AnnouncementBar({ config = defaultConfig }) {
  const [show, setShow] = useState(config.showBar);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(config.buttonLink);
  };

  if (!show) return null;

  return (
    <div
      style={{
        backgroundColor: config.backgroundColor,
        backgroundImage: config.backgroundImage,
      }}
      className="border-b hairline bg-primary text-foreground"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center justify-between">
        <p className="text-[11px] tracking-wide-sm uppercase">{config.text}</p>
        <div className="flex items-center gap-3">
          {config.buttonLink && (
            <button
              onClick={handleClick}
              className={`text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-2 px-4 hover:bg-foreground/85 transition-colors`}
            >
              {config.buttonText}
            </button>
          )}
          <button
            onClick={() => setShow(false)}
            className="text-[11px] tracking-wide-sm uppercase text-foreground/60 py-2 px-4 hover:bg-secondary/50 transition-colors"
            aria-label="Close announcement"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}