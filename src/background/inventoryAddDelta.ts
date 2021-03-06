import { reduxAction } from "../shared/redux/sharedRedux";
import globals from "./globals";
import { playerDb } from "../shared/db/LocalDatabase";
import { constants, InventoryDelta } from "mtgatool-shared";

const { IPC_RENDERER, IPC_OVERLAY } = constants;

export default function inventoryAddDelta(
  delta: Partial<InventoryDelta>
): void {
  const economy = { ...globals.store.getState().playerdata.economy };
  economy.gems += delta.gemsDelta ?? 0;
  economy.gold += delta.goldDelta ?? 0;

  economy.vault += delta.vaultProgressDelta ?? 0;
  economy.wcCommon += delta.wcCommonDelta ?? 0;
  economy.wcUncommon += delta.wcUncommonDelta ?? 0;
  economy.wcRare += delta.wcRareDelta ?? 0;
  economy.wcMythic += delta.wcMythicDelta ?? 0;

  if (delta.cardsAdded) {
    reduxAction(
      globals.store.dispatch,
      { type: "ADD_CARDS_LIST", arg: delta.cardsAdded },
      IPC_RENDERER | IPC_OVERLAY
    );
    const cards = globals.store.getState().playerdata.cards;
    playerDb.upsert("", "cards", cards);
  }
  reduxAction(
    globals.store.dispatch,
    { type: "SET_PLAYER_ECONOMY", arg: economy },
    IPC_RENDERER
  );
}
