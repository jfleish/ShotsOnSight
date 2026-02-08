import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BarChart3, Users, Beer, Target, Zap, ArrowLeft, TrendingUp, CheckCircle } from 'lucide-react';
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

interface AlertConfirmation {
    playerName: string;
    alertType: string;
    brand: string;
    confirmedAt: string;
}

interface DashboardData {
    totalParticipants: number;
    totalDrinks: number;
    totalSips: number;
    totalShots: number;
    totalShotguns: number;
    totalConfirmedAlerts: number;
    roiEstimate: number;
    brandShareData: Array<{ name: string; value: number; color: string }>;
    recentActivity: Array<{ time: string; event: string; impact: string }>;
    confirmedAlerts: AlertConfirmation[];
    activeSessions: number;
}

const AD_PERFORMANCE_DATA = [
    { name: 'Kickoff', baseline: 40, ad_sync: 65 },
    { name: 'Q1 Break', baseline: 35, ad_sync: 58 },
    { name: 'Halftime', baseline: 45, ad_sync: 82 },
    { name: 'Q3 Break', baseline: 38, ad_sync: 60 },
];

const FALLBACK_BRAND_DATA = [
    { name: 'No Data', value: 1, color: '#64748b' },
];

export default function BusinessDashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch('/api/analytics/dashboard');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard:', error);
            }
        };

        fetchDashboard();
        const interval = setInterval(fetchDashboard, 5000);
        return () => clearInterval(interval);
    }, []);

    const brandShareData = data?.brandShareData?.length ? data.brandShareData : FALLBACK_BRAND_DATA;
    const recentActivity = data?.recentActivity || [];

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
                        value={data ? data.totalParticipants.toLocaleString() : '—'}
                        subtext={`${data?.activeSessions || 0} active sessions`}
                        icon={Users}
                        trend={{ value: 12, isPositive: true }}
                    />
                    <MetricCard
                        title="Total Drinks"
                        value={data ? data.totalDrinks.toLocaleString() : '—'}
                        subtext={`${data?.totalSips || 0} sips · ${data?.totalShots || 0} shots · ${data?.totalShotguns || 0} shotguns`}
                        icon={Beer}
                        trend={{ value: 8, isPositive: true }}
                    />
                    <MetricCard
                        title="Confirmed Engagements"
                        value={data ? (data.totalConfirmedAlerts ?? 0).toLocaleString() : '—'}
                        subtext="User-confirmed drink alerts"
                        icon={CheckCircle}
                        trend={{ value: 2.1, isPositive: true }}
                    />
                    <MetricCard
                        title="ROI Estimate"
                        value={data ? `$${(data.roiEstimate / 1000).toFixed(1)}k` : '—'}
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
                                        data={brandShareData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {brandShareData.map((entry, index) => (
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

                {/* Confirmed Alerts Feed */}
                <Card className="border-green-500/20 bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Live Alert Confirmations
                        </CardTitle>
                        <CardDescription>Real-time user confirmations of drink alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {(data?.confirmedAlerts || []).length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No confirmations yet. Waiting for users to confirm alerts.</p>
                            ) : (
                                (data?.confirmedAlerts || []).map((conf, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                            <div>
                                                <span className="font-medium">{conf.playerName}</span>
                                                <span className="text-muted-foreground mx-2">confirmed</span>
                                                <span className={`font-bold uppercase text-xs px-2 py-0.5 rounded ${
                                                    conf.alertType === 'shot' ? 'bg-primary/20 text-primary' :
                                                    conf.alertType === 'shotgun' ? 'bg-accent/20 text-accent' :
                                                    'bg-secondary/20 text-secondary-foreground'
                                                }`}>{conf.alertType}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-muted-foreground font-mono">{conf.confirmedAt}</span>
                                            {conf.brand && (
                                                <p className="text-xs text-accent font-bold">{conf.brand}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Live Feed */}
                <Card className="border-border bg-card/50">
                    <CardHeader>
                        <CardTitle>Live Engagement Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No activity yet. Start a game to see live data.</p>
                            ) : (
                                recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-mono text-muted-foreground">{activity.time}</span>
                                            <span className="font-medium">{activity.event}</span>
                                        </div>
                                        <span className="text-sm font-bold text-green-500">{activity.impact}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
