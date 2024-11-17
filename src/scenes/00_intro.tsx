import { Circle, makeScene2D, Rect } from "@motion-canvas/2d";
import { createRef, createRefArray, waitFor, waitUntil } from "@motion-canvas/core";
import { colour_bg } from "../defs/theme";
import { WaterDrop } from "../components/WaterDrop";

interface DropTimePair {
	drop?: WaterDrop;
	wait: number;
}

const droplets: DropTimePair[] = [
	{ drop: null, wait: 0 }, // also on 0.4 second wait
	{ drop: null, wait: 0.15 },
	{ drop: null, wait: 0.39 },
	{ drop: null, wait: 0.39 },
	{ drop: null, wait: 0.16 },
	{ drop: null, wait: 0.39 },
	{ drop: null, wait: 0.31 },
	{ drop: null, wait: 0.31 },
];

export default makeScene2D(function* (view) {
	const bg = createRef<Rect>();

	view.add(<Rect ref={bg} fill={colour_bg} size={[1920, 1080]} />);

	// TODO: calculate timings of beats
	//
	// this scene is planned to be droplets falling into the screen causing ripples
	// The ripples should be concentric circles. I think I'm gonna need to figure out
	// an angle that the view should be at? So that it's like you're looking "across"
	// but also "over" a piece of water. REALLY close up tho
	//
	for (let i = 0; i < 4; i++) {
		if (i > 0) {
			yield* waitFor(0.4);
		}

		droplets[0] = { wait: 0 };
		for (const drop of droplets) {
			yield* waitFor(drop.wait);
			yield drop.drop?.position.y(0, 0); // replace with the actual drop doing its thing call
		}
	}

	yield* waitUntil("end");
});
