"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ClerkProvider as RealClerkProvider,
  Show as RealShow,
  UserButton as RealUserButton,
  SignIn as RealSignIn,
  SignUp as RealSignUp,
  SignInButton as RealSignInButton,
  SignUpButton as RealSignUpButton,
  useUser as useRealUser,
  useAuth as useRealAuth,
} from "@clerk/nextjs";
import { LogIn, LogOut, User as UserIcon, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { isClerkConfigured } from "@/lib/auth/clerkConfig";
import { ClerkRoleBridge, MockRoleBridge } from "@/lib/auth/roleContext";
import { validateSignupEmail } from "@/lib/auth/emailPolicy";
import { isOwnerEmail } from "@/lib/auth/staffPermissions";
import { ClientAccountStore } from "@/lib/store/clientAccountStore";

export { isClerkConfigured };

// ==============================================================================
// MOCK AUTH STATE & CONTEXT FOR LOCAL DEVELOPMENT PREVIEW
// ==============================================================================

interface MockUser {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: "CLIENT" | "ASTROLOGER" | "ADMIN" | "OWNER";
}

interface MockAuthContextType {
  isSignedIn: boolean;
  user: MockUser | null;
  signIn: (email?: string, role?: "CLIENT" | "ASTROLOGER" | "ADMIN" | "OWNER", customName?: string) => void;
  signOut: () => void;
}

const MockAuthContext = createContext<MockAuthContextType>({
  isSignedIn: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const useMockAuth = () => useContext(MockAuthContext);

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    // Check if session is stored in localStorage or cookie
    const stored = localStorage.getItem("aapka_astro_mock_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsSignedIn(true);
        ClientAccountStore.setLoggedIn(true, parsed.email, undefined, parsed.name);
      } catch {
        // ignore parsing error
      }
    }
  }, []);

  const signIn = (
    email: string = "seeker@aapkaastro.com",
    requestedRole?: "CLIENT" | "ASTROLOGER" | "ADMIN" | "OWNER",
    customName?: string
  ) => {
    const isOwner = isOwnerEmail(email);
    // Anti-tamper: if a non-owner attempts to self-assign OWNER, downgrade to CLIENT
    const safeRequested = requestedRole === "OWNER" && !isOwner ? "CLIENT" : requestedRole;
    const determinedRole: "CLIENT" | "ASTROLOGER" | "ADMIN" | "OWNER" =
      isOwner
        ? "OWNER"
        : safeRequested ||
          (email.includes("admin") ? "ADMIN" : email.includes("astrologer") || email.includes("acharya") ? "ASTROLOGER" : "CLIENT");

    const emailPrefix = email.split("@")[0].replace(/[._-]/g, " ");
    const capitalizedName = emailPrefix
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    const resolvedName =
      customName?.trim() ||
      (isOwner
        ? "Anmol Garg (Owner)"
        : determinedRole === "ASTROLOGER"
        ? "Acharya Ji"
        : determinedRole === "ADMIN"
        ? "Platform Admin"
        : capitalizedName || "Seeker");

    const mockUserData: MockUser = {
      id: isOwner
        ? "usr_owner_001"
        : determinedRole === "ASTROLOGER"
        ? "usr_astrologer_001"
        : determinedRole === "ADMIN"
        ? "usr_admin_001"
        : "usr_" + Math.random().toString(36).substring(2, 9),
      name: resolvedName,
      email: email,
      role: determinedRole,
    };

    setUser(mockUserData);
    setIsSignedIn(true);
    ClientAccountStore.setLoggedIn(true, email, undefined, resolvedName);
    localStorage.setItem("aapka_astro_mock_user", JSON.stringify(mockUserData));
    document.cookie = "aapka_astro_session=active; path=/; max-age=86400";
    document.cookie = `aapka_astro_role=${determinedRole}; path=/; max-age=86400`;
    document.cookie = `aapka_astro_email=${encodeURIComponent(email)}; path=/; max-age=86400`;
    document.cookie = `aapka_astro_mock_user=${encodeURIComponent(JSON.stringify(mockUserData))}; path=/; max-age=86400`;
    document.cookie = "aapka_astro_dev_preview=true; path=/; max-age=86400";
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    ClientAccountStore.setLoggedIn(false, "", undefined, "Seeker");
    localStorage.removeItem("aapka_astro_mock_user");
    document.cookie = "aapka_astro_session=; path=/; max-age=0";
    document.cookie = "aapka_astro_role=; path=/; max-age=0";
    document.cookie = "aapka_astro_email=; path=/; max-age=0";
    document.cookie = "aapka_astro_mock_user=; path=/; max-age=0";
  };

  return (
    <MockAuthContext.Provider value={{ isSignedIn, user, signIn, signOut }}>
      {children}
    </MockAuthContext.Provider>
  );
};

