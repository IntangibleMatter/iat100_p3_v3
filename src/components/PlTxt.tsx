import { Txt, withDefaults } from "@motion-canvas/2d";
import { colours } from "../defs/theme";
import { SplitTxt } from "./SplitTxt";
import { SplitText } from "./SplitText";

const defaults = {
	fill: colours.c_fg,
	fontFamily: "Plasmatic",
	fontSize: 64,
};

export const PFTxt = withDefaults(Txt, {
	...defaults,
});

export const PFSplitTxt = withDefaults(SplitTxt, {
	...defaults,
});
