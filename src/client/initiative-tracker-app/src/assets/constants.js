import Player from "../icons/Theme/Player";
import Hidden from "../icons/Theme/Hidden";
import BassClef from "../icons/Bonus/BassClef";
import Hero from "../icons/Bonus/Hero";

export const MAX_LENGTH_HP = 3;
export const MAX_LENGTH_STAT = 2;
export const DELAY_INPUT_FIRE = 1000; // ms
export const DELAY_SPINNER_TRIGGER = 300;
export const DELAY_CLEAN_SELECTED = 3000;

// Mapping icons to name
export const CONTROLS_ICONS = {
	Player: Player,
	Hidden: Hidden,
};

export const BONUS_ICONS = {
	hasBardicInsp: BassClef,
	hasHeroicInsp: Hero,
};
