"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronLeft, CircleHelp } from "lucide-react";

import { registerUser } from "@/lib/auth";

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
  {
    label: "Instagram Lite",
    href: "https://play.google.com/store/apps/details?id=com.instagram.lite",
  },
  {
    label: "Contact Uploading & Non-Users",
    href: "https://www.facebook.com/help/instagram/261704639352628",
  },
  { label: "Meta Verified", href: "https://www.meta.com/meta-verified/" },
];

import { MetaWordmarkIcon } from "@/components/atoms/InstagramIcons";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
const years = Array.from({ length: 90 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

export default function RegisterClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9._]+$/;

    if (!usernameRegex.test(username)) {
      setError(
        "Username can only contain letters, numbers, periods, and underscores.",
      );
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (!email || !password || !displayName || !username) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser({
        email,
        password,
        username,
        displayName,
        birthday: {
          month,
          day,
          year,
        },
      });

      router.push("/feed");
    } catch (err) {
      console.error(err);

      if (err instanceof Error && err.message === "username-taken") {
        setError("That username is already taken.");
      } else {
        setError("Could not create account. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#1f1f22] text-white">
      <section className="flex flex-1 justify-center px-5 py-8">
        <div className="w-full max-w-[470px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 flex h-8 w-8 items-center justify-center rounded-full text-[#d8dbe0] transition hover:bg-[#2a2b2f]"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="mb-3 text-[#dee3e9]">
            <MetaWordmarkIcon width={64} height={16} />
          </div>

          <h1 className="text-[24px] font-bold leading-tight">
            Get started on Instagram
          </h1>

          <p className="mt-1 text-[14px] font-semibold text-[#f1f1f1]">
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-[15px] font-bold">
                Mobile number or email
              </label>

              <input
                type="email"
                placeholder="Mobile number or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[50px] w-full rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-white outline-none placeholder:text-[#a7abb1] focus:border-[#777b84]"
              />

              <p className="mt-2 text-[13px] font-semibold leading-snug text-[#d8dbe0]">
                You may receive notifications from us.{" "}
                <a
                  href="https://help.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0095f6]"
                >
                  Learn why we ask for your contact information
                </a>
              </p>
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-bold">
                Password
              </label>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[50px] w-full rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-white outline-none placeholder:text-[#a7abb1] focus:border-[#777b84]"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-1 text-[15px] font-bold">
                Birthday
                <CircleHelp size={16} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="relative">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="h-[50px] w-full appearance-none rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-[#d8dbe0] outline-none focus:border-[#777b84]"
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#d8dbe0]"
                  />
                </div>

                <div className="relative">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="h-[50px] w-full appearance-none rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-[#d8dbe0] outline-none focus:border-[#777b84]"
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#d8dbe0]"
                  />
                </div>

                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="h-[50px] w-full appearance-none rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-[#d8dbe0] outline-none focus:border-[#777b84]"
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#d8dbe0]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-bold">Name</label>

              <input
                type="text"
                placeholder="Full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-[50px] w-full rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-white outline-none placeholder:text-[#a7abb1] focus:border-[#777b84]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-bold">
                Username
              </label>

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-[50px] w-full rounded-xl border border-[#555961] bg-[#1f1f22] px-4 text-[15px] text-white outline-none placeholder:text-[#a7abb1] focus:border-[#777b84]"
              />
            </div>

            <div className="space-y-3 text-[13px] font-semibold leading-snug text-[#f1f1f1]">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <a
                  href="https://www.facebook.com/help/instagram/261704639352628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0095f6]"
                >
                  Learn more.
                </a>
              </p>

              <p>
                By tapping Submit, you agree to create an account and to
                Instagram&apos;s{" "}
                <a
                  href="https://help.instagram.com/581066165581870/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0095f6]"
                >
                  Terms
                </a>
                ,{" "}
                <a
                  href="https://privacycenter.instagram.com/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0095f6]"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://privacycenter.instagram.com/policies/cookies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0095f6]"
                >
                  Cookies Policy
                </a>
                .
              </p>

              <p>
                The{" "}
                <a
                  href="https://privacycenter.instagram.com/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0095f6]"
                >
                  Privacy Policy
                </a>{" "}
                describes the ways we can use the information we collect when
                you create an account.
              </p>
            </div>

            {error && (
              <p className="text-center text-sm font-semibold text-red-400">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="mt-1 h-[42px] rounded-full bg-[#1877f2] text-[14px] font-bold text-white transition hover:bg-[#2d8cff] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <Link
              href="/login"
              className="flex h-[38px] items-center justify-center rounded-full border border-[#555961] text-[14px] font-bold text-white transition hover:bg-[#2a2b2f]"
            >
              I already have an account
            </Link>
          </form>
        </div>
      </section>

      <footer className="px-6 pb-6 text-center text-[12px] text-[#b8bcc3]">
        <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-x-5 gap-y-2">
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

        <div className="mt-3 flex justify-center gap-4">
          <span>English</span>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </main>
  );
}
