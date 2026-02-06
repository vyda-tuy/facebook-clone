"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthMonth: "",
        birthDay: "",
        birthYear: "",
        gender: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate signup
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Demo: Accept any valid form
        if (formData.firstName && formData.lastName && formData.email && formData.password) {
            router.push("/");
        } else {
            setError("Please fill in all required fields");
        }

        setIsLoading(false);
    };

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Logo for mobile */}
                <div className="text-center mb-6 lg:hidden">
                    <h1 className="text-4xl font-bold text-primary">facebook</h1>
                </div>

                <Card className="shadow-lg">
                    <CardHeader className="relative pb-4">
                        <Link href="/login" className="absolute right-4 top-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </Link>
                        <CardTitle className="text-2xl">Create a new account</CardTitle>
                        <p className="text-muted-foreground">It&apos;s quick and easy.</p>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6">
                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-4">
                            {/* Name */}
                            <div className="flex gap-3">
                                <Input
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="h-11"
                                    required
                                />
                                <Input
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="h-11"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email address or phone number"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-11"
                                required
                            />

                            {/* Password */}
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="New password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-11 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Birthday */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Birthday</label>
                                <div className="flex gap-2">
                                    <select
                                        name="birthMonth"
                                        value={formData.birthMonth}
                                        onChange={handleChange}
                                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="">Month</option>
                                        {months.map((month, i) => (
                                            <option key={month} value={i + 1}>{month}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="birthDay"
                                        value={formData.birthDay}
                                        onChange={handleChange}
                                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="">Day</option>
                                        {days.map((day) => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="birthYear"
                                        value={formData.birthYear}
                                        onChange={handleChange}
                                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="">Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Gender</label>
                                <div className="flex gap-2">
                                    {["Female", "Male", "Custom"].map((gender) => (
                                        <label
                                            key={gender}
                                            className="flex-1 flex items-center justify-between p-3 rounded-md border border-input cursor-pointer hover:bg-secondary/50"
                                        >
                                            <span className="text-sm">{gender}</span>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={gender.toLowerCase()}
                                                checked={formData.gender === gender.toLowerCase()}
                                                onChange={handleChange}
                                                className="h-4 w-4"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Terms */}
                            <p className="text-xs text-muted-foreground">
                                People who use our service may have uploaded your contact information to Facebook.{" "}
                                <Link href="/help" className="text-primary hover:underline">Learn more</Link>.
                            </p>
                            <p className="text-xs text-muted-foreground">
                                By clicking Sign Up, you agree to our{" "}
                                <Link href="/terms" className="text-primary hover:underline">Terms</Link>,{" "}
                                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
                                <Link href="/cookies" className="text-primary hover:underline">Cookies Policy</Link>.
                            </p>

                            {/* Submit */}
                            <div className="pt-2 text-center">
                                <Button
                                    type="submit"
                                    className="h-11 px-16 text-lg font-semibold bg-green-600 text-white hover:bg-green-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Sign Up"
                                    )}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-primary font-semibold hover:underline">
                                Already have an account?
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
