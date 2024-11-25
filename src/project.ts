import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import _00_intro from "./scenes/00_intro?scene";
import _01_ohitseasy from "./scenes/01_ohitseasy?scene";
import _02_ohitseasy2 from "./scenes/02_ohitseasy2?scene";
import audio from "./audio/attackingvertical_nooutro_offsetstart.ogg";

export default makeProject({
	scenes: [_00_intro, _01_ohitseasy, _02_ohitseasy2, example],
	audio: audio,
});
