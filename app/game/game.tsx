'use client'
import React, { useState } from "react";
import Popover from "../components/Popover";
import { GameBadge } from "./badge";
import { GameCard, GameCardProps } from "./game-card";
import { GameBanner } from "./game-banner";

export const Game: React.FC = () => {
    const games: GameCardProps[] = [
        {
            title: "Cricket",
            description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/12/74/63/55/1000_F_1274635580_O2epJKyfydnP2ACZ87wvqL9MJOYzJvDk.jpg"

        },
        {
            title: "Football",
            description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/02/97/52/81/1000_F_297528198_uu6DjM2ZqSp5y0nXMeo2WsUFOhlyeHeO.jpg"
        },
        {
            title: "Volleyball", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/01/23/19/87/1000_F_123198705_HHB36SHxNnTspMYX7mXqg9rAGwS5tNB0.jpg"
        },
        {
            title: "Badminton", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/17/38/57/29/1000_F_1738572956_hf08fkYp1EhsvAvbTRu5Lv2CA7eKJu2R.jpg"
        },
        {
            title: "Kho-Kho", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://images.tv9hindi.com/wp-content/uploads/2025/01/kho-kho.jpg"
        },
        {
            title: "Kabaddi", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as1.ftcdn.net/v2/jpg/05/62/89/18/1000_F_562891800_dcIUi1Ovx2PCPWILcidOJEGzLGce5D43.jpg"
        },
        {
            title: "Race 100m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Race 200m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Race 300m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Race 400m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Race 600m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Race 800m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Race 1000m", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/99/10/87/1000_F_99108712_DROOdEegePwfa8Ce6pg74OyQMmJXl3Zp.jpg"
        },
        {
            title: "Long Jump", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/05/15/53/07/1000_F_515530797_iK3svWsACrxQWitcprrOBJg2gKRHfas8.jpg"
        },
        {
            title: "High Jump", description: "A bat-and-ball game played between two teams of eleven players on a field.",
            imageUrl: "https://as2.ftcdn.net/v2/jpg/00/04/32/31/1000_F_4323117_U1Tge2PajBejY67EOMKHOdrJEchlwXVH.jpg"
        },
    ];

    const [selectedGames, setSelectedGames] = useState<string[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [trigger, setTrigger] = useState<HTMLElement | null>(null);

    const handleCheckboxChange = (gameName: string) => {
        setSelectedGames((prev) =>
            prev.includes(gameName)
                ? prev.filter((g) => g !== gameName)
                : [...prev, gameName]
        );
    };

    const filteredGames =
        selectedGames.length === 0
            ? games
            : games.filter((game) => selectedGames.includes(game.title));

    const removeGame = (game: string) => {
        setSelectedGames((prev) => prev.filter((g) => g !== game));
    };

    return (
        <section className="bg-gray-100">
            <GameBanner />
            <div className="max-w-7xl mx-auto py-12 px-4 md:px-5">
                {/* FILTER BAR */}
                <div className="flex justify-between items-center gap-6 pb-4 border-b border-gray-300 mb-8">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="font-semibold">Filter Games:</div>

                        {/* Selected Badges */}
                        <div className="flex flex-wrap gap-2">
                            {selectedGames.map((game) => (
                                <GameBadge key={game} label={game} onRemove={() => removeGame(game)} />
                            ))}
                        </div>
                    </div>

                    {/* Checkbox Dropdown */}
                    <div className="flex flex-nowrap space-x-3">
                        {selectedGames.length > 0 && <button
                            onClick={() => setSelectedGames([])}
                            className="text-blue-600 cursor-pointer hover:text-yellow-500">Reset</button>}
                        <button
                            ref={setTrigger}
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                            className="text-blue-600 rounded px-4 py-2 cursor-pointer border border-indigo-400">
                            Filter
                        </button>
                    </div>


                </div>

                {/* GAME CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredGames.map((game, idx) => (
                        <GameCard key={idx} {...game} />
                    ))}
                </div>
            </div>

            {/* select dropdown  */}
            <Popover
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                triggerElement={trigger}
                direction="left"
                popoverWidth={230}
                customClass="p-2 max-h-64 overflow-auto"
            >
                {games.map((game) => (
                    <label
                        key={game.title}
                        className="flex items-center gap-2 text-sm cursor-pointer px-4 py-3 rounded hover:bg-blue-100"
                    >
                        <input
                            type="checkbox"
                            checked={selectedGames.includes(game.title)}
                            onChange={() => handleCheckboxChange(game.title)}
                        />
                        {game.title}
                    </label>
                ))}
            </Popover>
        </section>
    );
};

