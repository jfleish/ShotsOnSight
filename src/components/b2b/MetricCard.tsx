import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function MetricCard({ title, value, subtext, icon: Icon, trend }: MetricCardProps) {
    return (
        <Card className="bg-card/50 backdrop-blur border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-display">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
                {trend && (
                    <div className={`text-xs mt-2 font-bold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}% vs last hour
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
