import { CubicBezier, Curve, Line, makeScene2D, Node, Rect, Txt } from "@motion-canvas/2d";
import {
	createRef,
	createRefArray,
	easeInOutSine,
	range,
	sequence,
	waitFor,
	waitUntil,
} from "@motion-canvas/core";
import { colour_bg, colour_fg } from "../defs/theme";
import { SplitTxt } from "../components/SplitTxt";
import { PFSplitTxt, PFTxt } from "../components/PFTxt";

export default makeScene2D(function* (view) {
	const bg = createRef<Rect>();
	const line1 = createRef<CubicBezier>();
	const line1_subs = createRefArray<Line>();
	const txt_ohitseasy_container = createRef<Node>();
	const txt_ohitseasy = createRefArray<Txt>();

	view.add(<Rect ref={bg} size={[1920, 1080]} fill={colour_bg} />);

	// P0​=(0,a), P1​=(b,c), P2​=(c,b), P3​=(a,0), where
	// a=1.00005519,
	// b=0.55342686,
	// c=0.99873585.
	view.add(
		<CubicBezier
			ref={line1}
			stroke={colour_fg}
			lineWidth={8}
			p0={[-960, -130]}
			p1={[-589, -129]}
			p2={[-291, 169]}
			p3={[-289, 540]}
		/>,
	);
	view.add(
		<Node ref={txt_ohitseasy_container}>
			{"oh its easy".split("").map((letter, idx) => {
				let lp = line1().getPointAtPercentage(idx / "oh its easy".length);
				<PFTxt
					ref={txt_ohitseasy}
					text={letter}
					position={lp.position}
					rotation={lp.normal.degrees + 90}
				/>;
			})}
			;
		</Node>,
	);

	range(4).map((i) => {
		let lp = line1().getPointAtPercentage(i / 3);
		line1().add(
			<Line
				ref={line1_subs}
				rotation={lp.normal.degrees + 90}
				position={lp.position}
				points={[
					[0, 0],
					[0, 0],
				]}
				stroke={colour_fg}
				lineWidth={6}
			/>,
		);
	});
	yield sequence(
		0,
		...line1_subs.map((line) =>
			line.points(
				[
					[0, 0],
					[0, 64],
				],
				0.125,
				easeInOutSine,
			),
		),
	);

	yield* waitUntil("oh its easy");
});
