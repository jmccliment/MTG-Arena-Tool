import _ from "lodash";
import matchSorter from "match-sorter";
import { FilterValue, Row } from "react-table";
import { DecksData } from "./types";
import { constants } from "mtgatool-shared";
const { MANA } = constants;

export function deckSearchFilterFn(
  rows: Row<DecksData>[],
  _columnIds: string[],
  filterValue: FilterValue
): Row<DecksData>[] {
  const tokens = (filterValue + "")
    .split(" ")
    .filter((token) => token.length > 2);
  if (tokens.length === 0) {
    return rows;
  }
  const matches = tokens.map((token) =>
    matchSorter(rows, token, {
      keys: [
        "values.name",
        "values.format",
        "values.tags",
        (row: Row<DecksData>): string => {
          const { colors } = row.values;
          return colors?.map((color: number): string => MANA[color]).join(" ");
        },
      ],
    })
  );
  return _.intersection(...matches);
}
