import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const normalizedPhone = () => {
    let p = phone.trim().replace(/\D/g, "");
    if (p.startsWith("0")) p = p.slice(1);
    if (!p.startsWith("251")) p = "251" + p;
    return "+" + p;
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (phone.length < 9) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError(null);

    const phoneNum = normalizedPhone();

    const { error: signInError } = await supabase.auth.signInWithOtp({
      phone: phoneNum,
      options: { channel: "sms" },
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      setStep("otp");
      startCountdown();
      localStorage.setItem("pendingPhone", phoneNum);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;

    setLoading(true);
    setError(null);

    const phoneNum = localStorage.getItem("pendingPhone") || normalizedPhone();

    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: phoneNum,
      token: otp,
      type: "sms",
    });

    if (verifyError) {
      setError(verifyError.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    handleSendOtp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => step === "otp" ? setStep("phone") : navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Phone className="h-6 w-6 text-[#FF3B30]" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {step === "phone" ? "Enter your phone number" : "Verify your code"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {step === "phone"
              ? "We'll send a one-time code via SMS"
              : `Code sent to ${normalizedPhone()}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "phone" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-200">
                  Phone Number
                </Label>
                <div className="flex">
                  <div className="bg-zinc-800 border border-r-0 border-zinc-700 rounded-l-full px-4 flex items-center text-zinc-400 font-medium">
                    +251
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9xxxxxxxx"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 9);
                      setPhone(val);
                      setError(null);
                    }}
                    className="rounded-l-none rounded-r-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 h-12 text-lg"
                    maxLength={9}
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={loading || phone.length < 9}
                className={cn(
                  "w-full h-14 rounded-full text-lg font-bold tracking-wide shadow-lg",
                  "bg-gradient-to-r from-[#FF3B30] to-[#E60023] hover:from-[#FF5257] hover:to-[#FF1744]",
                  "border-2 border-[#FF3B30]/30 hover:border-[#FF3B30]/50 transition-all"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Code"
                )}
              </Button>

              {error && <p className="text-[#FF3B30] text-sm text-center font-medium">{error}</p>}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-zinc-200">Verification Code</Label>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  containerClassName="justify-center gap-3"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-14 w-12 text-2xl bg-zinc-800 border-zinc-700 rounded-xl" />
                    <InputOTPSlot index={1} className="h-14 w-12 text-2xl bg-zinc-800 border-zinc-700 rounded-xl" />
                    <InputOTPSlot index={2} className="h-14 w-12 text-2xl bg-zinc-800 border-zinc-700 rounded-xl" />
                  </InputOTPGroup>
                  <span className="text-zinc-600">-</span>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="h-14 w-12 text-2xl bg-zinc-800 border-zinc-700 rounded-xl" />
                    <InputOTPSlot index={4} className="h-14 w-12 text-2xl bg-zinc-800 border-zinc-700 rounded-xl" />
                    <InputOTPSlot index={5} className="h-14 w-12 text-2xl bg-zinc-800 border-zinc-700 rounded-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className={cn(
                  "w-full h-14 rounded-full text-lg font-bold tracking-wide shadow-lg",
                  "bg-gradient-to-r from-[#FF3B30] to-[#E60023] hover:from-[#FF5257] hover:to-[#FF1744]",
                  "border-2 border-[#FF3B30]/30 hover:border-[#FF3B30]/50 transition-all"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>

              <div className="text-center text-sm text-zinc-400">
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className={cn(
                    "font-medium underline-offset-4 hover:underline",
                    countdown > 0 ? "text-zinc-600 cursor-not-allowed" : "text-[#FF3B30] hover:text-[#FF5257]"
                  )}
                >
                  Resend {countdown > 0 && `(${countdown}s)`}
                </button>
              </div>

              {error && <p className="text-[#FF3B30] text-sm text-center font-medium">{error}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
