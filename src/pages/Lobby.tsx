import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beer, Trophy, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEAMS, FULL_ROSTERS } from '@/data/demoGame';
import { cn } from '@/lib/utils';

const BEER_BRANDS = [
    { name: 'Bud Light', color: '#004A99' },
    { name: 'Coors Light', color: '#FFB81C' },
    { name: 'Miller Lite', color: '#003087' },
    { name: 'Budweiser', color: '#C8102E' },
    { name: 'Michelob Ultra', color: '#00A3E0' },
    { name: 'Corona', color: '#F7DC6F' },
];

export default function Lobby() {
    const navigate = useNavigate();
    const [step, setStep] = useState<'waiting' | 'brand' | 'team' | 'focus' | 'ready'>('waiting');
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<'home' | 'away' | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    const handleBrandSelect = (brand: string) => {
        setSelectedBrand(brand);
        setStep('team');
    };

    const handleTeamSelect = (team: 'home' | 'away') => {
        setSelectedTeam(team);
        setStep('focus');
    };

    const togglePlayer = (playerName: string) => {
        if (selectedPlayers.includes(playerName)) {
            setSelectedPlayers(selectedPlayers.filter(p => p !== playerName));
        } else if (selectedPlayers.length < 3) {
            setSelectedPlayers([...selectedPlayers, playerName]);
        }
    };

    const handleFocusConfirm = () => {
        setStep('ready');
    };

    const handleStartGame = () => {
        // TODO: Pass selections to game via state/context
        navigate('/app');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {['waiting', 'brand', 'team', 'focus', 'ready'].map((s, idx) => (
                        <div
                            key={s}
                            className={cn(
                                "h-2 rounded-full transition-all",
                                step === s ? "w-12 bg-primary" :
                                    ['waiting', 'brand', 'team', 'focus', 'ready'].indexOf(step) > idx ? "w-8 bg-primary/50" : "w-8 bg-muted"
                            )}
                        />
                    ))}
                </div>

                {/* Waiting Step */}
                {step === 'waiting' && (
                    <div className="text-center animate-fade-in">
                        <Users className="w-20 h-20 text-primary mx-auto mb-6 animate-pulse" />
                        <h1 className="text-5xl font-display font-black mb-4 uppercase tracking-tight">
                            Waiting Room
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Get ready for Super Bowl LIX!
                        </p>
                        <Button
                            onClick={() => setStep('brand')}
                            className="bg-primary hover:bg-primary/90 font-black uppercase tracking-wider px-12 h-14"
                        >
                            Start Setup
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}

                {/* Brand Selection */}
                {step === 'brand' && (
                    <div className="animate-slide-up">
                        <div className="text-center mb-8">
                            <Beer className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h2 className="text-4xl font-display font-black mb-2 uppercase tracking-tight">
                                Choose Your Beer
                            </h2>
                            <p className="text-muted-foreground">
                                Select your preferred beer brand
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {BEER_BRANDS.map((brand) => (
                                <button
                                    key={brand.name}
                                    onClick={() => handleBrandSelect(brand.name)}
                                    className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-card hover:bg-card/80 transition-all hover:scale-105 active:scale-95"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: brand.color }}
                                    >
                                        <Beer className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="font-black text-center uppercase text-sm tracking-wider">
                                        {brand.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Selection */}
                {step === 'team' && (
                    <div className="animate-slide-up">
                        <div className="text-center mb-8">
                            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
                            <h2 className="text-4xl font-display font-black mb-2 uppercase tracking-tight">
                                Choose Your Team
                            </h2>
                            <p className="text-muted-foreground">
                                Which team are you rooting for?
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <button
                                onClick={() => handleTeamSelect('home')}
                                className="group relative p-8 rounded-2xl border-2 border-border hover:border-primary bg-card transition-all hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <img
                                        src={TEAMS.home.logo}
                                        alt={TEAMS.home.name}
                                        className="w-24 h-24 mx-auto mb-4 object-contain"
                                    />
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                                        {TEAMS.home.city}
                                    </p>
                                    <p className="text-2xl font-black uppercase tracking-tight">
                                        {TEAMS.home.name}
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleTeamSelect('away')}
                                className="group relative p-8 rounded-2xl border-2 border-border hover:border-accent bg-card transition-all hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <img
                                        src={TEAMS.away.logo}
                                        alt={TEAMS.away.name}
                                        className="w-24 h-24 mx-auto mb-4 object-contain"
                                    />
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                                        {TEAMS.away.city}
                                    </p>
                                    <p className="text-2xl font-black uppercase tracking-tight">
                                        {TEAMS.away.name}
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Player Focus */}
                {step === 'focus' && selectedTeam && (
                    <div className="animate-slide-up">
                        <div className="text-center mb-6">
                            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h2 className="text-4xl font-display font-black mb-2 uppercase tracking-tight">
                                Focus on Players
                            </h2>
                            <p className="text-muted-foreground mb-2">
                                Select up to 3 players to get extra alerts
                            </p>
                            <p className="text-sm text-accent font-bold">
                                {selectedPlayers.length}/3 selected
                            </p>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2 flex items-center gap-2">
                                    <Trophy className="w-3 h-3" />
                                    {TEAMS[selectedTeam].name} Key Players
                                </div>
                                {FULL_ROSTERS[selectedTeam].map((player: any) => (
                                    <button
                                        key={player.name}
                                        onClick={() => togglePlayer(player.name)}
                                        disabled={selectedPlayers.length >= 3 && !selectedPlayers.includes(player.name)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all",
                                            selectedPlayers.includes(player.name)
                                                ? "bg-primary/20 border-primary"
                                                : "bg-black/40 border-white/10 hover:border-white/30",
                                            selectedPlayers.length >= 3 && !selectedPlayers.includes(player.name) && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-black">
                                                #{player.number}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold">{player.name}</p>
                                                <p className="text-xs text-muted-foreground">{player.position}</p>
                                            </div>
                                        </div>
                                        {selectedPlayers.includes(player.name) && (
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        )}
                                    </button>
                                ))}

                                {/* Ads Only Option */}
                                <button
                                    onClick={() => {
                                        setSelectedPlayers(['Ads Only']);
                                        setStep('ready');
                                    }}
                                    className="p-4 rounded-xl border border-dashed border-white/20 hover:border-primary/50 text-center transition-all bg-white/5 group mt-4"
                                >
                                    <span className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary">
                                        Skip to Ads Focus Only
                                    </span>
                                </button>
                            </div>
                        </div>

                        <Button
                            onClick={handleFocusConfirm}
                            disabled={selectedPlayers.length === 0}
                            className="w-full mt-6 bg-primary hover:bg-primary/90 font-black uppercase tracking-wider h-12"
                        >
                            Confirm Selection
                            <CheckCircle2 className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}

                {/* Ready Step */}
                {step === 'ready' && (
                    <div className="text-center animate-fade-in">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-5xl font-display font-black mb-4 uppercase tracking-tight">
                            You're All Set!
                        </h2>

                        <div className="bg-card border-2 border-border rounded-2xl p-6 mb-8 text-left">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Beer Brand:</span>
                                    <span className="font-black">{selectedBrand}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Team:</span>
                                    <span className="font-black">{selectedTeam && TEAMS[selectedTeam].name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Focus:</span>
                                    <span className="font-black text-sm">
                                        {selectedPlayers[0] === 'Ads Only' ? 'Ads Only' : `${selectedPlayers.length} players`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleStartGame}
                            className="w-full bg-accent hover:bg-accent/90 text-black font-black uppercase tracking-wider h-14 text-lg"
                        >
                            Start Game →
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
