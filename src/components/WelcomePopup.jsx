import { useState, useEffect } from "react";

const KEY = "aureva_welcome_seen";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem(KEY, "1");
  };

  const submit = (e) => {
    e.preventDefault();
    if (email) setUnlocked(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative bg-background w-full max-w-md max-h-[90dvh] overflow-y-auto p-10 sm:p-12 text-center shadow-luxe">
        <button onClick={close} aria-label="Close" className="absolute top-2 right-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground text-xl leading-none p-2">×</button>
        {!unlocked ? (
          <>
            <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Welcome to AUREVA</p>
            <h2 className="font-display text-3xl font-light text-foreground leading-tight">Join our world and receive</h2>
            <p className="font-display text-4xl font-light text-foreground mt-2">10% off your first order</p>
            <form onSubmit={submit} className="mt-8 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="border-b hairline focus:border-foreground py-3 text-base text-center outline-none transition-colors"
              />
              <button type="submit" className="text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-4 hover:bg-foreground/85 transition-colors">
                Unlock my 10% off
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Welcome to AUREVA</p>
            <h2 className="font-display text-3xl font-light text-foreground">Your code</h2>
            <p className="font-display text-4xl tracking-[0.15em] text-foreground mt-4 py-4 border-y hairline">WELCOME10</p>
            <p className="text-sm text-muted-foreground mt-5">Apply this code at checkout to receive 10% off your first order.</p>
            <button onClick={close} className="mt-8 text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-8 py-4 hover:bg-secondary transition-colors w-full">
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}