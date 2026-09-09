import { useRef, useState, useEffect } from "react";

export function CouponCode({ code, onCopy }) {
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && buttonRef.current) {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setShowTooltip(true);
        
        // Hide tooltip after 2 seconds
        const timer = setTimeout(() => {
          setShowTooltip(false);
        }, 2000);
        
        // Also call onCopy callback if provided
        if (onCopy) onCopy();
      } else {
        // Fallback for older browsers or when clipboard not available
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          setIsCopied(true);
          setShowTooltip(true);
          
          const timer = setTimeout(() => {
            setShowTooltip(false);
          }, 2000);
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
    }
  };

  useEffect(() => {
    // Reset state when code changes or component unmounts
    return () => {
      clearTimeout(showTooltip ? setTimeout(() => setShowTooltip(false), 2000) : null);
    };
  }, [code]);

  return (
    <div className="coupon-code max-w-md mx-auto">
      <div className="border rounded-lg bg-background p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <span className="text-[11px] tracking-wide-sm uppercase text-foreground/60 flex-shrink-0">
            🎁
          </span>
          <div className="flex-1">
            <div 
              ref={buttonRef}
              onClick={handleCopy}
              className="flex items-center gap-2 cursor-pointer select-none"
              title="Copiar código"
            >
              <span className="text-[12px]">{code}</span>
              {isCopied ? (
                <span className="text-[10px] text-foreground/50">
                  ✓
                </span>
              ) : (
                <span className="text-[10px] text-muted-foreground/60">COPIAR</span>
              )}
              {showTooltip && (
                <span className="ml-2 text-[9px] text-foreground/50">
                  Copiado!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isCopied && (
        <p className="mt-3 text-center text-[9px] tracking-wide-sm text-foreground/80">
          Código copiado al portapapeles
        </p>
      )}
    </div>
  );
}