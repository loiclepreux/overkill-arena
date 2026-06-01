export type MedalType = "BRONZE" | "SILVER" | "GOLD";

export type PlayerTitle =
    | "Rookie"
    | "Challenger"
    | "Rubis"
    | "Diamond"
    | "Prestige"
    | "Master"
    | "Legend"
    | "Overkill";

export type PlayerRewards = {
    bronzeMedals: number;
    silverMedals: number;
    goldMedals: number;

    bronzeCups: number;
    silverCups: number;
    goldCups: number;

    currentTitle: PlayerTitle;
    nextTitle: PlayerTitle;
    cupsToNextTitle: number;
    requiredCupsForNextTitle: number;
};
