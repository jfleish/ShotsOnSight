import { useNavigate } from 'react-router-dom';
import { Beer, BarChart3, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Beer className="w-12 h-12 text-primary" />
                        <h1 className="text-6xl font-display font-black tracking-tight">
                            SHOTS ON SIGHT
                        </h1>
                        <Sparkles className="w-12 h-12 text-accent" />
                    </div>
                    <p className="text-xl text-muted-foreground font-medium">
                        Pulse: Real-Time Super Bowl Drinking Game
                    </p>
                </div>

                {/* Portal Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Consumer Portal */}
                    <button
                        onClick={() => navigate('/join')}
                        className="group relative bg-card border-2 border-primary/20 rounded-3xl p-8 hover:border-primary transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                <Beer className="w-10 h-10 text-primary" />
                            </div>

                            <h2 className="text-3xl font-display font-black mb-3 uppercase tracking-tight">
                                Consumer Portal
                            </h2>

                            <p className="text-muted-foreground mb-6">
                                Join a live game room and drink whenever your team or favorite players make plays!
                            </p>

                            <div className="flex flex-col gap-2 text-sm text-left">
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-primary" />
                                    <span>Choose your team & players</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Beer className="w-4 h-4 text-primary" />
                                    <span>Select your beer brand</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span>Get real-time drink alerts</span>
                                </div>
                            </div>

                            <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-wider">
                                Join Game →
                            </Button>
                        </div>
                    </button>

                    {/* Business Portal */}
                    <button
                        onClick={() => navigate('/business')}
                        className="group relative bg-card border-2 border-accent/20 rounded-3xl p-8 hover:border-accent transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-10 h-10 text-accent" />
                            </div>

                            <h2 className="text-3xl font-display font-black mb-3 uppercase tracking-tight">
                                Business Portal
                            </h2>

                            <p className="text-muted-foreground mb-6">
                                Track brand engagement, ad performance, and ROI metrics in real-time.
                            </p>

                            <div className="flex flex-col gap-2 text-sm text-left">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-accent" />
                                    <span>Brand share comparison</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-accent" />
                                    <span>Ad-sync performance</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-accent" />
                                    <span>ROI analytics dashboard</span>
                                </div>
                            </div>

                            <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-black font-black uppercase tracking-wider">
                                View Analytics →
                            </Button>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-sm text-muted-foreground">
                    <p>Super Bowl LIX • Feb 9, 2025 • Chiefs vs Eagles</p>
                </div>
            </div>
        </div>
    );
}
