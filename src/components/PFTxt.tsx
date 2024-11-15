import { Txt, withDefaults } from "@motion-canvas/2d";
import { colour_fg } from "../defs/theme";
import { SplitTxt } from "./SplitTxt";
import { SplitText } from "./SplitText";

const defaults = {
	fill: colour_fg,
	fontFamily: "'Pixel Font - Foresight'",
	fontSize: 64,
	lineHeight: 136,
};

export const PFTxt = withDefaults(Txt, {
	...defaults,
});

export const PFSplitTxt = withDefaults(SplitTxt, {
	...defaults,
});
