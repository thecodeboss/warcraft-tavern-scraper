import fs from "fs";

import { stringify } from "csv-stringify/sync";
import fetch from "node-fetch";

import type { Result } from "./interfaces";

const url =
  "https://www.warcrafttavern.com/wotlk/tools/loot/fetch/zone/naxxramas%20(25)";

const SPECIAL_ACQUSITIONS = ["Trash Mobs", "Four Horsemen Chest"];

(async () => {
  const result = await fetch(url);
  const { data: rawItems } = (await result.json()) as Result;

  const items = rawItems.map((item) => {
    const itemName = item.name.replace("\\", "");
    const Boss = SPECIAL_ACQUSITIONS.includes(item.acquisitionName)
      ? item.acquisitionName
      : `=HYPERLINK("https://www.wowhead.com/wotlk/npc=${item.acquisitionLink}", "${item.acquisitionName}")`;
    return {
      Item: `=HYPERLINK("https://www.wowhead.com/wotlk/item=${item.itemId}", "${itemName}")`,
      Boss,
      Slot: item.itemSlot,
      Type: item.itemType,
      "Drop Chance": item.dropChance,
      "Class Roles": item.ClassRoles,
      "Primary Classes": item.PrimaryClasses,
      "Secondary Classes": item.SecondaryClasses,
    };
  });

  const output = stringify(items, {
    header: true,
  });

  fs.writeFileSync("output.csv", output);
})();