// ==============================================================================
// ADAPTIVE CLERK PROVIDER
// ==============================================================================

export const AstroClerkProvider: React.FC<{
  children: React.ReactNode;
  publishableKey?: string;
  domain?: string;
  isSatellite?: boolean;
  signInUrl?: string;
  signUpUrl?: string;
  signInForceRedirectUrl?: string;
  signUpForceRedirectUrl?: string;
  appearance?: any;
}> = (props) => {
  const active = isClerkConfigured();

  if (active) {
    return (
      <RealClerkProvider {...props}>
        <ClerkRoleBridge>{props.children}</ClerkRoleBridge>
      </RealClerkProvider>
    );
  }

  return (
    <MockAuthProvider>
      <MockRoleBridge>{props.children}</MockRoleBridge>
    </MockAuthProvider>
  );
};

// ==============================================================================
// ADAPTIVE SHOW COMPONENT
// ==============================================================================

export const Show: React.FC<{
  when: "signed-in" | "signed-out";
  children: React.ReactNode;
}> = ({ when, children }) => {
  const active = isClerkConfigured();

  if (active) {
    return <RealShow when={when}>{children}</RealShow>;
  }

  return <MockShow when={when}>{children}</MockShow>;
};

const MockShow: React.FC<{
  when: "signed-in" | "signed-out";
  children: React.ReactNode;
}> = ({ when, children }) => {
  const { isSignedIn } = useMockAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render signed-out by default during SSR to avoid hydration mismatch
    return when === "signed-out" ? <>{children}</> : null;
  }

  if (when === "signed-in" && isSignedIn) {
    return <>{children}</>;
  }

  if (when === "signed-out" && !isSignedIn) {
    return <>{children}</>;
  }

  return null;
};

// ==============================================================================
// ADAPTIVE SIGN IN & SIGN UP BUTTONS
// ==============================================================================

