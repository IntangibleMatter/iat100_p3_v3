import {
	Circle,
	CubicBezier,
	Curve,
	Layout,
	Line,
	makeScene2D,
	Node,
	Rect,
	Txt,
	View2D,
} from "@motion-canvas/2d";
import {
	all,
	any,
	chain,
	createRef,
	createRefArray,
	createRefMap,
	createSignal,
	easeInCubic,
	easeInOutBack,
	easeInOutCubic,
	easeInOutElastic,
	easeInOutExpo,
	easeInOutQuint,
	easeInOutSine,
	easeInQuint,
	easeOutBack,
	easeOutBounce,
	easeOutCirc,
	easeOutCubic,
	easeOutElastic,
	easeOutQuint,
	linear,
	loopUntil,
	makeRef,
	RAD2DEG,
	range,
	Reference,
	ReferenceArray,
	sequence,
	useLogger,
	Vector2,
	waitFor,
	waitUntil,
} from "@motion-canvas/core";
import { colour_00, colour_01, colour_bg, colour_fg } from "../defs/theme";
import { SplitTxt } from "../components/SplitTxt";
import { PFSplitTxt, PFTxt } from "../components/PFTxt";

export default makeScene2D(function* (view) {
	const logger = useLogger();
	const bg = createRef<Rect>();
	const line1 = createRef<CubicBezier>();
	const line1_extension = createRef<Line>();
	const line1_subs = createRefArray<Line>();
	const line2 = createRef<Line>();
	//const txt_ohitseasy_container = createRef<Node>();
	const txt_ohitseasy_container = createRefArray<Node>();
	const txt_ohitseasy = createRefArray<Txt>();
	const str_ohitseasy = "oh its easy";
	const clockhand = createRef<Line>();
	const clockcentre = createRef<Circle>();
	const txt_ilosttotime = createRef<Layout>();

	const thermometre_pos = createSignal<number>(850);
	const thermometre_bar = createRef<Rect>();
	const txt_gotafever = createRefArray<Txt>();
	const txt_gotafever_container = createRefArray<Node>();
	const str_gotafever = "got a fe ver of 100°";
	const txt_feelingalright = createRefArray<Txt>();
	const txt_feelingalright_container = createRefArray<Node>();
	const str_feelingalright = "and I'm feeling alright";

	// oh its easy
	if (true) {
		// here to make it so I can close this block
		view.add(<Rect ref={bg} size={[1920, 1080]} fill={colour_bg} />);

		// P0​=(0,a), P1​=(b,c), P2​=(c,b), P3​=(a,0), where
		// a=1.00005519,
		// b=0.55342686,
		// c=0.99873585.
		view.add(
			<CubicBezier
				ref={line1}
				stroke={colour_fg}
				lineWidth={16}
				p0={[-960, -130]}
				p1={[-589, -129]}
				p2={[-291, 169]}
				p3={[-289, 540]}
			/>,
		);
		view.add(<Circle ref={clockcentre} fill={colour_fg} position={[-960, 540]} size={[0, 0]} />);
		view.add(
			<Node>
				{str_ohitseasy.split("").map((letter, idx) => (
					<Node
						ref={txt_ohitseasy_container}
						position={() =>
							line1().getPointAtPercentage((idx + 1) / (str_ohitseasy.length + 1)).position
						}
						rotation={() =>
							line1().getPointAtPercentage((idx + 1) / (str_ohitseasy.length + 1)).normal.degrees +
							90
						}
					>
						<PFTxt
							opacity={0}
							ref={txt_ohitseasy}
							stroke={colour_bg}
							strokeFirst={true}
							lineWidth={4}
							offset={[0, 0.5]}
							text={`​${letter}​`}
							layout={false}
						/>
					</Node>
				))}
				;
			</Node>,
		);

		range(4).map((i) => {
			line1().add(
				<Line
					ref={line1_subs}
					rotation={() => line1().getPointAtPercentage(i / 3).normal.degrees + 90}
					position={() => line1().getPointAtPercentage(i / 3).position}
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
		yield clockcentre().size([64, 64], 0.167, easeOutCubic);

		yield sequence(
			0.067,
			...range(3).map((i) =>
				any(
					txt_ohitseasy[i].opacity(1, 0.067, easeOutCubic),
					txt_ohitseasy[i].offset.y(1, 0.15, easeOutBounce),
				),
			),
		);
		yield* waitUntil("00 - its");

		yield sequence(
			0.067,
			...range(str_ohitseasy.length - 3)
				.map((i) => i + 3)
				.map((i) =>
					all(
						txt_ohitseasy[i].opacity(1, 0.067, easeOutCubic),
						txt_ohitseasy[i].offset.y(1, 0.15, easeOutBounce),
					),
				),
		);

		view.add(
			<Line
				ref={clockhand}
				lineWidth={16}
				stroke={colour_fg}
				position={[-960, 540]}
				points={[
					[0, 0],
					[0, -580],
				]}
				rotation={-10}
			/>,
		);
		view.add(
			<Layout
				ref={txt_ilosttotime}
				bottom={() => clockhand().left()}
				rotation={() => clockhand().rotation() - 90}
			>
				<PFTxt fontSize={32} text={"I lost to time"} offset={[-1.65, 1]} />
			</Layout>,
		);

		yield* waitUntil("01 - I lost to time");

		yield* loopUntil("clockhand out", () =>
			clockhand().rotation(clockhand().rotation() + 10, 0.3125, easeInOutQuint),
		);

		yield clockhand().rotation(180, 0.625, easeInQuint);
		yield chain(waitFor(0.3125), clockcentre().position.y(640, 0.3125, easeInOutCubic));
	}

	yield* waitUntil("feverin");

	view.add(
		<Line
			ref={line1_extension}
			position={line1().p0}
			points={[
				[0, 0],
				[-1000, 0],
			]}
			lineWidth={16}
			rotation={() => line1().p0().sub(line1().p1()).rotate(180).degrees}
			stroke={colour_fg}
		/>,
	);

	view.add(
		<Line
			ref={line2}
			stroke={colour_fg}
			lineWidth={16}
			position={[976, 540]}
			offset={[-1, 0]}
			points={[
				[0, 0],
				[0, -1080],
			]}
		/>,
	);
	view.add(
		<Rect
			ref={thermometre_bar}
			fill={colour_00}
			size={[110, 0]}
			offset={[-1, 1]}
			y={540}
			x={thermometre_pos}
		/>,
	);
	thermometre_bar().moveBelow(line1() as Node, true);
	thermometre_bar().moveUp();

	yield all(
		line1().p0.y(-542, 0.625, easeInOutCubic),
		line1().p0.x(thermometre_pos, 0.625, easeInOutCubic),
		line1().p1.y(-270, 0.625, easeInOutCubic),
		line1().p1.x(thermometre_pos, 0.625, easeInOutCubic),
		line1().p2.y(270, 0.625, easeInOutCubic),
		line1().p2.x(thermometre_pos, 0.625, easeInOutCubic),
		line1().p3.y(542, 0.625, easeInOutCubic),
		line1().p3.x(thermometre_pos, 0.625, easeInOutCubic),
	);

	yield chain(
		waitFor(0.4),
		all(...txt_ohitseasy.map((obj) => obj.offset.y(4, 0.15, linear))),
		all(...txt_ohitseasy.map((obj) => obj.position([0, 10000], 0))),
		freeObjs(txt_ohitseasy),
		freeObjs(txt_ohitseasy_container),
	);

	view.add(
		<Node>
			{str_gotafever.split(" ").map((letter, idx) => (
				<Node
					/* ref={makeRef(txt_gotafever_container, letter)} */
					ref={txt_gotafever_container}
					x={idx != 2 ? () => thermometre_pos() - 10 : () => thermometre_pos() - 432}
					y={
						128 * (idx < 2 || idx > 3 ? idx - 2 : 0) + (idx - 3 > 0 ? -48 : 0) * Math.sign(idx - 3)
					}
				>
					<PFTxt
						opacity={0}
						//ref={makeRef(txt_gotafever, letter)}
						ref={txt_gotafever}
						stroke={colour_bg}
						fill={idx == 2 || idx == 3 ? colour_01 : colour_fg}
						strokeFirst={true}
						lineWidth={4}
						offset={[0, 0.5]}
						text={`​${letter}​`}
						layout={false}
						offsetX={1}
						fontSize={idx == 2 || idx == 3 ? 128 : 64}
					/>
				</Node>
			))}
			;
		</Node>,
	);

	yield all(
		...line1_subs.map((subl) =>
			subl.points(
				[
					[0, 0],
					[0, 0],
				],
				0.3125,
				easeInCubic,
			),
		),
	);

	yield fixLines(view, line1_subs, line1);

	yield* waitUntil("got a fever");
	yield thermometre_bar().size.y(1080, 2.5, linear);
	yield line2().position.x(() => thermometre_pos() + 102, 0.3125, easeOutCubic);
	yield sequence(
		0.12,
		waitFor(0.1),
		...txt_gotafever.map((obj) => all(obj.opacity(1, 0.167, easeOutCubic), obj.offset.y(0, 0.067))),
	);

	yield* waitUntil("fever slide left");

	yield thermometre_pos(-50, 0.3125, easeInOutCubic);

	yield* waitUntil("ekjanks");
});

function* freeObjs(objs: ReferenceArray<Node>) {
	for (let obj of objs) {
		obj.remove();
	}
}

function* fixLines(view: View2D, line1_subs: ReferenceArray<Line>, line1: Reference<CubicBezier>) {
	yield* all(
		...line1_subs.map((subl) =>
			subl.points(
				[
					[0, 0],
					[0, 0],
				],
				0.3125,
				easeInCubic,
			),
		),
	);
	for (let sub of line1_subs) {
		sub.remove();
	}

	range(10).map((i) =>
		view.add(
			<Line
				ref={line1_subs}
				lineWidth={6}
				stroke={colour_fg}
				rotation={() => line1().getPointAtPercentage(i / 9).normal.degrees + 90}
				position={() => line1().getPointAtPercentage(i / 9).position}
				points={[
					[0, 0],
					[0, 0],
				]}
			/>,
		),
	);

	yield* all(
		...line1_subs.map((subl) =>
			subl.points(
				[
					[0, 0],
					[0, -64],
				],
				0.3125,
				easeOutCubic,
			),
		),
	);
}
