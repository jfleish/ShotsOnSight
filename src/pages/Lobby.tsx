import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Lobby() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-5xl font-display font-black mb-4">LOBBY</h1>
                <p className="text-muted-foreground mb-8">
                    Multi-step setup coming soon: Brand → Team → Focus → Ready
                </p>
                <Button
                    onClick={() => navigate('/app')}
                    className="bg-primary hover:bg-primary/90 font-black uppercase"
                >
                    Skip to Game →
                </Button>
            </div>
        </div>
    );
}
