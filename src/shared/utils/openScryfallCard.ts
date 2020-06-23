import { DbCardData } from "../../types/Metadata";
import database from "../database";
import { shell } from "electron";
import debugLog from "../debugLog";

export function openScryfallCard(card?: DbCardData | number): void {
  const cardObj = typeof card == "number" ? database.card(card) : card;
  if (cardObj) {
    const { cid, set } = cardObj;
    shell.openExternal(
      "https://scryfall.com/card/" + database.sets[set].scryfall + "/" + cid
    );
  } else {
    // eslint-disable-next-line no-console
    debugLog(`Cant open scryfall card: ${cardObj}`, "error");
  }
}
