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
	easeInCirc,
	easeInCubic,
	easeInExpo,
	easeInOutBack,
	easeInOutBounce,
	easeInOutCubic,
	easeInOutElastic,
	easeInOutExpo,
	easeInOutQuint,
	easeInOutSine,
	easeInQuad,
	easeInQuint,
	easeInSine,
	easeOutBack,
	easeOutBounce,
	easeOutCirc,
	easeOutCubic,
	easeOutElastic,
	easeOutQuad,
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
import {
	change_palette,
	colours,
	pal_fuzzyfour,
	pal_kaneki,
	pal_lavagb,
	pal_spacehaze,
	reset_palette,
} from "../defs/theme";
import { SplitTxt } from "../components/SplitTxt";
import { PFSplitTxt, PFTxt } from "../components/PFTxt";

export default makeScene2D(function* (view) {
	const logger = useLogger();
	const bg = createRef<Rect>();
	const line1 = createRef<CubicBezier>();
	const line1_extension = createRef<Line>();
	const line1_subs = createRefArray<Line>();
	const line2 = createRef<Line>();
	const line3 = createRef<Line>();
	const line3_subs = createRefArray<Line>();
	const thermrect = createRef<Rect>();
	const thermrect_bars = createRefArray<Line>();
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
	const txt_madeitout = createRef<SplitTxt>();
	const txt_lifeinprison = createRef<SplitTxt>();
	const txt_withouteven = createRef<SplitTxt>();
	const txt_afine = createRefArray<SplitTxt>();
	const txt_withoutevenafine_container = createRef<Node>();

	const txt_madeitout2 = createRefArray<Txt>();
	const txt_madeitout2_container = createRefArray<Node>();
	const txt_bright = createRef<Txt>();

	//yield change_palette(pal_fuzzyfour, 0.1);
	yield reset_palette();

	// oh its easy
	if (true) {
		// here to make it so I can close this block
		view.add(<Rect ref={bg} size={[1920, 1080]} fill={colours.c_bg} />);

		// P0​=(0,a), P1​=(b,c), P2​=(c,b), P3​=(a,0), where
		// a=1.00005519,
		// b=0.55342686,
		// c=0.99873585.
		view.add(
			<CubicBezier
				ref={line1}
				stroke={colours.c_fg}
				lineWidth={16}
				p0={[-960, -130]}
				p1={[-589, -129]}
				p2={[-291, 169]}
				p3={[-289, 540]}
			/>,
		);
		view.add(<Circle ref={clockcentre} fill={colours.c_fg} position={[-960, 540]} size={[0, 0]} />);
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
							stroke={colours.c_bg}
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
					stroke={colours.c_fg}
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
				stroke={colours.c_fg}
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
	if (true) {
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
				stroke={colours.c_fg}
			/>,
		);

		view.add(
			<Line
				ref={line2}
				stroke={colours.c_fg}
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
				fill={colours.c_00}
				size={[110, 0]}
				offset={[-1, 1]}
				opacity={1}
				y={540}
				x={thermometre_pos}
			/>,
		);
		thermometre_bar().moveBelow(line1() as Node, true);
		thermometre_bar().moveUp();

		yield all(
			line1().p0.y(-548, 0.625, easeInOutCubic),
			line1().p0.x(thermometre_pos, 0.625, easeInOutCubic),
			line1().p1.y(-270, 0.625, easeInOutCubic),
			line1().p1.x(thermometre_pos, 0.625, easeInOutCubic),
			line1().p2.y(270, 0.625, easeInOutCubic),
			line1().p2.x(thermometre_pos, 0.625, easeInOutCubic),
			line1().p3.y(548, 0.625, easeInOutCubic),
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
							128 * (idx < 2 || idx > 3 ? idx - 2 : 0) +
							(idx - 3 > 0 ? -72 : 0) * Math.sign(idx - 3)
						}
					>
						<PFTxt
							opacity={0}
							//ref={makeRef(txt_gotafever, letter)}
							ref={txt_gotafever}
							stroke={colours.c_bg}
							fill={idx == 2 || idx == 3 ? colours.c_01 : colours.c_fg}
							strokeFirst={true}
							lineWidth={4}
							offset={[1, 1]}
							text={`​${letter}​`}
							layout={false}
							fontSize={idx == 2 || idx == 3 ? 128 : 64}
						/>
					</Node>
				))}
				;
			</Node>,
		);

		view.add(
			<Node>
				{str_feelingalright.split(" ").map((letter, idx) => (
					<Node
						/* ref={makeRef(txt_gotafever_container, letter)} */
						ref={txt_feelingalright_container}
						x={() => thermometre_pos() + 120}
						y={128 * (idx - 1.5)}
					>
						<PFTxt
							opacity={1}
							//ref={makeRef(txt_gotafever, letter)}
							ref={txt_feelingalright}
							textAlign={"right"}
							stroke={colours.c_bg}
							fill={colours.c_fg}
							strokeFirst={true}
							lineWidth={4}
							offset={[-1, 0]}
							text={`​${letter}​`}
							layout={false}
							fontSize={64}
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
		yield thermometre_bar().size.y(1080, 2.2, linear);
		yield line2().position.x(() => thermometre_pos() + 102, 0.3125, easeOutCubic);
		yield sequence(
			0.12,
			waitFor(0.0),
			...txt_gotafever.map((obj) =>
				all(obj.opacity(1, 0.167, easeOutCubic), obj.offset.y(0, 0.067)),
			),
		);

		yield* waitUntil("fever slide left");

		yield thermometre_pos(-50, 0.3125, easeInOutCubic);
	}
	// TODO: text in for "I'm feeling alright"

	yield* waitUntil("prison");

	if (true) {
		line2().points([
			[0, 0],
			[0, -2048],
		]);

		view.add(
			<Rect
				ref={thermrect}
				lineWidth={16}
				stroke={colours.c_fg}
				position={[thermometre_pos() + 51, 0]}
				size={[102, 1096]}
			/>,
		);
		view.add(
			<Line
				ref={line3}
				position={thermrect().position}
				points={[thermrect().bottomLeft, thermrect().topLeft]}
				//stroke={"#ff00ff88"}
				//lineWidth={8}
			/>,
		);
		range(10).map((i) => {
			view.add(
				<Line
					ref={thermrect_bars}
					lineWidth={6}
					stroke={colours.c_fg}
					points={[
						[0, 0],
						[64, 0],
					]}
					rotation={() => thermrect().top().degrees + 90}
					position={() => line3().getPointAtPercentage(i / 9).position}
				/>,
			);
		});

		thermometre_bar().moveToTop();
		for (let i = 0; i < 14; i++) {
			thermometre_bar().moveDown();
		}
		yield thermometre_bar().rotation(thermrect().rotation);
		yield thermometre_bar().offset([0, 0]);
		yield thermometre_bar().position(thermrect().position);
		yield thermometre_bar().size(thermrect().size);
		let prisonRotTime = 0.3125;
		let prisonRotEase = easeInOutSine;
		yield chain(
			all(
				thermrect().rotation(90, prisonRotTime, prisonRotEase),
				line1().opacity(0, 0),
				line2().opacity(0, 0),
				line1().p0([10000, 10000], 0),
				line1().p1([10001, 10000], 0),
				line1().p2([10002, 10000], 0),
				line1().p3([10003, 10000], 0),
				thermrect().size([1100, 7096], prisonRotTime, prisonRotEase),
				...thermrect_bars.map((bar) =>
					all(
						bar.points(
							[
								[0, 0],
								[1100, 0],
							],
							prisonRotTime,
							prisonRotEase,
						),
						bar.lineWidth(128, prisonRotTime, prisonRotEase),
					),
				),
				/*line2().points(
			[
				[-960, 0],
				[960, 0],
			],
			0.3125,
		),
		line1().p2([960, -540], 0.3125),
		line1().p1([960, -540], 0.3125),
		line1().p0([1920, -540], 0.3125),*/
			),
			all(
				...txt_gotafever.map((obj) => obj.opacity(0, 0)),
				...txt_gotafever.map((obj) => obj.position([10000, 100000], 0)),
				...txt_feelingalright.map((obj) => obj.opacity(0, 0)),
				...txt_feelingalright.map((obj) => obj.position([10000, 100000], 0)),
				bg().fill(colours.c_00, 0),
				chain(waitFor(0), thermometre_bar().opacity(0, 0)),
			),
		);

		view.add(
			<PFSplitTxt
				ref={txt_madeitout}
				offset={[0, 0]}
				position={[-890, -256]}
				text={"made it outta"}
				separator={" "}
				subProps={{
					fontSize: 140,
					fill: colours.c_01,
					stroke: colours.c_00,
					lineWidth: 4,
					scale: [1.5, 1.5],
					opacity: 0,
				}}
			/>,
		);

		view.add(
			<PFSplitTxt
				ref={txt_lifeinprison}
				offset={[0, 0]}
				position={[-890, 256]}
				text={"life in prison"}
				separator={" "}
				subProps={{
					fontSize: 140,
					fill: colours.c_01,
					stroke: colours.c_00,
					lineWidth: 4,
					scale: [1.5, 1.5],
					opacity: 0,
				}}
			/>,
		);
		view.add(
			<Node ref={txt_withoutevenafine_container}>
				<PFSplitTxt
					ref={txt_withouteven}
					separator={" "}
					text={"without even"}
					x={-380}
					y={-64}
					subProps={{ fill: colours.c_bg, opacity: 0, scale: [0.5, 0.5] }}
				/>
				,
				<PFSplitTxt
					ref={txt_afine}
					separator={" "}
					text={"a fine"}
					x={-150}
					y={96}
					subProps={{ fill: colours.c_bg, opacity: 0, scale: [0.5, 0.5] }}
				/>
				,
			</Node>,
		);

		/*view.add(
		<Node>
			{"without even a fine".split(" ").map((letter, idx) => (
				<Node
					ref={txt_withoutevenafine_container}
					y={96 * Math.floor(idx / 2) - 1}
					x={0}
				>
					<PFTxt
						opacity={1}
						//ref={makeRef(txt_gotafever, letter)}
						ref={txt_withoutevenafine}
						textAlign={"right"}
						stroke={colours.c_fg}
						fill={colours.c_bg}
						strokeFirst={true}
						lineWidth={4}
						offset={[idx % 2 == 0 ? 1 : -1, 0]}
						text={`​${letter}​`}
						layout={false}
						fontSize={48}
					/>
				</Node>
			))}
			;
		</Node>,
	);*/
		for (let i = 0; i < 10; i++) {
			txt_madeitout().moveDown();
			txt_lifeinprison().moveDown();
		}

		yield* waitUntil("made it out");

		yield* sequence(
			0.15,
			...txt_madeitout().subtext.map((text) =>
				all(text.opacity(1, 0.1), text.scale([1, 1], 0.28, easeOutBounce)),
			),
		);
		yield* sequence(
			0.15,
			...txt_lifeinprison().subtext.map((text) =>
				all(text.opacity(1, 0.1), text.scale([1, 1], 0.28, easeOutBounce)),
			),
		);
		yield* chain(
			waitFor(0.1),
			sequence(
				0.3,
				...txt_withouteven().subtext.map((text) =>
					all(text.opacity(1, 0.1), text.scale([1, 1], 0.2, easeOutBounce)),
				),
			),
			waitFor(0.1),
			sequence(
				0.1,
				...txt_afine().subtext.map((text) =>
					all(text.opacity(1, 0.1), text.scale([1, 1], 0.2, easeOutBounce)),
				),
			),
			waitFor(0.0),
			all(
				txt_withoutevenafine_container().scale([128, 128], 0.3125, easeInCubic),
				txt_withouteven().position.y(0, 0.25, easeInCirc),
				txt_withouteven().position.x(txt_withouteven().position.x() - 9, 0.25),
				//txt_afine().position.y(0, 0.25),
			),
		);
		yield bg().fill(colours.c_bg);
		yield txt_madeitout().remove();
		yield txt_lifeinprison().remove();
		yield txt_withoutevenafine_container().remove();
		yield txt_afine().remove();
		yield thermrect().remove();
		yield thermrect_bars.map((bar) => bar.remove());
	}

	view.add(
		<PFTxt
			ref={txt_bright}
			text={"BRIGHT"}
			fontSize={192}
			shadowColor={colours.c_fg}
			shadowBlur={16}
			shadowOffset={[0, 0]}
			position={[0, 256]}
			opacity={0}
		/>,
	);

	yield* waitUntil("bright");
	yield txt_bright().opacity(1, 0.167);

	yield* waitUntil("bright_glow");

	yield* all(
		txt_bright().shadowBlur(256, 0.4, easeInCubic),
		chain(waitFor(0.25), bg().fill(colours.c_fg, 0.15, easeInQuad)),
		chain(waitFor(0.3), change_palette(pal_kaneki, 0.1)),
	);

	//yield* waitUntil("ekjanks");
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
				stroke={colours.c_fg}
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
