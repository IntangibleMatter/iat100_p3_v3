import { Circle, makeScene2D, Rect } from "@motion-canvas/2d";
import {
	createRef,
	createRefArray,
	useLogger,
	usePlayback,
	waitFor,
	waitUntil,
} from "@motion-canvas/core";
import { colour_bg } from "../defs/theme";
import { WaterDrop } from "../components/WaterDrop";

interface DropTimePair {
	drop: WaterDrop;
	wait: number;
}

export default makeScene2D(function* (view) {
	const bg = createRef<Rect>();

	const droplets: DropTimePair[] = [
		{ drop: new WaterDrop({ fill: "#ff0000", x: 0, y: 0 }), wait: 0 }, // also on 0.4 second wait
		{ drop: new WaterDrop({ fill: "#00ff00", x: 0, y: 0 }), wait: 0.15 },
		{ drop: new WaterDrop({ fill: "#0000ff", x: 0, y: 0 }), wait: 0.39 },
		{ drop: new WaterDrop({ fill: "#ffff00", x: 0, y: 0 }), wait: 0.39 },
		{ drop: new WaterDrop({ fill: "#ff00ff", x: 0, y: 0 }), wait: 0.16 },
		{ drop: new WaterDrop({ fill: "#123456", x: 0, y: 0 }), wait: 0.39 },
		{ drop: new WaterDrop({ fill: "#f05090", x: 0, y: 0 }), wait: 0.31 },
		{ drop: new WaterDrop({ fill: "#069420", x: 0, y: 0 }), wait: 0.31 },
	];

	view.add(<Rect ref={bg} fill={colour_bg} size={[1920, 1080]} />);
	for (const drop of droplets) {
		view.add(drop.drop);
	}
	const logger = useLogger();
	const playback = usePlayback();
	const ndrop = createRef<WaterDrop>();

	// TODO: calculate timings of beats
	//
	// this scene is planned to be droplets falling into the screen causing ripples
	// The ripples should be concentric circles. I think I'm gonna need to figure out
	// an angle that the view should be at? So that it's like you're looking "across"
	// but also "over" a piece of water. REALLY close up tho
	//
	for (let i = 0; i < 4; i++) {
		for (const drop of droplets) {
			yield* waitFor(drop.wait);
			drop.drop.moveToTop();
			logger.debug(
				`Waited: ${drop.wait}s for bg of colour ${drop.drop.fill()} on frame ${playback.frame}.`,
			);
			yield drop.drop.position.y(0, 0); // replace with the actual drop doing its thing call
		}
		yield* waitFor(0.4);
		logger.debug(`BONUS WAIT OF 0.4s FOR CYCLE OFFSET OF ${playback.frame}`);
	}

	//yield* waitUntil("end");
});