export const SignInButton: React.FC<{
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  forceRedirectUrl?: string;
  fallbackRedirectUrl?: string;
  signUpForceRedirectUrl?: string;
  signUpFallbackRedirectUrl?: string;
}> = (props) => {
  const active = isClerkConfigured();
  if (active) {
    return <RealSignInButton {...props} />;
  }

  if (props.children) {
    return (
      <Link href="/login" className="inline-flex">
        {props.children}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#7B2D26] bg-transparent px-3 py-1.5 text-xs font-bold text-[#7B2D26] hover:bg-[#7B2D26]/10 transition-all cursor-pointer"
    >
      <LogIn className="h-3.5 w-3.5" />
      <span>Sign In</span>
    </Link>
  );
};

export const SignUpButton: React.FC<{
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  forceRedirectUrl?: string;
  fallbackRedirectUrl?: string;
  signInForceRedirectUrl?: string;
  signInFallbackRedirectUrl?: string;
}> = (props) => {
  const active = isClerkConfigured();
  if (active) {
    return <RealSignUpButton {...props} />;
  }

  if (props.children) {
    return (
      <Link href="/signup" className="inline-flex">
        {props.children}
      </Link>
    );
  }

  return (
    <Link
      href="/signup"
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#7B2D26] bg-[#7B2D26] px-3 py-1.5 text-xs font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all shadow-xs cursor-pointer"
    >
      <Sparkles className="h-3.5 w-3.5 text-[#E8A33D]" />
      <span>Sign Up</span>
    </Link>
  );
};

// ==============================================================================
// ADAPTIVE USER BUTTON
// ==============================================================================

export const UserButton: React.FC<{ appearance?: any }> = (props) => {
  const active = isClerkConfigured();

  if (active) {
    return <RealUserButton {...props} />;
  }

  return <MockUserButton />;
};

const MockUserButton: React.FC = () => {
  const { user, signOut } = useMockAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D8C3] bg-[#7B2D26] text-[#FBF3E7] text-xs font-bold shadow-xs hover:opacity-90"
        title={user?.name || "Account Profile"}
      >
        {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] py-2 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-2 border-b border-[#E8D8C3]/50">
            <p className="text-xs font-bold text-[#7B2D26] truncate">{user?.name || "Seeker"}</p>
            <p className="text-[10px] text-[#6E5545] truncate">{user?.email || ""}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#3B2A1E] hover:bg-[#FBF3E7]"
          >
            <UserIcon className="h-3.5 w-3.5 text-[#C1662F]" />
            <span>My Account</span>
          </Link>
          {(user?.role === "ASTROLOGER" || user?.role === "ADMIN") && (
            <Link
              href="/dashboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#7B2D26] hover:bg-[#FBF3E7]"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Operator Cockpit</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              signOut();
              setDropdownOpen(false);
              router.push("/");
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-700 hover:bg-red-50 text-left"
          >
            <LogOut className="h-3.5 w-3.5 text-red-600" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// ADAPTIVE USE USER HOOK
// ==============================================================================

export const useUser = () => {
  const active = isClerkConfigured();
  if (active) {
    return useRealUser();
  }
  const { user, isSignedIn } = useMockAuth();
  return {
    isLoaded: true,
    isSignedIn,
    user: user
      ? {
          id: user.id,
          fullName: user.name,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ").slice(1).join(" "),
          imageUrl: user.imageUrl,
          primaryEmailAddress: { emailAddress: user.email },
          username: user.email.split("@")[0],
          createdAt: new Date(),
        }
      : null,
  };
};

// ==============================================================================
// ADAPTIVE SIGN IN COMPONENT
// ==============================================================================

export const SignIn: React.FC<any> = (props) => {
  const active = isClerkConfigured();

  if (active) {
    return <RealSignIn {...props} />;
  }

  return <MockSignInForm />;
};

const MockSignInForm: React.FC = () => {
  const { signIn } = useMockAuth();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    const enteredEmail = window.prompt("Enter your Google Account email to sign in:", "user@gmail.com");
    if (!enteredEmail || !enteredEmail.includes("@")) return;
    signIn(enteredEmail.trim());
    router.push("/account");
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    // Validate email according to active anti-abuse signup policy
    const validation = validateSignupEmail(emailInput);
    if (!validation.isValid) {
      setErrorMessage(validation.reason || "Invalid email address.");
      return;
    }

    setErrorMessage(null);
    signIn(emailInput);
    router.push("/account");
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-xl">
      {/* Dev Mode Banner */}
      <div className="mb-6 rounded-xl border border-[#E8A33D]/60 bg-[#FBF3E7] p-3 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#7B2D26]">
          <Sparkles className="h-4 w-4 text-[#E8A33D]" />
          <span>Local Development Preview Mode</span>
        </div>
        <p className="mt-1 text-[11px] text-[#6E5545] leading-snug">
          Full Clerk authentication activates automatically once real keys from{" "}
          <span className="font-mono font-bold">dashboard.clerk.com</span> are placed in{" "}
          <span className="font-mono font-bold">.env.local</span>.
        </p>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-temple text-2xl font-bold text-[#7B2D26]">Welcome to Aapka Astro</h2>
        <p className="text-xs text-[#6E5545] mt-1">Sign in with Google or Email</p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 flex items-start gap-2.5 text-xs text-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-red-900">Email Restricted</p>
            <p className="text-[11px] leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#E8D8C3] bg-white py-2.5 px-4 text-xs font-bold text-[#3B2A1E] shadow-2xs hover:bg-[#FBF3E7] transition-all cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8D8C3]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#FFFDF9] px-2 text-[10px] text-[#6E5545]">Or with email</span>
          </div>
        </div>

        {/* Email Sign In */}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-[#7B2D26] mb-1">Email Address</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              required
              className="w-full rounded-lg border border-[#E8D8C3] bg-white px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#7B2D26] py-2.5 px-4 text-xs font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all shadow-xs cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In (Instant Preview Access)</span>
          </button>
        </form>
      </div>
    </div>
  );
};

const MockSignUpForm: React.FC = () => {
  const { signIn } = useMockAuth();
  const router = useRouter();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignup = () => {
    const enteredEmail = window.prompt("Enter your Google Account email to create account:", "user@gmail.com");
    if (!enteredEmail || !enteredEmail.includes("@")) return;
    const derived = enteredEmail.split("@")[0].replace(/[._-]/g, " ");
    const cap = derived
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
    signIn(enteredEmail.trim(), undefined, cap);
    router.push("/account");
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    // Validate email according to configurable signup policy
    const validation = validateSignupEmail(emailInput);
    if (!validation.isValid) {
      setErrorMessage(validation.reason || "Invalid email address.");
      return;
    }

    setErrorMessage(null);
    const actualName = nameInput.trim() || undefined;
    signIn(emailInput.trim(), undefined, actualName);
    router.push("/account");
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-xl">
      {/* Dev Mode Banner */}
      <div className="mb-6 rounded-xl border border-[#E8A33D]/60 bg-[#FBF3E7] p-3 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#7B2D26]">
          <Sparkles className="h-4 w-4 text-[#E8A33D]" />
          <span>Local Development Preview Mode</span>
        </div>
        <p className="mt-1 text-[11px] text-[#6E5545] leading-snug">
          Clerk Authentication activates automatically once production keys are placed in{" "}
          <span className="font-mono font-bold">.env.local</span>.
        </p>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-temple text-2xl font-bold text-[#7B2D26]">Create Your Account</h2>
        <p className="text-xs text-[#6E5545] mt-1">Get instant access to Kundli charts and consultations</p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50/90 p-3.5 flex items-start gap-2.5 text-xs text-[#7B2D26]">
          <AlertCircle className="h-4 w-4 text-[#C1662F] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[#7B2D26]">Notice Regarding Email Provider</p>
            <p className="text-[11px] text-[#6E5545] leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#E8D8C3] bg-white py-2.5 px-4 text-xs font-bold text-[#3B2A1E] shadow-2xs hover:bg-[#FBF3E7] transition-all cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign up with Google</span>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8D8C3]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#FFFDF9] px-2 text-[10px] text-[#6E5545]">Or with email</span>
          </div>
        </div>

        {/* Email Sign Up Form */}
        <form onSubmit={handleEmailSignup} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-[#7B2D26] mb-1">Your Full Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              className="w-full rounded-lg border border-[#E8D8C3] bg-white px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#7B2D26] mb-1">Email Address</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              required
              className="w-full rounded-lg border border-[#E8D8C3] bg-white px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
              placeholder="you@gmail.com"
            />
            <p className="text-[10px] text-[#6E5545] mt-1">
              Permanent personal email required for Kundli chart delivery (Gmail, Yahoo, Outlook, etc.)
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#7B2D26] py-2.5 px-4 text-xs font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all shadow-xs cursor-pointer mt-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#E8A33D]" />
            <span>Create Account & Continue</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-[#6E5545]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#7B2D26] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// ADAPTIVE SIGN UP COMPONENT
// ==============================================================================

export const SignUp: React.FC<any> = (props) => {
  const active = isClerkConfigured();

  if (active) {
    const defaultLocalization = {
      unstable__errors: {
        form_identifier_not_allowed:
          "This email domain cannot be used for registration. Please use a recognized, permanent email provider (such as Gmail, Yahoo, Outlook, or iCloud) so you can receive your Janam Kundli charts and consultation updates.",
        not_allowed_access:
          "This email address is restricted by registration policy. Please sign up using a permanent email address (such as Gmail, Yahoo, Outlook, or iCloud).",
      },
    };

    const mergedProps = {
      ...props,
      localization: {
        ...defaultLocalization,
        ...(props.localization || {}),
        unstable__errors: {
          ...defaultLocalization.unstable__errors,
          ...(props.localization?.unstable__errors || {}),
        },
      },
    };

    return <RealSignUp {...mergedProps} />;
  }

  return <MockSignUpForm />;
};
