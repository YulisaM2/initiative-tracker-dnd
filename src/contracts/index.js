import { z } from "zod";

import "./combat-highlights.contract.js";
import "./character.contract.js";

const CombatHighlightsContract = window.createCombatHighlightsContract(z);
const CharacterContract = window.createCharacterContract(
	z,
	CombatHighlightsContract,
);

export { CombatHighlightsContract, CharacterContract };
