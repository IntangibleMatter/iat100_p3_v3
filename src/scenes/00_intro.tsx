import { Circle, makeScene2D, Rect } from "@motion-canvas/2d";
import { createRef, createRefArray, waitUntil } from "@motion-canvas/core";
import { colour_bg } from "../defs/theme";

export default makeScene2D(function* (view) {
	const bg = createRef<Rect>();
	const drops = createRefArray<Circle>();

	view.add(<Rect ref={bg} fill={colour_bg} size={[1920, 1080]} />);

	// TODO: calculate timings of beats
	//
	// this scene is planned to be droplets falling into the screen causing ripples
	// The ripples should be concentric circles. I think I'm gonna need to figure out
	// an angle that the view should be at? So that it's like you're looking "across"
	// but also "over" a piece of water. REALLY close up tho

	yield* waitUntil("end");
});
