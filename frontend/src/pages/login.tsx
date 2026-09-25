import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaVenusMars,
  FaArrowRight,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ProtectedRoute from "../components/protected-route";
import { useNavigate } from "../utils/router";

const Login = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mode: "signin" for returning users, "signup" for new registration
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [login] = useLoginMutation();

  // Helper to sync Firebase user with MongoDB backend & Redux store
  const syncUserWithBackend = async (
    firebaseUser: FirebaseUser,
    customDetails?: { name?: string; gender?: string; dob?: string }
  ) => {
    const displayName =
      customDetails?.name ||
      firebaseUser.displayName ||
      firebaseUser.email?.split("@")[0] ||
      "Valued Customer";

    const photoURL =
      firebaseUser.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName
      )}&background=0284c7&color=fff`;

    const userGender = customDetails?.gender || gender || "male";
    const userDob = customDetails?.dob || date || "2000-01-01";

    const payload = {
      name: displayName,
      email: firebaseUser.email || `${firebaseUser.uid}@solutionsystems.com`,
      photo: photoURL,
      gender: userGender,
      role: "user",
      dob: userDob,
      _id: firebaseUser.uid,
    };

    const res = await login(payload);

    if ("data" in res) {
      toast.success(res.data.message || `Welcome, ${displayName}!`);
      try {
        const data = await getUser(firebaseUser.uid);
        if (data?.user) {
          dispatch(userExist(data.user));
        }
      } catch {
        dispatch(
          userExist({
            ...payload,
            _id: firebaseUser.uid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as any)
        );
      }
      navigate("/");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message =
        (error?.data as MessageResponse)?.message ||
        (error as any)?.error ||
        "Sign in failed";
      toast.error(message);
      dispatch(userNotExist());
    }
  };

  // Friendly error handler with guidance for console configuration
  const handleAuthError = (error: any, providerName: string) => {
    console.error(`${providerName} auth error:`, error);
    const code = error?.code;

    if (code === "auth/popup-closed-by-user") {
      return;
    }
    if (code === "auth/operation-not-allowed") {
      toast.error(
        `${providerName} login needs to be enabled in Firebase Console. Please sign in with Email or Google for now.`,
        { duration: 6000 }
      );
      return;
    }
    if (code === "auth/email-already-in-use") {
      toast.error("This email is already registered. Please sign in instead.");
      setAuthMode("signin");
      return;
    }
    if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
      toast.error("Incorrect email or password. Please try again.");
      return;
    }
    if (code === "auth/user-not-found") {
      toast.error("No account found with this email. Please create an account.");
      setAuthMode("signup");
      return;
    }
    if (code === "auth/weak-password") {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    toast.error(error?.message || `${providerName} authentication failed.`);
  };

  // 1. Google 1-Click Popup Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      await syncUserWithBackend(firebaseUser);
    } catch (error: any) {
      handleAuthError(error, "Google");
    } finally {
      setLoading(false);
    }
  };

  // 2. Facebook 1-Click Popup Login
  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      await syncUserWithBackend(firebaseUser);
    } catch (error: any) {
      handleAuthError(error, "Facebook");
    } finally {
      setLoading(false);
    }
  };

  // 3. Twitter (X) 1-Click Popup Login
  const handleTwitterLogin = async () => {
    setLoading(true);
    try {
      const provider = new TwitterAuthProvider();
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      await syncUserWithBackend(firebaseUser);
    } catch (error: any) {
      handleAuthError(error, "Twitter");
    } finally {
      setLoading(false);
    }
  };

  // 4. Email & Password Form Submit (Sign In or Sign Up)
  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      return toast.error("Please enter your email and password");
    }

    if (authMode === "signup") {
      if (!name.trim()) {
        return toast.error("Please enter your full name");
      }
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters long");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }
      if (!gender) {
        return toast.error("Please select your gender");
      }
      if (!date) {
        return toast.error("Please select your date of birth");
      }

      setLoading(true);
      try {
        const { user: newFirebaseUser } =
          await createUserWithEmailAndPassword(auth, email.trim(), password);

        await updateProfile(newFirebaseUser, {
          displayName: name.trim(),
          photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name.trim()
          )}&background=0284c7&color=fff`,
        });

        await syncUserWithBackend(newFirebaseUser, {
          name: name.trim(),
          gender,
          dob: date,
        });
      } catch (error: any) {
        handleAuthError(error, "Email Signup");
      } finally {
        setLoading(false);
      }
    } else {
      // Sign In mode
      setLoading(true);
      try {
        const { user: existingFirebaseUser } =
          await signInWithEmailAndPassword(auth, email.trim(), password);
        await syncUserWithBackend(existingFirebaseUser);
      } catch (error: any) {
        handleAuthError(error, "Email Sign In");
      } finally {
        setLoading(false);
      }
    }
  };

  // 5. Forgot Password Handler
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      return toast.error("Please enter your registered email address");
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      toast.success("Password reset email sent! Please check your inbox.");
      setForgotModalOpen(false);
      setResetEmail("");
    } catch (error: any) {
      handleAuthError(error, "Password Reset");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <ProtectedRoute isAuthenticated={!user} redirect="/">
      <div className="modern-auth-page">
        <div className="auth-card-container">
          {/* Card Header */}
          <div className="auth-card-header">
            <div className="auth-brand-badge">
              <FaShieldAlt className="shield-icon" />
              <span>Solution Systems Secure Portal</span>
            </div>
            <h1 className="auth-main-title">
              {authMode === "signin"
                ? "Welcome Back"
                : "Create Your Free Account"}
            </h1>
            <p className="auth-sub-title">
              {authMode === "signin"
                ? "Sign in to track orders, manage custom PC builds, and request repair services."
                : "Join thousands of gamers, creators, and professionals for hardware deals."}
            </p>
          </div>

          {/* 1-Click Social Logins Grid: Google, Facebook, Twitter */}
          <div className="social-auth-section">
            <span className="social-section-label">Quick 1-Click Sign In:</span>
            <div className="social-buttons-grid">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn-social btn-google"
                disabled={loading}
                title="Sign in with Google"
              >
                <FcGoogle className="social-btn-icon" />
                <span className="social-btn-text">Google</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="btn-social btn-facebook"
                disabled={loading}
                title="Sign in with Facebook"
              >
                <FaFacebook className="social-btn-icon" />
                <span className="social-btn-text">Facebook</span>
              </button>

              {/* Twitter / X */}
              <button
                type="button"
                onClick={handleTwitterLogin}
                className="btn-social btn-twitter"
                disabled={loading}
                title="Sign in with Twitter (X)"
              >
                <FaTwitter className="social-btn-icon" />
                <span className="social-btn-text">Twitter</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="auth-divider-row">
            <span className="divider-line" />
            <span className="divider-label">Or continue with Email</span>
            <span className="divider-line" />
          </div>

          {/* Segmented Auth Mode Switch */}
          <div className="auth-segmented-switch" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={authMode === "signin"}
              className={`segment-btn ${authMode === "signin" ? "active" : ""}`}
              onClick={() => setAuthMode("signin")}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={authMode === "signup"}
              className={`segment-btn ${authMode === "signup" ? "active" : ""}`}
              onClick={() => setAuthMode("signup")}
            >
              Create Account
            </button>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuthSubmit} className="auth-form-body">
            {/* Full Name (Sign Up only) */}
            {authMode === "signup" && (
              <div className="form-group-field">
                <label className="field-label">Full Name</label>
                <div className="input-icon-wrap">
                  <FaUser className="lead-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Suraj Jaiswar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="form-group-field">
              <label className="field-label">Email Address</label>
              <div className="input-icon-wrap">
                <FaEnvelope className="lead-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Gender & DOB (Sign Up only) */}
            {authMode === "signup" && (
              <div className="form-dual-row">
                <div className="form-group-field">
                  <label className="field-label">Gender</label>
                  <div className="input-icon-wrap">
                    <FaVenusMars className="lead-icon" />
                    <select
                      className="form-select"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-field">
                  <label className="field-label">Date of Birth</label>
                  <div className="input-icon-wrap">
                    <FaCalendarAlt className="lead-icon" />
                    <input
                      type="date"
                      className="form-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="form-group-field">
              <div className="label-row-with-action">
                <label className="field-label">Password</label>
                {authMode === "signin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setResetEmail(email);
                      setForgotModalOpen(true);
                    }}
                    className="btn-forgot-password"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="input-icon-wrap">
                <FaLock className="lead-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder={
                    authMode === "signup"
                      ? "Create secure password (min 6 chars)"
                      : "Enter your password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-eye"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {authMode === "signup" && (
              <div className="form-group-field">
                <label className="field-label">Confirm Password</label>
                <div className="input-icon-wrap">
                  <FaLock className="lead-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-auth-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner-text">Processing...</span>
              ) : (
                <>
                  <span>
                    {authMode === "signin"
                      ? "Sign In to Solution Systems"
                      : "Create Free Account"}
                  </span>
                  <FaArrowRight className="submit-arrow" />
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="auth-card-footer">
            <p className="terms-disclaimer">
              By continuing, you agree to Solution Systems{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {forgotModalOpen && (
          <div
            className="forgot-modal-backdrop"
            onClick={() => setForgotModalOpen(false)}
          >
            <div
              className="forgot-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-row">
                <div className="header-title-box">
                  <FaLock className="modal-lock-icon" />
                  <h3>Reset Your Password</h3>
                </div>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setForgotModalOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <p className="modal-instruction">
                Enter your registered email address and we will send you a secure
                link to reset your password.
              </p>

              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="form-group-field">
                  <label className="field-label">Your Email</label>
                  <div className="input-icon-wrap">
                    <FaEnvelope className="lead-icon" />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-actions-row">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modal-send"
                    disabled={resetLoading}
                  >
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Login;
