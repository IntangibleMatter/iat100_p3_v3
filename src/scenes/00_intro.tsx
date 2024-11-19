import { Circle, makeScene2D, Rect } from "@motion-canvas/2d";
import {
	createRef,
	createRefArray,
	useLogger,
	usePlayback,
	useRandom,
	Vector2,
	waitFor,
	waitUntil,
} from "@motion-canvas/core";
import { colour_bg, colour_fg } from "../defs/theme";
import { WaterDrop } from "../components/WaterDrop";

interface DropTimePair {
	drop: WaterDrop;
	wait: number;
}

export default makeScene2D(function* (view) {
	const bg = createRef<Rect>();

	const startDrop = createRef<WaterDrop>();
	const droplets: DropTimePair[] = [
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.15 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.39 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.39 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.16 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.39 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.31 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.31 },
		{ drop: new WaterDrop({ fill: colour_fg, x: 0, y: 0 }), wait: 0.4 }, // also on 0.4 second wait
	];
	const dropTargets: number[][] = [
		// first set
		[-600, 300],
		[0, 0],
		[600, -300],
		[-600, 300],
		[-300, 200],
		[0, 100],
		[300, -200],
		[600, -100],
		// second set
		[600, 300],
		[0, 0],
		[-600, -300],
		[600, 300],
		[300, 200],
		[0, 100],
		[-300, -200],
		[-600, -100],
		// third set
		[-600, 300],
		[0, 0],
		[600, -300],
		[-600, 300],
		[-300, 200],
		[0, 100],
		[300, -200],
		[600, -100],
		// fourth set
		[600, -300],
		[0, 0],
		[-600, 300],
		[600, -300],
		[300, -200],
		[0, 100],
		[-300, 200],
		[-960, 540],
		[10000, 10000],
		[10000, 10000],
	];

	view.add(<Rect ref={bg} fill={colour_bg} size={[1920, 1080]} />);
	view.add(<WaterDrop ref={startDrop} />);
	for (const drop of droplets) {
		view.add(drop.drop);
	}
	const logger = useLogger();
	const playback = usePlayback();
	const ndrop = createRef<WaterDrop>();
	const random = useRandom();

	// TODO: calculate timings of beats
	//
	// this scene is planned to be droplets falling into the screen causing ripples
	// The ripples should be concentric circles. I think I'm gonna need to figure out
	// an angle that the view should be at? So that it's like you're looking "across"
	// but also "over" a piece of water. REALLY close up tho
	//
	yield startDrop().dropAt(new Vector2(dropTargets[0][0], dropTargets[0][1]), 0.07);
	let dropidx = 1; // 1 bc we're skipping the first for now
	for (let i = 0; i < 4; i++) {
		for (const drop of droplets) {
			//yield* waitFor(drop.wait);
			drop.drop.moveToTop();
			if (dropidx < 31) {
				yield drop.drop.dropAt(
					new Vector2(dropTargets[dropidx][0], dropTargets[dropidx][1]),
					drop.wait,
				);
			} else {
				yield drop.drop.dropAt(
					new Vector2(dropTargets[dropidx][0], dropTargets[dropidx][1]),
					drop.wait,
					1340,
				);
			}
			dropidx++;
			yield* waitFor(drop.wait);
			logger.debug(
				`Waited: ${drop.wait}s for bg of colour ${drop.drop.fill()} on frame ${playback.frame}.`,
			);
			//yield drop.drop.position.y(0, 0); // replace with the actual drop doing its thing call
		}
		//yield* waitFor(0.4);
		//logger.debug(`BONUS WAIT OF 0.4s FOR CYCLE OFFSET OF ${playback.frame}`);
	}

	//yield* waitUntil("end");
});
