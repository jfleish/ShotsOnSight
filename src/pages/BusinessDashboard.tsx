import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Beer, Target, Zap, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/b2b/MetricCard';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

// Mock Data
const BRAND_SHARE_DATA = [
    { name: 'Bud Light', value: 35, color: '#004A99' },
    { name: 'Coors Light', value: 25, color: '#FFB81C' },
    { name: 'Miller Lite', value: 20, color: '#003087' },
    { name: 'Others', value: 20, color: '#64748b' },
];

const AD_PERFORMANCE_DATA = [
    { name: 'Kickoff', baseline: 40, ad_sync: 65 },
    { name: 'Q1 Break', baseline: 35, ad_sync: 58 },
    { name: 'Halftime', baseline: 45, ad_sync: 82 },
    { name: 'Q3 Break', baseline: 38, ad_sync: 60 },
];

const RECENT_ACTIVITY = [
    { time: '10:42 PM', event: 'Halftime Ad Triggered', impact: '+15% Engagement' },
    { time: '10:38 PM', event: 'New User Spike', impact: '+240 Users' },
    { time: '10:30 PM', event: 'Bud Light Mention', impact: '850 Sips Recorded' },
];

export default function BusinessDashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
                <div className="container mx-auto py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-accent" />
                        <div>
                            <h1 className="text-2xl font-display font-black uppercase tracking-tight">
                                Pulse Analytics
                            </h1>
                            <p className="text-xs text-muted-foreground">Real-time Brand Intelligence</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            LIVE TRACKING
                        </div>
                        <Button
                            onClick={() => navigate('/')}
                            variant="outline"
                            size="sm"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Exit Portal
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto py-8 space-y-8">

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Live Participants"
                        value="12,450"
                        subtext="Active in last 5 mins"
                        icon={Users}
                        trend={{ value: 12, isPositive: true }}
                    />
                    <MetricCard
                        title="Sips Generated"
                        value="45,200"
                        subtext="Since kickoff"
                        icon={Beer}
                        trend={{ value: 8, isPositive: true }}
                    />
                    <MetricCard
                        title="Ad Engagement"
                        value="8.4%"
                        subtext="Click-through rate"
                        icon={Zap}
                        trend={{ value: 2.1, isPositive: true }}
                    />
                    <MetricCard
                        title="ROI Estimate"
                        value="$42.5k"
                        subtext="Brand value generated"
                        icon={Target}
                        trend={{ value: 5, isPositive: true }}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Brand Share */}
                    <Card className="border-accent/20 bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Real-Time Brand Share
                            </CardTitle>
                            <CardDescription>Share of voice among active participants</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={BRAND_SHARE_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {BRAND_SHARE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Ad Lift Analysis */}
                    <Card className="border-accent/20 bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-accent" />
                                Ad-Sync Performance Lift
                            </CardTitle>
                            <CardDescription>Engagement baseline vs. Ad-Sync triggers</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={AD_PERFORMANCE_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="baseline" name="Baseline" fill="#334155" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="ad_sync" name="Ad-Sync Lift" fill="#D3E021" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Live Feed */}
                <Card className="border-border bg-card/50">
                    <CardHeader>
                        <CardTitle>Live Engagement Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {RECENT_ACTIVITY.map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-mono text-muted-foreground">{activity.time}</span>
                                        <span className="font-medium">{activity.event}</span>
                                    </div>
                                    <span className="text-sm font-bold text-green-500">{activity.impact}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
