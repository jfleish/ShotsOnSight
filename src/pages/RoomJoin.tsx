import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RoomJoin() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');

    const handleJoin = () => {
        if (roomCode.length === 6) {
            navigate('/lobby');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-display font-black mb-2 uppercase tracking-tight">
                        Join Game Room
                    </h1>
                    <p className="text-muted-foreground">
                        Enter the 6-digit room code to join
                    </p>
                </div>

                <div className="bg-card border-2 border-border rounded-2xl p-8">
                    <Input
                        type="text"
                        maxLength={6}
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        className="text-center text-3xl font-black tracking-widest mb-6 h-16"
                    />

                    <Button
                        onClick={handleJoin}
                        disabled={roomCode.length !== 6}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-wider h-14"
                    >
                        Join Room
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="text-sm text-muted-foreground hover:text-foreground mt-6 w-full text-center"
                >
                    ← Back to home
                </button>
            </div>
        </div>
    );
}
