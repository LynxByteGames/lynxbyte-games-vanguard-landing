import React, { useEffect, useState } from 'react';
import { Sparkles, Bot, Brain, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';
import { useLocation } from 'react-router-dom';

const EasyGamePort = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [game, setGame] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [message, setMessage] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requirementsEmail, setRequirementsEmail] = useState('');
  const [requirementsUnlocked, setRequirementsUnlocked] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Scroll/focus helper for Requirements section
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldFocus =
      location.pathname.endsWith('/requirements') ||
      location.hash === '#requirements-offer' ||
      params.get('focus') === 'requirements';

    if (!shouldFocus) return;

    const scrollAndFocus = () => {
      const section = document.getElementById('requirements-offer');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const input = document.getElementById('requirements-email') as HTMLInputElement | null;
      if (input) {
        input.focus({ preventScroll: true });
      }
    };

    // Defer until after render/animations
    const timer = setTimeout(scrollAndFocus, 50);
    return () => clearTimeout(timer);
    // re-run on location change
  }, [location]);

  // Send to Discord webhook (mirrors main Contact form style)
  const sendToDiscord = async () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1393033317586047006/6fMJG91n-5HxZA-gonKFbbqIHlbCUHg6XQaRpsesDwbMF0oogooCjahwT_n1AiWwnEbL';
    const embed = {
      title: '🎮 EasyGamePort Inquiry',
      color: 0xff2e9a,
      fields: [
        { name: '👤 Name', value: name || 'Not provided', inline: true },
        { name: '📧 Email', value: email || 'Not provided', inline: true },
        { name: '🎯 Game', value: game || 'Not provided', inline: true },
        { name: '🕹️ Platforms', value: platforms || 'Not specified', inline: true },
        { name: '💬 Message', value: message ? (message.length > 1024 ? message.substring(0, 1021) + '...' : message) : '—', inline: false },
        { name: '📢 Marketing Consent', value: acceptMarketing ? '✅ Yes' : '❌ No', inline: true },
        { name: '⏰ Timestamp', value: new Date().toLocaleString('pl-PL'), inline: true }
      ],
      footer: { text: 'EasyGamePort Form' },
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Notify Discord when requirements link is unlocked
  const sendRequirementsUnlockToDiscord = async (unlockEmail: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1393033317586047006/6fMJG91n-5HxZA-gonKFbbqIHlbCUHg6XQaRpsesDwbMF0oogooCjahwT_n1AiWwnEbL';
    const embed = {
      title: '📄 Requirements & Offer Unlocked',
      color: 0xff2e9a,
      fields: [
        { name: '📧 Email', value: unlockEmail || 'Not provided', inline: true },
        { name: '⏰ Timestamp', value: new Date().toLocaleString('pl-PL'), inline: true }
      ],
      footer: { text: 'EasyGamePort Requirements Unlock' },
      timestamp: new Date().toISOString()
    };
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleRevealRequirements = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^\S+@\S+\.\S+$/.test(requirementsEmail);
    if (!isValid) {
      toast.error('Please enter a valid email address to reveal the link.');
      return;
    }
    setRequirementsUnlocked(true);
    toast.success('Link unlocked. You can open the document now.');
    // Fire-and-forget Discord notification (non-blocking for UX)
    sendRequirementsUnlockToDiscord(requirementsEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptPrivacy) {
      toast.error('Please accept the Privacy Policy and Terms & Conditions.');
      return;
    }

    setIsLoading(true);
    try {
      const templateParams = {
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        from_name: name,
        from_email: email,
        game,
        platforms,
        message,
        accept_marketing: acceptMarketing ? 'Yes' : 'No',
        reply_to: email
      };

      const [emailResult, discordResult] = await Promise.allSettled([
        emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        ),
        sendToDiscord()
      ]);

      const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.status === 200;
      const discordSuccess = discordResult.status === 'fulfilled' && discordResult.value === true;

      if (emailSuccess || discordSuccess) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setName('');
        setEmail('');
        setGame('');
        setPlatforms('');
        setMessage('');
        setAcceptPrivacy(false);
        setAcceptMarketing(false);
      } else {
        throw new Error('Both email and Discord failed');
      }
    } catch (err: any) {
      toast.error(`Failed to send message: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load a modern font just for this subpage and set up simple scroll-reveal animations
  useEffect(() => {
    // Inject Google Font if not already present
    const existing = document.querySelector('link[data-egp-font]');
    if (!existing) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      preconnect1.setAttribute('data-egp-font', '');
      document.head.appendChild(preconnect1);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = '';
      preconnect2.setAttribute('data-egp-font', '');
      document.head.appendChild(preconnect2);

      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap';
      fontLink.setAttribute('data-egp-font', '');
      document.head.appendChild(fontLink);
    }

    // Simple IntersectionObserver-based reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealEls = document.querySelectorAll('[data-animate]');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-lynx-dark" style={{ fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative section-padding py-28 md:py-36 min-h-[70vh] flex items-center overflow-hidden" data-animate>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-lynx-pink/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-lynx-pink/10 rounded-full blur-3xl" />

        <div data-animate className="container-width max-w-5xl text-center mx-auto opacity-0 translate-y-4 transition-all duration-700">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">
            <span className="inline-flex items-center gap-2 align-middle">
              <Sparkles className="w-3.5 h-3.5 text-lynx-pink" aria-hidden="true" />
              <Bot className="w-3.5 h-3.5 text-lynx-pink" aria-hidden="true" />
              <Brain className="w-3.5 h-3.5 text-lynx-pink" aria-hidden="true" />
              <span>EasyGamePort</span>
            </span>
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-black text-white leading-[1.1]">
          Console ports without a big upfront fee.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          EasyGamePort is our in‑house automation we use during console ports. It handles saves, input, achievements/trophies, console activities and more for Unity & Unreal — so you get a high‑quality port faster while avoiding a large upfront flat fee.

          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#how" className="px-6 py-3 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition">See how it works</a>
            <a href="#apply" className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition">Apply for port</a>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            <a href="#apply" className="inline-block text-sm md:text-base text-white border border-lynx-pink/50 bg-lynx-pink/10 rounded-full px-4 py-2 shadow-[0_0_24px_#ff2e9a33] hover:bg-lynx-pink/15 transition">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lynx-pink" aria-hidden="true" />
                <strong className="text-white text-xl uppercase">WE’RE currently looking for games to port.</strong>
                <Brain className="w-4 h-4 text-lynx-pink" aria-hidden="true" />
              </span>
            </a>
            {/* Logos row */}
            <div className="mt-3 flex items-center justify-center gap-6 opacity-80">
              {/* Unity */}
              <img
                src="/lovable-uploads/pngwing.com (1).png"
                alt="Unity"
                className="h-8 md:h-10 w-auto"
                onError={(e) => { const next = '/lovable-uploads/anyrgb.com.png'; if ((e.currentTarget as HTMLImageElement).src.endsWith('pngwing.com%20(1).png') || (e.currentTarget as HTMLImageElement).src.endsWith('pngwing.com (1).png')) { (e.currentTarget as HTMLImageElement).src = next; } else { (e.currentTarget.style.display = 'none'); (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline-block'; } }}
              />
              <span className="hidden text-white text-sm tracking-wide">Unity</span>

              {/* Unreal Engine */}
              <img
                src="/lovable-uploads/anyrgb.com.png"
                alt="Unreal Engine"
                className="h-10 md:h-12 w-auto"
                onError={(e) => { const next = '/lovable-uploads/6.svg'; (e.currentTarget as HTMLImageElement).src = next; }}
              />
              <span className="hidden text-white text-sm tracking-wide">Unreal</span>

              {/* PlayStation */}
              <img src="/lovable-uploads/play-station.png" alt="PlayStation" className="h-8 md:h-10 w-auto" onError={(e) => { (e.currentTarget.style.display = 'none'); (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline-block'; }} />
              <span className="hidden text-white text-sm tracking-wide">PlayStation</span>

              {/* Xbox */}
              <img src="/lovable-uploads/consoles-xbox-512.png" alt="Xbox" className="h-8 md:h-10 w-auto" onError={(e) => { (e.currentTarget.style.display = 'none'); (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline-block'; }} />
              <span className="hidden text-white text-sm tracking-wide">Xbox</span>

              {/* Nintendo */}
              <img src="/lovable-uploads/Nintendo.webp" alt="Nintendo Switch" className="h-8 md:h-10 w-auto" onError={(e) => { (e.currentTarget.style.display = 'none'); (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline-block'; }} />
              <span className="hidden text-white text-sm tracking-wide">Switch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements & Offer (email-gated link) */}
      <section id="requirements-offer" className="section-padding py-12" data-animate>
        <div data-animate className="container-width max-w-6xl opacity-0 translate-y-4 transition-all duration-700 mx-auto">
          <div className="text-center">
            <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Requirements & Offer</span>
            <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">Requirements & Offer</h3>
            <p className="mt-3 text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
              A concise, skimmable PDF with platform requirements, a readiness checklist, timelines and our collaboration model. Enter your email to unlock instant access.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
       
              <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">~2 min read</span>
              <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">Updated Nov 2025</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Visual card */}
            <div className="p-0 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 ring-1 ring-lynx-pink/20 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/50 hover:shadow-[0_0_28px_#ff2e9a33] relative">
              <img
                src="/lovable-uploads/image copy.png"
                alt="Requirements & Offer"
                className="w-full h-full object-cover min-h-[16rem] md:min-h-[22rem]"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/lovable-uploads/gamescom_blogphoto.webp'; }}
              />
              {!requirementsUnlocked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white animate-pulse">✉️</div>
                    <p className="text-white font-semibold">Get instant access</p>
                    <p className="text-gray-200/80 text-xs mt-1">Enter your email to unlock the Requirements & Offer PDF</p>
                  </div>
                </div>
              )}
            </div>

            {/* Unlock form */}
            <div className="p-6 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 ring-1 ring-lynx-pink/20 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/50 hover:shadow-[0_0_28px_#ff2e9a33]">
              <div>
                <h4 className="text-white font-semibold text-lg">Requirements & Offer</h4>
                <p className="mt-1 text-gray-300 text-sm">Unity & Unreal • PlayStation • Xbox • Switch</p>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-white text-sm font-medium">What’s inside</p>
                  <ul className="mt-2 space-y-1.5 text-gray-300 text-xs list-disc list-inside">
                    <li>Platform requirements</li>
                    <li>Readiness checklist</li>
                    <li>Timeline & milestones</li>
                    <li>Collaboration model</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-white text-sm font-medium">Why it matters</p>
                  <ul className="mt-2 space-y-1.5 text-gray-300 text-xs list-disc list-inside">
                    <li>Know what’s needed to start</li>
                    <li>Plan scope with clarity</li>
                    <li>Reduce time to certification</li>
                    <li>Lower upfront costs</li>
                  </ul>
                </div>
              </div>
              <div className="my-4 h-px bg-white/10" />
              <h4 className="text-white font-semibold text-lg">Get instant access</h4>
              {!requirementsUnlocked ? (
                <form className="mt-4 space-y-4" onSubmit={handleRevealRequirements}>
                  <div>
                    <label className="text-sm text-gray-300">Email</label>
                    <Input
                      type="email"
                      id="requirements-email"
                      className="mt-1 bg-white text-gray-900"
                      placeholder="you@studio.com"
                      value={requirementsEmail}
                      onChange={(e) => setRequirementsEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-lynx-pink hover:bg-lynx-pink-hover text-white shadow-[0_0_14px_#ff2e9a55] hover:shadow-[0_0_20px_#ff2e9a77]">
                    Reveal download link (PDF)
                  </Button>
                  <p className="text-xs text-gray-400">
                    Instant unlock. No spam. Unsub anytime.
                  </p>
                </form>
              ) : (
                <div className="mt-4">
                  <a
                    href="https://drive.google.com/file/d/1zk-e2UyvH02nJmtgkqmPGzzHdlPtkCGO/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center px-5 py-3 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition shadow-[0_0_14px_#ff2e9a55] hover:shadow-[0_0_20px_#ff2e9a77]"
                  >
                    Open “Requirements & Offer”
                  </a>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Link unlocked for {requirementsEmail}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section-padding py-16" data-animate>
        <div data-animate className="container-width max-w-4xl opacity-0 translate-y-4 transition-all duration-700 text-center mx-auto">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">How it works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">From repetitive to automated</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BEFORE */}
            <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/5 ring-1 ring-red-500/10 transition-transform duration-300 hover:-translate-y-1 hover:border-red-500/50">
              <div className="inline-flex items-center gap-2 text-red-300 font-semibold uppercase text-xs tracking-wide">
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30">Before</span>
                <span className="opacity-80">Traditional flat-fee porting</span>
              </div>
              <h3 className="mt-2 text-white font-bold text-lg">High friction. Slow. Risky.</h3>
              <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="mt-0.5">❌</span><span>Large upfront cost that needs budget approval</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">❌</span><span>Long scoping phase before you even get started</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">❌</span><span>Constant requests to your dev team</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">❌</span><span>Unpredictable certification issues</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">❌</span><span>Timelines that slip because internal teams get busy</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">❌</span><span>High friction, high commitment</span></li>
              </ul>
            </div>
            {/* AFTER */}
            <div className="p-6 rounded-2xl border border-lynx-pink/40 bg-lynx-dark/60 ring-1 ring-lynx-pink/20 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/60 hover:shadow-[0_0_28px_#ff2e9a33]">
              <div className="inline-flex items-center gap-2 text-lynx-pink font-semibold uppercase text-xs tracking-wide">
                <span className="px-2 py-0.5 rounded-full bg-lynx-pink/10 border border-lynx-pink/40">After</span>
                <span className="opacity-90">EasyGamePort</span>
              </div>
              <h3 className="mt-2 text-white font-bold text-lg">Low friction. Fast. Predictable.</h3>
              <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="mt-0.5">✅</span><span>Minimal upfront cost</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✅</span><span>No load on your internal dev team</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✅</span><span>Fast evaluation and predictable milestones</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✅</span><span>Certification and release management fully handled</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✅</span><span>Low friction, low commitment, high speed</span></li>
              </ul>
            </div>
          </div>

          {/* 3-step flow */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_18px_#ff2e9a22]">
              <p className="text-xs text-lynx-pink font-semibold uppercase tracking-wide">Step 1</p>
              <p className="text-white font-medium mt-1">Automate porting</p>
              <p className="text-gray-300 text-sm mt-1">We automate saves, input, achievements, activities and haptics across all target platforms.</p>
            </div>
            <div className="p-4 rounded-xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_18px_#ff2e9a22]">
              <p className="text-xs text-lynx-pink font-semibold uppercase tracking-wide">Step 2</p>
              <p className="text-white font-medium mt-1">Certification & release</p>
              <p className="text-gray-300 text-sm mt-1">We prepare builds, run compliance checks and de‑risk TRC/XR issues early to keep you on schedule.</p>
            </div>
            <div className="p-4 rounded-xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_18px_#ff2e9a22]">
              <p className="text-xs text-lynx-pink font-semibold uppercase tracking-wide">Step 3</p>
              <p className="text-white font-medium mt-1">Release management</p>
              <p className="text-gray-300 text-sm mt-1">We manage submissions, store assets and updates, coordinating timelines for a smooth launch.</p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl border border-lynx-pink/40 bg-lynx-dark/60 shadow-[0_0_24px_#ff2e9a22]">
            <p className="text-white font-semibold leading-relaxed text-center">
              In short: we use EasyGamePort in our porting work so you avoid a large upfront flat fee — shipping to consoles faster and with lower initial cost.
            </p>
          </div>
        </div>
      </section>



      {/* Newsletter + Discord community */}
      <section className="section-padding py-16" data-animate>
        <div data-animate className="container-width max-w-6xl opacity-0 translate-y-4 transition-all duration-700 text-center mx-auto mb-8">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Community</span>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">Stay connected</h3>
          <p className="mt-3 text-gray-300 text-center max-w-3xl mx-auto">
            Join our community and get the latest updates on console porting.
          </p>
        </div>
        <div data-animate className="container-width max-w-6xl opacity-0 translate-y-4 transition-all duration-700 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Newsletter */}
            <div className="p-6 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/50 hover:shadow-[0_0_28px_#ff2e9a33]">
              <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Newsletter</span>
              <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">Get console‑porting tips and product updates</h3>

              <div className="mt-6">
                {/* MailerLite embedded form */}
                <div 
                  dangerouslySetInnerHTML={{
                    __html: `<style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1761043");</style>
    <style type="text/css">
    /* LOADER */
    .ml-form-embedSubmitLoad {
      display: inline-block;
      width: 20px;
      height: 20px;
    }

    .g-recaptcha {
    transform: scale(1);
    -webkit-transform: scale(1);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    height: ;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
    }

    .ml-form-embedSubmitLoad:after {
      content: " ";
      display: block;
      width: 11px;
      height: 11px;
      margin: 1px;
      border-radius: 50%;
      border: 4px solid #fff;
    border-color: #ffffff #ffffff #ffffff transparent;
    animation: ml-form-embedSubmitLoad 1.2s linear infinite;
    }
    @keyframes ml-form-embedSubmitLoad {
      0% {
      transform: rotate(0deg);
      }
      100% {
      transform: rotate(360deg);
      }
    }
      #mlb2-32521448.ml-form-embedContainer {
        box-sizing: border-box;
        display: table;
        margin: 0 auto;
        position: static;
        width: 100% !important;
      }
      #mlb2-32521448.ml-form-embedContainer h4,
      #mlb2-32521448.ml-form-embedContainer p,
      #mlb2-32521448.ml-form-embedContainer span,
      #mlb2-32521448.ml-form-embedContainer button {
        text-transform: none !important;
        letter-spacing: normal !important;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper {
        background-color: #0a0a0a;
        
        border-width: 0px;
        border-color: transparent;
        border-radius: 25px;
        border-style: solid;
        box-sizing: border-box;
        display: inline-block !important;
        margin: 0;
        padding: 0;
        position: relative;
              }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { width: 400px; }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 400px; width: 100%; }
      #mlb2-32521448.ml-form-embedContainer .ml-form-align-left { text-align: left; }
      #mlb2-32521448.ml-form-embedContainer .ml-form-align-center { text-align: center; }
      #mlb2-32521448.ml-form-embedContainer .ml-form-align-default { display: table-cell !important; vertical-align: middle !important; text-align: center !important; }
      #mlb2-32521448.ml-form-embedContainer .ml-form-align-right { text-align: right; }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedHeader img {
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        height: auto;
        margin: 0 auto !important;
        max-width: 100%;
        width: undefinedpx;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
        padding: 20px 20px 0 20px;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal {
        padding-bottom: 0;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
        text-align: left;
        margin: 0 0 20px 0;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
        font-weight: 400;
        margin: 0 0 10px 0;
        text-align: left;
        word-break: break-word;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin: 0 0 10px 0;
        text-align: left;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ul,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ul,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol {
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol ol,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol ol {
        list-style-type: lower-alpha;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol ol ol,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol ol ol {
        list-style-type: lower-roman;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p a,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p a {
        color: #000000;
        text-decoration: underline;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
        text-align: left!important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
        margin-bottom: 5px;
        color: #ffffff;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold; font-style: normal; text-decoration: none;;
        display: inline-block;
        line-height: 20px;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p:last-child,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p:last-child {
        margin: 0;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
        margin: 0;
        width: 100%;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
        margin: 0 0 20px 0;
        width: 100%;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
        float: left;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
        margin: 0;
        padding: 0 0 20px 0;
        width: 100%;
        height: auto;
        float: left;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
        margin: 0 0 10px 0;
        width: 100%;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
        margin: 0;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-formfieldHorizintal {
        margin: 0;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
        background-color: #ffffff !important;
        color: #333333 !important;
        border-color: #cccccc;
        border-radius: 4px !important;
        border-style: solid !important;
        border-width: 1px !important;
        font-family: 'Poppins', sans-serif;
        font-size: 14px !important;
        height: auto;
        line-height: 21px !important;
        margin-bottom: 0;
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        padding: 10px 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-webkit-input-placeholder,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-webkit-input-placeholder { color: #333333; }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-moz-placeholder,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-moz-placeholder { color: #333333; }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-ms-input-placeholder,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-ms-input-placeholder { color: #333333; }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-moz-placeholder,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-moz-placeholder { color: #333333; }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow textarea {
        background-color: #ffffff !important;
        color: #333333 !important;
        border-color: #cccccc;
        border-radius: 4px !important;
        border-style: solid !important;
        border-width: 1px !important;
        font-family: 'Poppins', sans-serif;
        font-size: 14px !important;
        height: auto;
        line-height: 21px !important;
        margin-bottom: 0;
        margin-top: 0;
        padding: 10px 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          border-color: #cccccc!important;
          background-color: #ffffff!important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.custom-control-input[type="checkbox"]{
        box-sizing: border-box;
        padding: 0;
        position: absolute;
        z-index: -1;
        opacity: 0;
        margin-top: 5px;
        margin-left: -1.5rem;
        overflow: visible;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
        border-radius: 4px!important;
      }


      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type=checkbox]:checked~.label-description::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type=checkbox]:checked~.label-description::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input:checked~.custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input:checked~.custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox input[type=checkbox]:checked~.label-description::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-input:checked~.custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input:checked~.custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input:checked~.custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type=checkbox]:checked~.label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox input[type=checkbox]:checked~.label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type=checkbox]:checked~.label-description::before  {
          border-color: #ffffff!important;
          background-color: #ff00c4!important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::after {
           top: 2px;
           box-sizing: border-box;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
           top: 0px!important;
           box-sizing: border-box!important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
        top: 0px!important;
           box-sizing: border-box!important;
      }

       #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::after {
            top: 0px!important;
            box-sizing: border-box!important;
            position: absolute;
            left: -1.5rem;
            display: block;
            width: 1rem;
            height: 1rem;
            content: "";
       }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before {
        top: 0px!important;
        box-sizing: border-box!important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-control-label::before {
          position: absolute;
          top: 4px;
          left: -1.5rem;
          display: block;
          width: 16px;
          height: 16px;
          pointer-events: none;
          content: "";
          background-color: #ffffff;
          border: #adb5bd solid 1px;
          border-radius: 50%;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-control-label::after {
          position: absolute;
          top: 2px!important;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          position: absolute;
          top: 4px;
          left: -1.5rem;
          display: block;
          width: 16px;
          height: 16px;
          pointer-events: none;
          content: "";
          background-color: #ffffff;
          border: #adb5bd solid 1px;
          border-radius: 50%;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::after {
          position: absolute;
          top: 0px!important;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
          position: absolute;
          top: 0px!important;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-radio .custom-control-label::after {
          background: no-repeat 50%/50% 50%;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-checkbox .custom-control-label::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::after, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
          background: no-repeat 50%/50% 50%;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-control, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-control {
        position: relative;
        display: block;
        min-height: 1.5rem;
        padding-left: 1.5rem;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-input, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input {
          position: absolute;
          z-index: -1;
          opacity: 0;
          box-sizing: border-box;
          padding: 0;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label {
          color: #ffffff;
          font-size: 12px!important;
          font-family: 'Poppins', sans-serif;
          line-height: 22px;
          margin-bottom: 0;
          position: relative;
          vertical-align: top;
          font-style: normal;
          font-weight: 700;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-select, #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-select {
        background-color: #ffffff !important;
        color: #333333 !important;
        border-color: #cccccc;
        border-radius: 4px !important;
        border-style: solid !important;
        border-width: 1px !important;
        font-family: 'Poppins', sans-serif;
        font-size: 14px !important;
        line-height: 20px !important;
        margin-bottom: 0;
        margin-top: 0;
        padding: 10px 28px 10px 12px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
        height: auto;
        display: inline-block;
        vertical-align: middle;
        background: url('https://assets.mlcdn.com/ml/images/default/dropdown.svg') no-repeat right .75rem center/8px 10px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }


      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow {
        height: auto;
        width: 100%;
        float: left;
      }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 70%; float: left; }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal { width: 30%; float: left; }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal.labelsOn { padding-top: 25px;  }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields { box-sizing: border-box; float: left; padding-right: 10px;  }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input {
        background-color: #ffffff;
        color: #333333;
        border-color: #cccccc;
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
        margin-top: 0;
        padding: 10px 10px;
        width: 100%;
        box-sizing: border-box;
        overflow-y: initial;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button {
        background-color: #fe017d !important;
        border-color: #fe017d;
        border-style: solid;
        border-width: 1px;
        border-radius: 4px;
        box-shadow: none;
        color: #ffffff !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 14px !important;
        font-weight: 700;
        line-height: 20px;
        margin: 0 !important;
        padding: 10px !important;
        width: 100%;
        height: auto;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover {
        background-color: #ec00ff !important;
        border-color: #ec00ff !important;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type="checkbox"] {
        box-sizing: border-box;
        padding: 0;
        position: absolute;
        z-index: -1;
        opacity: 0;
        margin-top: 5px;
        margin-left: -1.5rem;
        overflow: visible;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description {
        color: #ffffff;
        display: block;
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        text-align: left;
        margin-bottom: 0;
        position: relative;
        vertical-align: top;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label {
        font-weight: normal;
        margin: 0;
        padding: 0;
        position: relative;
        display: block;
        min-height: 24px;
        padding-left: 24px;

      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label a {
        color: #ffffff;
        text-decoration: underline;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p {
        color: #ffffff !important;
        font-family: 'Poppins', sans-serif !important;
        font-size: 12px !important;
        font-weight: normal !important;
        line-height: 18px !important;
        padding: 0 !important;
        margin: 0 5px 0 0 !important;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p:last-child {
        margin: 0;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
        margin: 0 0 20px 0;
        float: left;
        width: 100%;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
        background-color: #fe017d !important;
        border: none !important;
        border-radius: 4px !important;
        box-shadow: none !important;
        color: #ffffff !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        line-height: 21px !important;
        height: auto;
        padding: 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
        display: none;
      }
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
        background-color: #ec00ff !important;
      }
      .ml-subscribe-close {
        width: 30px;
        height: 30px;
        background: url('https://assets.mlcdn.com/ml/images/default/modal_close.png') no-repeat;
        background-size: 30px;
        cursor: pointer;
        margin-top: -10px;
        margin-right: -10px;
        position: absolute;
        top: 0;
        right: 0;
      }
      .ml-error input, .ml-error textarea, .ml-error select {
        border-color: red!important;
      }

      .ml-error .custom-checkbox-radio-list {
        border: 1px solid red !important;
        border-radius: 25px;
        padding: 10px;
      }

      .ml-error .label-description,
      .ml-error .label-description p,
      .ml-error .label-description p a,
      .ml-error label:first-child {
        color: #ff0000 !important;
      }

      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p,
      #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p:first-letter {
        color: #ff0000 !important;
      }
            @media only screen and (max-width: 400px){

        .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup { width: 100%!important; }
        .ml-form-formContent.horozintalForm { float: left!important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow { height: auto!important; width: 100%!important; float: left!important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 100%!important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-right: 0px!important; padding-bottom: 10px; }
        .ml-form-formContent.horozintalForm .ml-button-horizontal { width: 100%!important; }
        .ml-form-formContent.horozintalForm .ml-button-horizontal.labelsOn { padding-top: 0px!important; }

      }
    </style>

    <style type="text/css">

      .ml-mobileButton-horizontal { display: none; }

      #mlb2-32521448 .ml-mobileButton-horizontal button {

        background-color: #fe017d !important;
        border-color: #fe017d !important;
        border-style: solid !important;
        border-width: 1px !important;
        border-radius: 4px !important;
        box-shadow: none !important;
        color: #ffffff !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        line-height: 20px !important;
        padding: 10px !important;
        width: 100% !important;

      }

      @media only screen and (max-width: 400px) {
        #mlb2-32521448.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
          padding: 0 0 10px 0 !important;
        }
        .ml-hide-horizontal { display: none !important; }
        .ml-form-formContent.horozintalForm .ml-button-horizontal { display: none!important; }
        .ml-mobileButton-horizontal { display: inline-block !important; margin-bottom: 20px;width:100%; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-bottom: 0px !important; }
      }

    </style>
  <style type="text/css">
    @media only screen and (max-width: 400px) {
       .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields {
        margin-bottom: 10px !important;
        width: 100% !important;
      }
    }
  </style>
    
    

    
    

    
    

    

      
        
        
      

      
        
        
      

      

            
            
            
            
            
            
      

      

      
        
        
         
        
        
      

        
        
        
        
        
        
      

       

        
        
        
        
        
        
        
       


      
        
        
        
        
  



  
        
        
        
      


      
    
    
    
    
    
    
    
  

  
        
        
        
        
        
      

      
        
        
        
        
        
      

      
        
        
        
        
        
      

       

        
        
        
        
       

       
        
        
        
        
      

      
        
        
        
        
        
        
        
       

    

    


      


      

      
      

      

      





    

      
    <div id="mlb2-32521448" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-32521448">
      <div class="ml-form-align-center ">
        <div class="ml-form-embedWrapper embedForm">

          
          

          <div class="ml-form-embedBody ml-form-embedBodyHorizontal row-form">

            <div class="ml-form-embedContent" style="margin-bottom: 0px; ">
              
            </div>

            <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1879427/forms/169254751741936801/subscribe" data-code="" method="post" target="_blank">
              

              <div class="ml-form-formContent horozintalForm">
                <div class="ml-form-horizontalRow">
                  <div class="ml-input-horizontal">
                    
                      
                      <div style="width: 100%;" class="horizontal-fields">






                        <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          
                          <!-- input -->
                      <input type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email">
                      <!-- /input -->
                        </div>



                      </div>
                    
                  </div>


                  <div class="ml-button-horizontal primary ">
                    
                      <button type="submit" class="primary">Subscribe</button>
                    
                    <button disabled="disabled" style="display: none;" type="button" class="loading">
                      <div class="ml-form-embedSubmitLoad"></div>
                      <span class="sr-only">Loading...</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Privacy policy -->
              
              <!-- /Privacy policy -->

              

              

              <div class="ml-form-checkboxRow ml-validate-required">
                
                  <label class="checkbox">
                    <input type="checkbox">
                    <div class="label-description">
                      <p><span style="font-size: 10px;">*I have read and accept the Privacy Policy and Terms & Conditions. I agree to receive information about products, services, promotions and news from LYNXBYTE GAMES PSA, based in Poland and its related entities, including other companies from the gaming group, at the provided email address.<span style="font-size: 10px;"></span></span></p>
                    </div>
                  </label>
                
              </div>






              
              <input type="hidden" name="ml-submit" value="1">

              

              <div class="ml-mobileButton-horizontal">
                <button type="submit" class="primary">Subscribe</button>
                <button disabled="disabled" style="display: none;" type="button" class="loading">
                  <div class="ml-form-embedSubmitLoad"></div>
                  <span class="sr-only">Loading...</span>
                </button>
              </div>
              <input type="hidden" name="anticsrf" value="true">
            </form>
          </div>

          <div class="ml-form-successBody row-success" style="display: none">

            <div class="ml-form-successContent">
              
                <h4>Thank you!</h4>
                
                  <p>You have successfully joined our subscriber list.</p>
                
              
            </div>

          </div>
        </div>
      </div>
    </div>

  

  
  
  <script>
    function ml_webform_success_32521448() {
      var $ = ml_jQuery || jQuery;
      $('.ml-subscribe-form-32521448 .row-success').show();
      $('.ml-subscribe-form-32521448 .row-form').hide();
    }
      </script>
  
  
      <script src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" type="text/javascript"></script>
        <script>
            fetch("https://assets.mailerlite.com/jsonp/1879427/forms/169254751741936801/takel")
        </script>`
                  }}
                />
                <div id="newsletter-success" className="mt-4 p-3 bg-green-500/20 border border-green-500/40 rounded-lg text-green-300 text-sm hidden">
                  ✅ Thank you! You have successfully subscribed to our newsletter.
                </div>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      document.addEventListener('DOMContentLoaded', function() {
                        const form = document.querySelector('#mlb2-32521448 form');
                        const checkbox = document.getElementById('newsletter-privacy');
                        const successMessage = document.getElementById('newsletter-success');
                        
                        if (form && checkbox) {
                          form.addEventListener('submit', function(e) {
                            if (!checkbox.checked) {
                              e.preventDefault();
                              alert('Please accept the Privacy Policy and Terms & Conditions to continue.');
                              return false;
                            }
                          });
                          
                          // Listen for MailerLite success
                          window.ml_webform_success_32521448 = function() {
                            if (successMessage) {
                              successMessage.classList.remove('hidden');
                              form.style.display = 'none';
                            }
                          };
                        }
                      });
                    `
                  }}
                />
              </div>
            </div>

            {/* Discord community */}
            <div className="p-6 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/50 hover:shadow-[0_0_28px_#ff2e9a33]">
              <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Community</span>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl ring-2 ring-[#5865F2]/60 bg-[#5865F2]/10 shadow-[0_0_16px_#5865F244] p-1.5 flex items-center justify-center">
                  <img
                    src="/lovable-uploads/discord.png"
                    alt="Discord logo"
                    className="h-full w-full object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Join our Discord</h3>
              </div>
              <p className="mt-3 text-gray-300 text-sm md:text-base">
                Hang out with other devs, ask implementation questions, see sneak peeks and take part in feedback rounds.
              </p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm list-disc list-inside">
                <li>Best community around ports</li>
                <li>Early feature previews and changelogs</li>
                <li>Dedicated help channels</li>
              </ul>
              <a
                href="https://discord.gg/zWbNC6vwRz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-center px-5 py-2 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition shadow-[0_0_12px_#ff2e9a55]"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>



      

      {/* Special offer as hero */}
      <section className="relative section-padding py-24 min-h-[60vh] flex items-center overflow-hidden" data-animate>
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-lynx-pink/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-lynx-pink/10 rounded-full blur-3xl" />

        <div data-animate className="container-width max-w-4xl text-center mx-auto opacity-0 translate-y-4 transition-all duration-700">
          <p className="text-lynx-pink font-semibold tracking-wide uppercase">Special offer</p>
          <h3 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Let’s talk about your port.
          </h3>
          <p className="mt-4 text-gray-300 md:text-lg max-w-3xl mx-auto">
            We’re onboarding teams and using EasyGamePort to reduce upfront costs for publishers and studios while accelerating delivery.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="#apply" className="px-7 py-3 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition shadow-[0_0_14px_#ff2e9a55] hover:shadow-[0_0_20px_#ff2e9a77]">
              Apply for port
            </a>
          </div>
        </div>
      </section>

      {/* Requirements + Contact form */}
      <section className="section-padding pb-20 pt-2" data-animate>
        <div data-animate className="container-width max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 opacity-0 translate-y-4 transition-all duration-700">
          <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22] relative overflow-hidden ring-1 ring-lynx-pink/15">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lynx-pink/10 via-transparent to-white/5" />
            <div aria-hidden="true" className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-lynx-pink/30 blur-3xl opacity-30" />
            <div className="relative">
              <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Requirements & Offer</span>
              <div className="mt-3">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white">📄</div>
                <h4 className="text-white font-extrabold text-lg">What’s inside</h4>
                <p className="mt-2 text-gray-300 text-sm">
                  A concise PDF with platform requirements, a readiness checklist, timelines and how we’ll work together — everything you need to plan a smooth console launch.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">Requirements</span>
                  <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">Checklist</span>
                  <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">Timeline</span>
                  <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">Collab model</span>
                </div>
                <p className="mt-3 text-gray-400 text-xs">
                  Not sure you meet everything? No worries — we’ll review together and help you get there.
                </p>
              </div>
              <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/20 relative">
                <img
                  src="/lovable-uploads/image copy.png"
                  alt="Requirements & Offer preview"
                  className="w-full h-48 object-cover opacity-90 grayscale hover:grayscale-0 transition"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/lovable-uploads/gamescom_blogphoto.webp'; }}
                />
                {!requirementsUnlocked && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white animate-pulse">🔒</div>
                      <p className="text-white font-semibold">Locked</p>
                      <p className="text-gray-200/80 text-xs mt-1">Enter your email below to unlock the Requirements & Offer</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <a
                  href="#requirements-offer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition shadow-[0_0_14px_#ff2e9a55] hover:shadow-[0_0_20px_#ff2e9a77]"
                >
                  View Requirements & Offer <span aria-hidden="true">→</span>
                </a>
                <p className="text-gray-400 text-xs mt-2">Instant access after email. No spam.</p>
              </div>
            </div>
          </div>

          <div id="apply" className="p-6 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/50 hover:shadow-[0_0_28px_#ff2e9a33]">
            <h4 className="text-white font-bold text-lg">Apply for a port</h4>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-gray-300">Your name</label>
                <Input
                  className="mt-1 bg-white text-gray-900"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <Input
                  type="email"
                  className="mt-1 bg-white text-gray-900"
                  placeholder="jane@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Game & engine</label>
                <Input
                  className="mt-1 bg-white text-gray-900"
                  placeholder="Project name — Unity / Unreal"
                  value={game}
                  onChange={(e) => setGame(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Target platforms (optional)</label>
                <Input
                  className="mt-1 bg-white text-gray-900"
                  placeholder="PlayStation / Xbox / Switch"
                  value={platforms}
                  onChange={(e) => setPlatforms(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Notes</label>
                <Textarea
                  className="mt-1 bg-white text-gray-900"
                  placeholder="Link to trailer/build, timeline, constraints — anything that helps."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy-egp"
                    checked={acceptPrivacy}
                    onCheckedChange={(checked) => setAcceptPrivacy(!!checked)}
                    className="mt-1 flex-shrink-0"
                    required
                  />
                  <label htmlFor="privacy-egp" className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    *I have read and accept the Privacy Policy and Terms & Conditions.
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing-egp"
                    checked={acceptMarketing}
                    onCheckedChange={(checked) => setAcceptMarketing(!!checked)}
                    className="mt-1 flex-shrink-0"
                  />
                  <label htmlFor="marketing-egp" className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    I agree to receive information about products, services, promotions and news from LYNXBYTE GAMES PSA and related entities at the provided email address.
                  </label>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-lynx-pink hover:bg-lynx-pink-hover text-white">
                {isLoading ? 'Sending...' : 'Apply now'}
              </Button>
              <p className="text-xs text-gray-400">
                By applying, you agree to be contacted about the program. No spam.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EasyGamePort;


