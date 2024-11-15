import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import _00_intro from "./scenes/00_intro?scene";
import audio from "./audio/attackingvertical_nooutro.ogg";

export default makeProject({
	scenes: [_00_intro, example],
	audio: audio,
});
