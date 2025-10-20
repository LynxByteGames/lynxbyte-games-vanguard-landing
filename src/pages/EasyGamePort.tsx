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

const EasyGamePort = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [game, setGame] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [message, setMessage] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

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
            One plugin that will port your game to console
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          EasyGamePort is an open-source plugin that fully automates the technical aspects of game porting. It handles the implementation of save systems, controls, achievements/trophies, console activity, and much more, enabling game developers with no porting experience to independently bring their games to consoles at minimal cost.

          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#how" className="px-6 py-3 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition">See how it works</a>
            <a href="#apply" className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition">Apply for free port</a>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            <a href="#apply" className="inline-block text-sm md:text-base text-white border border-lynx-pink/50 bg-lynx-pink/10 rounded-full px-4 py-2 shadow-[0_0_24px_#ff2e9a33] hover:bg-lynx-pink/15 transition">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lynx-pink" aria-hidden="true" />
                <strong className="text-white text-xl">RIGHT NOW WE ARE LOOKING FOR GAMES TO FREE PORT</strong>
                <Brain className="w-4 h-4 text-lynx-pink" aria-hidden="true" />
              </span>
            </a>
            <span className="text-xs text-gray-400">Limited to 5 titles this quarter</span>
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

      {/* How it works */}
      <section id="how" className="section-padding py-16" data-animate>
        <div data-animate className="container-width max-w-4xl opacity-0 translate-y-4 transition-all duration-700 text-center mx-auto">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">How it works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">From repetitive to automated</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22]">
              <div className="inline-flex items-center gap-2 text-lynx-pink font-semibold uppercase text-xs tracking-wide">
                <span>Problem</span>
              </div>
              <h3 className="mt-2 text-white font-bold text-lg">Console ports are costly and slow</h3>
              <ul className="mt-3 space-y-2 text-gray-300 text-sm list-disc list-inside">
                <li>Hard‑to‑find know‑how and scattered docs</li>
                <li>Repetitive work across platforms</li>
                <li>Unclear steps to reach certification</li>
              </ul>
            </div>
            {/* Solution */}
            <div className="p-6 rounded-2xl border border-lynx-pink/40 bg-lynx-dark/60 ring-1 ring-lynx-pink/20 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/60 hover:shadow-[0_0_28px_#ff2e9a33]">
              <div className="inline-flex items-center gap-2 text-lynx-pink font-semibold uppercase text-xs tracking-wide">
                <span>Solution</span>
              </div>
              <h3 className="mt-2 text-white font-bold text-lg">Automate the repetitive, ship faster</h3>
              <ul className="mt-3 space-y-2 text-gray-300 text-sm list-disc list-inside">
                <li>Open‑source plugin for Unity & Unreal</li>
                <li>Auto implementation: save system, input, achievements/trophies, consoles activities</li>
                <li>Build in step by step process list</li>
              </ul>
            </div>
          </div>

          {/* 3-step flow */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_18px_#ff2e9a22]">
              <p className="text-xs text-lynx-pink font-semibold uppercase tracking-wide">Step 1</p>
              <p className="text-white font-medium mt-1">Install & select target platform</p>
              <p className="text-gray-300 text-sm mt-1">Add the plugin, choose PlayStation, Xbox or Switch presets.</p>
            </div>
            <div className="p-4 rounded-xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_18px_#ff2e9a22]">
              <p className="text-xs text-lynx-pink font-semibold uppercase tracking-wide">Step 2</p>
              <p className="text-white font-medium mt-1">Auto‑implement essentials</p>
              <p className="text-gray-300 text-sm mt-1">Save, input, achievements, activities and vibrations add in one step.</p>
            </div>
            <div className="p-4 rounded-xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_18px_#ff2e9a22]">
              <p className="text-xs text-lynx-pink font-semibold uppercase tracking-wide">Step 3</p>
              <p className="text-white font-medium mt-1">Build towards certification</p>
              <p className="text-gray-300 text-sm mt-1">Follow the checklist - iterate to stability and performance.</p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl border border-lynx-pink/40 bg-lynx-dark/60 shadow-[0_0_24px_#ff2e9a22]">
            <p className="text-white font-semibold leading-relaxed text-center">
              In easy words: One open‑source plugin that lets your team port games cheaper, faster,
              and without prior porting experience.
            </p>
          </div>
        </div>
      </section>

      {/* Who is it for? */}
      <section className="section-padding py-12" data-animate>
        <div data-animate className="container-width max-w-5xl opacity-0 translate-y-4 transition-all duration-700 text-center mx-auto">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Who is it for</span>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">Works for both devs and publishers</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22]">
              <h4 className="text-white font-semibold">Developers</h4>
              <p className="text-gray-300 mt-2 text-sm">
                For indie/solo creators and larger independent studios who want to release on new
                platforms without a huge upfront cost — while keeping full control over their game.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22]">
              <h4 className="text-white font-semibold">Publishers</h4>
              <p className="text-gray-300 mt-2 text-sm">
                For game publishers releasing multiple titles who want to reduce porting costs and
                accelerate time‑to‑market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key details grid */}
      <section className="section-padding py-12" data-animate>
        <div data-animate className="container-width max-w-5xl opacity-0 translate-y-4 transition-all duration-700 text-center mx-auto">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Key details</span>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">What you get out‑of‑the‑box</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22]">
              <h4 className="text-white font-semibold">Placeholder title #1</h4>
              <p className="text-gray-300 mt-2 text-sm">Short placeholder description for this key detail.</p>
            </div>
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-transform duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22]">
              <h4 className="text-white font-semibold">Placeholder title #2</h4>
              <p className="text-gray-300 mt-2 text-sm">Short placeholder description for this key detail.</p>
            </div>
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 hover:border-lynx-pink/40 transition">
              <h4 className="text-white font-semibold">Placeholder title #3</h4>
              <p className="text-gray-300 mt-2 text-sm">Short placeholder description for this key detail.</p>
            </div>
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 hover:border-lynx-pink/40 transition">
              <h4 className="text-white font-semibold">Placeholder title #4</h4>
              <p className="text-gray-300 mt-2 text-sm">Short placeholder description for this key detail.</p>
            </div>
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 hover:border-lynx-pink/40 transition">
              <h4 className="text-white font-semibold">Placeholder title #5</h4>
              <p className="text-gray-300 mt-2 text-sm">Short placeholder description for this key detail.</p>
            </div>
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 hover:border-lynx-pink/40 transition">
              <h4 className="text-white font-semibold">Placeholder title #6</h4>
              <p className="text-gray-300 mt-2 text-sm">Short placeholder description for this key detail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding py-16 bg-lynx-pink/10" data-animate>
        <div data-animate className="container-width max-w-6xl opacity-0 translate-y-4 transition-all duration-700 text-center mx-auto">
          <span className="inline-block text-lynx-pink font-semibold tracking-wide uppercase border border-lynx-pink/40 bg-lynx-pink/10 rounded-full px-3 py-1 shadow-[0_0_24px_#ff2e9a22]">Pricing</span>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">Flexible plans for every team</h3>
          <p className="mt-3 text-gray-300 text-center max-w-3xl mx-auto">
            Flexible options for teams of all sizes. Start open‑source, scale when you need.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tier 1 (highlighted) */}
            <div className="group p-6 rounded-2xl border border-lynx-pink/40 bg-lynx-dark/60 ring-1 ring-lynx-pink/30 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/60 hover:shadow-[0_0_32px_#ff2e9a33]">
              <div className="flex items-center justify-center gap-2">
                <h4 className="text-white font-bold text-lg">Open Source</h4>
                <span className="text-white/80" aria-hidden="true" title="GitHub">
                  <Github className="w-5 h-5" />
                </span>
              </div>
              <p className="text-lynx-pink mt-1 font-semibold">ALWAYS FREE</p>
              <p className="text-gray-300 mt-2 text-sm">Core plugin, MIT license.</p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm flex-1">
                <li>Use free to develop your port</li>
                <li>All features are included</li>
                <li>Community support</li>
              </ul>
              <a href="#" className="mt-6 inline-block text-center px-4 py-2 rounded-full bg-lynx-pink text-white hover:bg-lynx-pink-hover transition shadow-[0_0_12px_#ff2e9a55] group-hover:shadow-[0_0_18px_#ff2e9a77]">Get started</a>
            </div>

            {/* Tier 2 */}
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 flex flex-col">
              <h4 className="text-white font-bold text-lg">For independent developers</h4>
              <p className="text-lynx-pink mt-1 font-semibold">15% revshare or $149/month</p>
              <p className="text-gray-300 mt-2 text-sm">For small teams publishing their port independent</p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm flex-1">
                <li>Include opensource features</li>
                <li>SLA 1h</li>
                <li> </li>
              </ul>
              <a href="#" className="mt-6 inline-block text-center px-4 py-2 rounded-full bg-lynx-pink text-white hover:bg-lynx-pink-hover transition shadow-[0_0_10px_#ff2e9a44]">Contact sales</a>
              <p className="mt-2 text-xs text-white font-semibold">Pay only when you earn</p>
            </div>

            {/* Tier 3 */}
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 flex flex-col">
              <h4 className="text-white font-bold text-lg">For developers and publishers</h4>
              <p className="text-lynx-pink mt-1 font-semibold">$799/month</p>
              <p className="text-gray-300 mt-2 text-sm">For studios and publishers over $200,000 revenue</p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm flex-1">
                <li>Include opensource features</li>
                <li>SLA 4h</li>
                <li>Certification support</li>
              </ul>
              <a href="#" className="mt-6 inline-block text-center px-4 py-2 rounded-full bg-lynx-pink text-white hover:bg-lynx-pink-hover transition shadow-[0_0_10px_#ff2e9a44]">Contact sales</a>
              <p className="mt-2 text-xs text-white font-semibold">Pay only when you earn</p>
            </div>

            {/* Tier 4 */}
            <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 flex flex-col">
              <h4 className="text-white font-bold text-lg">For studios and publishers releasing many games</h4>
              <p className="text-lynx-pink mt-1 font-semibold">custom</p>
              <p className="text-gray-300 mt-2 text-sm"></p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm flex-1">
                <li>Full inhouse implementation</li>
                <li>Custom connection and optimization</li>
                <li>99,99% SLA and certification support</li>
              </ul>
              <a href="/contact" className="mt-6 inline-block text-center px-4 py-2 rounded-full bg-lynx-pink text-white hover:bg-lynx-pink-hover transition shadow-[0_0_10px_#ff2e9a44]">Contact sales</a>
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
            Right now we offer free ports — let’s connect!
          </h3>
          <p className="mt-4 text-gray-300 md:text-lg max-w-3xl mx-auto">
            We’re onboarding early teams to validate EasyGamePort at scale. If your title is a good
            fit, we’ll help you bring it to consoles at no cost.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="#apply" className="px-7 py-3 rounded-full bg-lynx-pink text-white font-semibold hover:bg-lynx-pink-hover transition shadow-[0_0_14px_#ff2e9a55] hover:shadow-[0_0_20px_#ff2e9a77]">
              Apply for the free port
            </a>
          </div>
        </div>
      </section>

      {/* Requirements + Contact form */}
      <section className="section-padding pb-20 pt-2" data-animate>
        <div data-animate className="container-width max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 opacity-0 translate-y-4 transition-all duration-700">
          <div className="p-6 rounded-2xl border border-lynx-pink/20 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/40 hover:shadow-[0_0_24px_#ff2e9a22]">
            <h4 className="text-white font-bold text-lg">Requirements</h4>
            <ul className="mt-3 space-y-2 text-gray-300 text-sm list-disc list-inside">
              <li>Unity or Uneal engine</li>
              <li>Realase game on Steam or one of the consoles</li>
              <li>Implemented controls using Rewired, Unity Input System or Unreal Input System</li>
              <li>No multiplayer or crossplay features</li>
              <li>No needed to optimize</li>
              <li>No major bugs or crashes in the build</li>
            </ul>
            <p className="text-gray-400 text-sm mt-4">Don’t worry if you don’t complete all the requirements, feel free to apply and we'll discuss the details.</p>
          </div>

          <div id="apply" className="p-6 rounded-2xl border border-lynx-pink/30 bg-lynx-dark/60 transition-all duration-300 hover:-translate-y-1 hover:border-lynx-pink/50 hover:shadow-[0_0_28px_#ff2e9a33]">
            <h4 className="text-white font-bold text-lg">Apply for the free port</h4>
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
                  placeholder="Project name — Unity 2022.3 / Unreal 5.4"
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


