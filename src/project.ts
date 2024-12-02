import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import _00_intro from "./scenes/00_intro?scene";
import _01_ohitseasy from "./scenes/01_ohitseasy?scene";
import _02_ohitseasy2 from "./scenes/02_ohitseasy2?scene";
import _03_madeitout from "./scenes/03_madeitout?scene";
import _04willfindyou from "./scenes/04_iwillfindyou?scene";
import audio from "./audio/attackingvertical_nooutro_offsetstart_short.ogg";

export default makeProject({
	scenes: [_00_intro, _01_ohitseasy, _02_ohitseasy2, _03_madeitout /*, _04willfindyou*/],
	audio: audio,
});
