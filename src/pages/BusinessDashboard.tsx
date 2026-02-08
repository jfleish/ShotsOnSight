import { useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BusinessDashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="w-10 h-10 text-accent" />
                        <h1 className="text-4xl font-display font-black uppercase tracking-tight">
                            Business Analytics
                        </h1>
                    </div>
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="font-black uppercase"
                    >
                        ← Back
                    </Button>
                </div>

                <div className="bg-card border-2 border-accent/20 rounded-2xl p-12 text-center">
                    <BarChart3 className="w-20 h-20 text-accent  mx-auto mb-6" />
                    <h2 className="text-3xl font-display font-black mb-4">
                        Analytics Dashboard Coming Soon
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Track brand engagement, ad performance, brand share comparison, and ROI metrics in real-time.
                    </p>
                </div>
            </div>
        </div>
    );
}
