"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from "@/lib/validations/auth";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login");

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onLogin = (data: LoginFormData) => {
        console.log("Login:", data);
        // TODO: Implement login logic
    };

    const onRegister = (data: RegisterFormData) => {
        console.log("Register:", data);
        // TODO: Implement register logic
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4 overflow-hidden">
            {/* Decorative background icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Blur circles */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl" />

                {/* Bird icon - top left */}
                <svg className="absolute top-[10%] left-[5%] w-16 h-16 text-amber-300/40 dark:text-amber-700/30 rotate-12" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M64 176C80.6 176 94.2 188.6 95.8 204.7L96.1 211.3C97.8 227.4 111.4 240 128 240L307.1 240L448 300.4L448 544C448 561.7 433.7 576 416 576L384 576C366.3 576 352 561.7 352 544L352 412.7C328 425 300.8 432 272 432C243.2 432 216 425 192 412.7L192 544C192 561.7 177.7 576 160 576L128 576C110.3 576 96 561.7 96 544L96 298.4C58.7 285.2 32 249.8 32 208C32 190.3 46.3 176 64 176zM387.8 32C395.5 32 402.7 35.6 407.4 41.8L424 64L476.1 64C488.8 64 501 69.1 510 78.1L528 96L584 96C597.3 96 608 106.7 608 120L608 144C608 188.2 572.2 224 528 224L464 224L457 252L332.3 198.6L363.9 51.4C366.3 40.1 376.2 32 387.8 32zM480 108C469 108 460 117 460 128C460 139 469 148 480 148C491 148 500 139 500 128C500 117 491 108 480 108z" />
                </svg>

                {/* Cat icon - top right */}
                <svg className="absolute top-[15%] right-[8%] w-20 h-20 text-orange-300/35 dark:text-orange-700/25 -rotate-6" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M96 160C149 160 192 203 192 256L192 341.8C221.7 297.1 269.8 265.6 325.4 257.8C351 317.8 410.6 359.9 480 359.9C490.9 359.9 501.6 358.8 512 356.8L512 544C512 561.7 497.7 576 480 576C462.3 576 448 561.7 448 544L448 403.2L312 512L368 512C385.7 512 400 526.3 400 544C400 561.7 385.7 576 368 576L224 576C171 576 128 533 128 480L128 256C128 239.4 115.4 225.8 99.3 224.2L92.7 223.9C76.6 222.2 64 208.6 64 192C64 174.3 78.3 160 96 160zM565.8 67.2C576.2 58.5 592 65.9 592 79.5L592 192C592 253.9 541.9 304 480 304C418.1 304 368 253.9 368 192L368 79.5C368 65.9 383.8 58.5 394.2 67.2L448 112L512 112L565.8 67.2zM432 172C421 172 412 181 412 192C412 203 421 212 432 212C443 212 452 203 452 192C452 181 443 172 432 172zM528 172C517 172 508 181 508 192C508 203 517 212 528 212C539 212 548 203 548 192C548 181 539 172 528 172z" />
                </svg>

                {/* Fish icon - middle left */}
                <svg className="absolute top-[45%] left-[3%] w-14 h-14 text-amber-400/30 dark:text-amber-600/20 rotate-45" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M212.5 205.5C251.7 172.5 304.6 144 368 144C431.4 144 484.3 172.5 523.5 205.5C562.6 238.5 590.4 277.9 604.5 305.3C609.2 314.5 609.2 325.4 604.5 334.6C590.4 362 562.6 401.4 523.5 434.4C484.3 467.5 431.5 495.9 368 495.9C304.5 495.9 251.7 467.4 212.5 434.4C196.3 420.7 182 405.9 169.8 391.3L80.1 443.6C67.6 450.9 51.7 448.9 41.4 438.7C31.1 428.5 29 412.7 36.1 400.1L82 320L36.2 239.9C29 227.3 31.2 211.5 41.5 201.3C51.8 191.1 67.6 189.1 80.2 196.4L169.9 248.7C182.1 234.1 196.4 219.3 212.6 205.6zM480 320C480 302.3 465.7 288 448 288C430.3 288 416 302.3 416 320C416 337.7 430.3 352 448 352C465.7 352 480 337.7 480 320z" />
                </svg>

                {/* Bone icon - bottom left */}
                <svg className="absolute bottom-[18%] left-[10%] w-24 h-24 text-orange-200/40 dark:text-orange-800/25 -rotate-45" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M197.4 224C193.5 224 190.2 221.2 189.3 217.4C179.1 175.3 141.2 144 96 144C43 144 0 187 0 240C0 269.1 12.9 295.1 33.3 312.7C37.6 316.4 37.6 323.5 33.3 327.2C12.9 344.8 0 370.9 0 399.9C0 452.9 43 495.9 96 495.9C141.2 495.9 179.1 464.6 189.3 422.5C190.2 418.7 193.5 415.9 197.4 415.9L442.5 415.9C446.4 415.9 449.7 418.7 450.6 422.5C460.8 464.6 498.7 495.9 543.9 495.9C596.9 495.9 639.9 452.9 639.9 399.9C639.9 370.8 627 344.8 606.6 327.2C602.3 323.5 602.3 316.4 606.6 312.7C627 295.1 639.9 269 639.9 240C639.9 187 596.9 144 543.9 144C498.7 144 460.8 175.3 450.6 217.4C449.7 221.2 446.4 224 442.5 224L197.4 224z" />
                </svg>

                {/* Bird icon - bottom right */}
                <svg className="absolute bottom-[12%] right-[5%] w-12 h-12 text-amber-300/35 dark:text-amber-700/20 rotate-[-20deg]" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M64 176C80.6 176 94.2 188.6 95.8 204.7L96.1 211.3C97.8 227.4 111.4 240 128 240L307.1 240L448 300.4L448 544C448 561.7 433.7 576 416 576L384 576C366.3 576 352 561.7 352 544L352 412.7C328 425 300.8 432 272 432C243.2 432 216 425 192 412.7L192 544C192 561.7 177.7 576 160 576L128 576C110.3 576 96 561.7 96 544L96 298.4C58.7 285.2 32 249.8 32 208C32 190.3 46.3 176 64 176zM387.8 32C395.5 32 402.7 35.6 407.4 41.8L424 64L476.1 64C488.8 64 501 69.1 510 78.1L528 96L584 96C597.3 96 608 106.7 608 120L608 144C608 188.2 572.2 224 528 224L464 224L457 252L332.3 198.6L363.9 51.4C366.3 40.1 376.2 32 387.8 32zM480 108C469 108 460 117 460 128C460 139 469 148 480 148C491 148 500 139 500 128C500 117 491 108 480 108z" />
                </svg>

                {/* Cat icon - middle right */}
                <svg className="absolute top-[55%] right-[4%] w-18 h-18 text-orange-400/25 dark:text-orange-600/15 rotate-12" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M96 160C149 160 192 203 192 256L192 341.8C221.7 297.1 269.8 265.6 325.4 257.8C351 317.8 410.6 359.9 480 359.9C490.9 359.9 501.6 358.8 512 356.8L512 544C512 561.7 497.7 576 480 576C462.3 576 448 561.7 448 544L448 403.2L312 512L368 512C385.7 512 400 526.3 400 544C400 561.7 385.7 576 368 576L224 576C171 576 128 533 128 480L128 256C128 239.4 115.4 225.8 99.3 224.2L92.7 223.9C76.6 222.2 64 208.6 64 192C64 174.3 78.3 160 96 160zM565.8 67.2C576.2 58.5 592 65.9 592 79.5L592 192C592 253.9 541.9 304 480 304C418.1 304 368 253.9 368 192L368 79.5C368 65.9 383.8 58.5 394.2 67.2L448 112L512 112L565.8 67.2zM432 172C421 172 412 181 412 192C412 203 421 212 432 212C443 212 452 203 452 192C452 181 443 172 432 172zM528 172C517 172 508 181 508 192C508 203 517 212 528 212C539 212 548 203 548 192C548 181 539 172 528 172z" />
                </svg>

                {/* Fish icon - top center */}
                <svg className="absolute top-[5%] left-[40%] w-10 h-10 text-amber-200/35 dark:text-amber-800/20 -rotate-12" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M212.5 205.5C251.7 172.5 304.6 144 368 144C431.4 144 484.3 172.5 523.5 205.5C562.6 238.5 590.4 277.9 604.5 305.3C609.2 314.5 609.2 325.4 604.5 334.6C590.4 362 562.6 401.4 523.5 434.4C484.3 467.5 431.5 495.9 368 495.9C304.5 495.9 251.7 467.4 212.5 434.4C196.3 420.7 182 405.9 169.8 391.3L80.1 443.6C67.6 450.9 51.7 448.9 41.4 438.7C31.1 428.5 29 412.7 36.1 400.1L82 320L36.2 239.9C29 227.3 31.2 211.5 41.5 201.3C51.8 191.1 67.6 189.1 80.2 196.4L169.9 248.7C182.1 234.1 196.4 219.3 212.6 205.6zM480 320C480 302.3 465.7 288 448 288C430.3 288 416 302.3 416 320C416 337.7 430.3 352 448 352C465.7 352 480 337.7 480 320z" />
                </svg>

                {/* Bone icon - bottom center */}
                <svg className="absolute bottom-[5%] left-[55%] w-16 h-16 text-orange-300/30 dark:text-orange-700/20 rotate-30" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M197.4 224C193.5 224 190.2 221.2 189.3 217.4C179.1 175.3 141.2 144 96 144C43 144 0 187 0 240C0 269.1 12.9 295.1 33.3 312.7C37.6 316.4 37.6 323.5 33.3 327.2C12.9 344.8 0 370.9 0 399.9C0 452.9 43 495.9 96 495.9C141.2 495.9 179.1 464.6 189.3 422.5C190.2 418.7 193.5 415.9 197.4 415.9L442.5 415.9C446.4 415.9 449.7 418.7 450.6 422.5C460.8 464.6 498.7 495.9 543.9 495.9C596.9 495.9 639.9 452.9 639.9 399.9C639.9 370.8 627 344.8 606.6 327.2C602.3 323.5 602.3 316.4 606.6 312.7C627 295.1 639.9 269 639.9 240C639.9 187 596.9 144 543.9 144C498.7 144 460.8 175.3 450.6 217.4C449.7 221.2 446.4 224 442.5 224L197.4 224z" />
                </svg>
            </div>

            <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 border-amber-200/50 dark:border-amber-800/30 shadow-2xl">
                <CardHeader className="text-center space-y-2 pb-2">
                    {/* Pet Icon */}
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-2">
                        <svg
                            className="w-10 h-10 text-white"
                            viewBox="0 0 640 640"
                            fill="currentColor"
                        >
                            <path d="M298.5 156.9C312.8 199.8 298.2 243.1 265.9 253.7C233.6 264.3 195.8 238.1 181.5 195.2C167.2 152.3 181.8 109 214.1 98.4C246.4 87.8 284.2 114 298.5 156.9zM164.4 262.6C183.3 295 178.7 332.7 154.2 346.7C129.7 360.7 94.5 345.8 75.7 313.4C56.9 281 61.4 243.3 85.9 229.3C110.4 215.3 145.6 230.2 164.4 262.6zM133.2 465.2C185.6 323.9 278.7 288 320 288C361.3 288 454.4 323.9 506.8 465.2C510.4 474.9 512 485.3 512 495.7L512 497.3C512 523.1 491.1 544 465.3 544C453.8 544 442.4 542.6 431.3 539.8L343.3 517.8C328 514 312 514 296.7 517.8L208.7 539.8C197.6 542.6 186.2 544 174.7 544C148.9 544 128 523.1 128 497.3L128 495.7C128 485.3 129.6 474.9 133.2 465.2zM485.8 346.7C461.3 332.7 456.7 295 475.6 262.6C494.5 230.2 529.6 215.3 554.1 229.3C578.6 243.3 583.2 281 564.3 313.4C545.4 345.8 510.3 360.7 485.8 346.7zM374.1 253.7C341.8 243.1 327.2 199.8 341.5 156.9C355.8 114 393.6 87.8 425.9 98.4C458.2 109 472.8 152.3 458.5 195.2C444.2 238.1 406.4 264.3 374.1 253.7z" />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                        PetShop
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Cuide do seu melhor amigo com carinho
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-amber-100/50 dark:bg-zinc-800/50">
                            <TabsTrigger
                                value="login"
                                className="cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
                            >
                                Entrar
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
                            >
                                Cadastrar
                            </TabsTrigger>
                        </TabsList>

                        {/* Login Form */}
                        <TabsContent value="login" className="space-y-4">
                            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        {...loginForm.register("email")}
                                        className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus:border-amber-500 focus:ring-amber-500/20"
                                    />
                                    {loginForm.formState.errors.email && (
                                        <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Senha</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                        {...loginForm.register("password")}
                                        className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus:border-amber-500 focus:ring-amber-500/20"
                                    />
                                    {loginForm.formState.errors.password && (
                                        <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Entrar
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Register Form */}
                        <TabsContent value="register" className="space-y-4">
                            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="register-name">Nome</Label>
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="Seu nome"
                                        {...registerForm.register("name")}
                                        className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus:border-amber-500 focus:ring-amber-500/20"
                                    />
                                    {registerForm.formState.errors.name && (
                                        <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Email</Label>
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        {...registerForm.register("email")}
                                        className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus:border-amber-500 focus:ring-amber-500/20"
                                    />
                                    {registerForm.formState.errors.email && (
                                        <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Senha</Label>
                                    <Input
                                        id="register-password"
                                        type="password"
                                        placeholder="••••••••"
                                        {...registerForm.register("password")}
                                        className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus:border-amber-500 focus:ring-amber-500/20"
                                    />
                                    {registerForm.formState.errors.password && (
                                        <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                                    <Input
                                        id="register-confirm-password"
                                        type="password"
                                        placeholder="••••••••"
                                        {...registerForm.register("confirmPassword")}
                                        className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus:border-amber-500 focus:ring-amber-500/20"
                                    />
                                    {registerForm.formState.errors.confirmPassword && (
                                        <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Criar Conta
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
