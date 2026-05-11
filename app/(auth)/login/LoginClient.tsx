"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

import { loginUser } from "@/lib/auth";
import { MetaWordmarkIcon } from "@/components/atoms/InstagramIcons";

const instagramLogo =
  "https://static.cdninstagram.com/rsrc.php/yO/r/Ny6hrBVLYjl.webp";

const heroImage =
  "https://static.cdninstagram.com/rsrc.php/yR/r/92ZsVHNkyvf.webp";

const footerLinks = [
  { label: "Meta", href: "https://about.meta.com/" },
  { label: "About", href: "https://about.instagram.com/" },
  { label: "Blog", href: "https://about.instagram.com/blog/" },
  { label: "Jobs", href: "https://www.metacareers.com/" },
  { label: "Help", href: "https://help.instagram.com/" },
  {
    label: "API",
    href: "https://developers.facebook.com/docs/instagram-platform/",
  },
  { label: "Privacy", href: "https://privacycenter.instagram.com/policy/" },
  { label: "Terms", href: "https://help.instagram.com/581066165581870/" },
  { label: "Locations", href: "https://www.instagram.com/explore/locations/" },
  { label: "Popular", href: "https://www.instagram.com/directory/profiles/" },
  {
    label: "Instagram Lite",
    href: "https://play.google.com/store/apps/details?id=com.instagram.lite",
  },
  { label: "Meta AI", href: "https://www.meta.ai/" },
  { label: "Threads", href: "https://www.threads.com/" },
  {
    label: "Contact Uploading & Non-Users",
    href: "https://www.facebook.com/help/instagram/261704639352628",
  },
  { label: "Meta Verified", href: "https://www.meta.com/meta-verified/" },
];

export default function LoginClient() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!identifier || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await loginUser({
        identifier,
        password,
      });

      router.push("/feed");
    } catch (err) {
      console.error(err);

      if (err instanceof Error && err.message === "user-not-found") {
        setError("No account found with that username or email.");
      } else {
        setError("Invalid username, email, or password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0c1014] text-white">
      <section className="flex min-h-[calc(100vh-105px)] flex-1">
        <div className="relative hidden flex-1 border-r border-[#34383e] px-16 py-12 lg:block">
          <img
            src={instagramLogo}
            alt="Instagram"
            className="absolute left-16 top-12 h-16 w-16 object-contain"
          />

          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="mb-16 max-w-[720px] text-center text-[52px] font-semibold leading-tight tracking-[-0.04em] text-white">
              See everyday moments from your{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                close friends
              </span>
              .
            </h1>

            <img
              src={heroImage}
              alt="Instagram preview"
              className="w-full max-w-[520px] object-contain"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-[610px]">
          <div className="w-full max-w-[450px]">
            <h2 className="mb-6 text-[17px] font-semibold">
              Log into Instagram
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Mobile number, username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="h-[54px] rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-white outline-none transition placeholder:text-[#b9bdc3] focus:border-[#777b84]"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[54px] rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-white outline-none transition placeholder:text-[#b9bdc3] focus:border-[#777b84]"
              />

              {error && (
                <p className="pt-1 text-center text-sm text-red-400">{error}</p>
              )}

              <button
                disabled={loading}
                className="mt-4 h-[44px] rounded-xl bg-[#0f4d91] text-[15px] font-semibold text-white transition hover:bg-[#1769c2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <button className="mx-auto mt-6 block text-[14px] font-semibold text-white">
              Forgot password?
            </button>

            <div className="mt-16 flex flex-col gap-3">
              <button className="flex h-[42px] items-center justify-center gap-2 rounded-full border border-[#555961] text-[14px] font-semibold transition hover:bg-[#26282c]">
                <FaFacebook
                  size={16}
                  className="fill-[#0095f6] text-[#0095f6]"
                />
                Log in with Facebook
              </button>

              <Link
                href="/register"
                className="flex h-[42px] items-center justify-center rounded-full border border-[#0095f6] text-[14px] font-semibold text-[#0095f6] transition hover:bg-[#13283a]"
              >
                Create new account
              </Link>
            </div>

            <div className="mt-7 flex justify-center text-[#dee3e9]">
              <MetaWordmarkIcon width={74} height={18} />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#34383e] px-6 py-6 text-center text-[12px] text-[#b8bcc3]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <span>English</span>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </main>
  );
}
