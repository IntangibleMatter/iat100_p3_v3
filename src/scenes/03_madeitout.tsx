import { Camera, Line, Node, Rect, Txt, View2D, makeScene2D } from "@motion-canvas/2d";
import {
	all,
	any,
	chain,
	createRef,
	createRefArray,
	easeInBack,
	easeInBounce,
	easeInCirc,
	easeInCubic,
	easeInElastic,
	easeInOutBack,
	easeInOutElastic,
	easeInQuint,
	easeOutBack,
	easeOutBounce,
	easeOutElastic,
	easeOutQuad,
	range,
	sequence,
	useLogger,
	waitFor,
	waitUntil,
} from "@motion-canvas/core";
import { PFSplitTxt, PFTxt } from "../components/PFTxt";
import { colours } from "../defs/theme";
import { SplitTxt } from "../components/SplitTxt";

const bg = createRef<Rect>();

//const madeitout_cam = createRef<Camera>();
const txt_madeitout = createRef<SplitTxt>();
const str_madeitout = "made it outta life in prison";

const bars = createRefArray<Line>();
const txt_withouteven = createRef<SplitTxt>();
const txt_afine = createRef<SplitTxt>();

const canvas = document.createElement("canvas").getContext("2d");
const logger = useLogger();

export default makeScene2D(function* (view) {
	yield* waitUntil("made it out - offset accounter");
	yield* madeitout(view);
	yield* withouteven(view);
	yield* madeitoutno(view);
	yield* waitUntil("madeitout end");
});

function* madeitout(view: View2D) {
	view.add(<Rect ref={bg} fill={colours.c_fg} size={[1920, 1080]} />);
	canvas.font = `64px 'Pixel Font - Foresight'`;
	canvas.textBaseline = "bottom";
	const str_madeitout_width = canvas.measureText(`${str_madeitout}`).width;

	view.add(
		<PFSplitTxt
			ref={txt_madeitout}
			text={str_madeitout}
			separator={""}
			position={[-790, 0]}
			subProps={{ opacity: 0.0, fill: colours.c_bg, scale: [0.5, 0.5] }}
		/>,
	);
	view.add(<PFTxt text={str_madeitout} opacity={0.0} fill={"red"} />);

	yield* sequence(
		0.03,
		...txt_madeitout().subtext.map((letter) =>
			all(
				letter.opacity(1, 0.05),
				letter.text().indexOf("i") != -1
					? letter.scale([1.2, 38], 0.3, easeInBounce)
					: letter.scale([1, 1], 0.1, easeOutBounce),
			),
		),
	);
}

function* withouteven(view: View2D) {
	range(4).map((idx) => {
		let xpos = [-501, 91, 303, 603][idx];
		view.add(
			<Line
				ref={bars}
				points={[
					[xpos, 1640],
					[xpos, -1640],
				]}
				stroke={colours.c_bg}
				lineWidth={24}
				opacity={1}
			/>,
		);
	});
	yield all(
		...txt_madeitout().subtext.map((letter) =>
			any(
				letter.text().indexOf("i") != -1 ? letter.opacity(0, 0) : letter.opacity(0, 0.2),
				letter.scale([0.5, 0.5], 0.2, easeInBack),
			),
		),
	);

	yield all(
		...bars.map((bar, idx) =>
			any(
				bar.points(
					[
						[-1450, ((idx % 4) - 1) * 300 - 0],
						[1450, ((idx % 4) - 1) * 300 - 0],
					],
					0.4,
					easeInOutBack,
				),
			),
		),
	);

	view.add(
		<PFSplitTxt
			ref={txt_withouteven}
			text={"without even"}
			position={[-799, -144]}
			separator={""}
			fontSize={128}
			subProps={{ opacity: 0, scale: [0.25, 0.25], fill: colours.c_bg }}
		/>,
	);

	view.add(
		<PFSplitTxt
			ref={txt_afine}
			text={"A FIN€"}
			position={[-440, 144]}
			separator={""}
			fontSize={128}
			subProps={{ opacity: 0, scale: [0.25, 0.25], fill: colours.c_bg }}
		/>,
	);
	yield any(
		...txt_afine().subtext.map((letter, idx) =>
			letter.fill(idx > 1 ? colours.c_00 : colours.c_bg, 0.0),
		),
	);
	//view.add(<PFTxt opacity={0.5} position={[0, 144]} fontSize={128} fill={"red"} text={"A FIN€"} />);
	yield* waitFor(0.1);
	yield* sequence(
		0.05,
		...txt_withouteven().subtext.map((letter, idx) =>
			any(letter.opacity(1, 0.1), letter.scale([1, 1], 0.25, easeOutElastic)),
		),
	);
	yield* waitFor(0.1);
	yield* sequence(
		0.033,
		...txt_afine().subtext.map((letter, idx) =>
			any(letter.opacity(1, 0.1), letter.scale([1, 1], 0.25, easeOutBounce)),
		),
	);
}

function* madeitoutno(view: View2D) {
	yield* waitFor(0.1);
	yield all(
		...bars.map((bar, idx) => bar.position.x(idx % 2 == 0 ? -2900 : 2900, 0.3125, easeInBack)),
		txt_afine().position.x(-2900, 0.3125, easeInBack),
		txt_withouteven().position.x(2900, 0.3125, easeInBack),
	);
}
