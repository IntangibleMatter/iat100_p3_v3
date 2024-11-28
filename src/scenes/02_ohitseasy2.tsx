import {
	Camera,
	Layout,
	makeScene2D,
	Node,
	Rect,
	Txt,
	View2D,
	withDefaults,
} from "@motion-canvas/2d";
import {
	all,
	any,
	chain,
	createRef,
	createRefArray,
	createSignal,
	easeInExpo,
	easeInOutBack,
	easeInOutBounce,
	easeInOutElastic,
	easeInOutExpo,
	easeInQuad,
	easeOutBack,
	easeOutBounce,
	easeOutElastic,
	linear,
	loop,
	PossibleVector2,
	Reference,
	sequence,
	TimingFunction,
	useDuration,
	Vector2,
	waitFor,
	waitUntil,
} from "@motion-canvas/core";
import { colours } from "../defs/theme";
import { PFSplitTxt, PFTxt } from "../components/PFTxt";
import { SplitTxt } from "../components/SplitTxt";

const STxt = withDefaults(Txt, {
	fill: colours.c_00,
	fontFamily: "'16 Segments'",
	fontSize: 256,
});
/*
let bg: Reference<Rect>;
let alarm: Reference<Layout>;
let txt_alarm: Reference<Txt>;
*/
const bg = createRef<Rect>();
const alarm = createRef<Layout>();
const alarm_innerrect = createRef<Rect>();
const alarm_outerrect = createRef<Rect>();
const alarm_dummylabel = createRef<Rect>();
const txt_alarm = createRef<Txt>();

const pillbottle = createRef<Rect>();
const pillbottle_label0 = createRef<Rect>();
const pillbottle_cap = createRef<Rect>();
const txt_gotafever = createRef<SplitTxt>();
const txt_100 = createRef<SplitTxt>();
const txt_feelinalright = createRef<Txt>();
//const txt_feelin_top = createSignal<PossibleVector2>([0, -300]);

export default makeScene2D(function* (view) {
	/*
	bg = createRef<Rect>();
	alarm = createRef<Layout>();
	txt_alarm = createRef<Txt>();
	*/

	yield* ohItsEasy(view);
	yield* gotAFever(view);
	//yield* madeItOut(view);

	yield* waitUntil("v2 end");
});

function* ohItsEasy(view: View2D) {
	view.add(<Rect ref={bg} fill={colours.c_fg} size={[1920, 1080]} zIndex={0} />);
	view.add(
		<Node cache>
			<Layout ref={alarm} position={[0, -800]}>
				<Rect ref={alarm_outerrect} fill={colours.c_bg} size={[1000, 400]} radius={32}>
					<Rect
						ref={alarm_innerrect}
						stroke={colours.c_fg}
						lineWidth={4}
						size={[900, 333]}
						radius={32}
					>
						<STxt ref={txt_alarm} fill={colours.c_bg} text={"oh:​ ​ ​"} textAlign={"right"} />
					</Rect>
					<Rect
						ref={alarm_dummylabel}
						fill={colours.c_01}
						offsetY={2}
						size={[400, 550]}
						radius={64}
					/>
					<Rect
						size={[1000, 400]}
						radius={32}
						fill={"#ffffff"}
						opacity={1}
						compositeOperation={"destination-in"}
					/>
				</Rect>
			</Layout>
		</Node>,
	);

	yield* waitFor(0.167);
	yield loop(Infinity, () =>
		chain(alarm().scale([1.1, 1.1], 0), alarm().scale([1.0, 1.0], 0.3125)),
	);
	yield alarm().position(0, 0.3125);
	yield* chain(
		waitUntil("oie - its"),
		txt_alarm().text("it:'s", 0),
		waitUntil("oie - easy"),
		txt_alarm().text("ea:sy", 0),
		waitUntil("oie - I"),
		txt_alarm().text("​ ​I:​ ​ ​", 0),
		waitUntil("oie - lost"),
		txt_alarm().text("lo:st", 0),
		waitUntil("oie - to"),
		txt_alarm().text("​to:​ ​ ​", 0),
		waitUntil("oie - time"),
		txt_alarm().text("ti:me", 0),
		waitUntil("oie - end"),
		//txt_alarm().text("​ ​ : ​ ​", 0),
	);
}

function* gotAFever(view: View2D) {
	yield any(
		//alarm_outerrect().opacity(0.5, 0),
		alarm().rotation(-90, 0.3125),
		alarm_innerrect().offset.y(-3, 0.3125),
		alarm_outerrect().size([600, 400], 0.3125),
		alarm_dummylabel().offset.y(0, 0.3125),
	);
	view.add(
		<Node cache opacity={1}>
			<PFTxt
				ref={txt_feelinalright}
				fill={colours.c_bg}
				position={[600, 0]}
				opacity={0}
				text={"and I'm feeling alright"}
				lineHeight={150}
			/>
			<Rect
				fill={"red"}
				size={[2048, 256]}
				right={[0, 0]}
				opacity={1}
				compositeOperation={"destination-in"}
			/>
		</Node>,
	);
	view.add(
		<Node cache opacity={1}>
			<Rect
				ref={pillbottle}
				//				size={alarm_outerrect().size}
				size={[400, 600]}
				//				rotation={alarm().rotation}
				fill={colours.c_bg}
				position={[0, 0]}
				radius={32}
				opacity={0}
				zIndex={1}
			>
				<Rect ref={pillbottle_label0} fill={colours.c_01} offsetX={0} size={[550, 400]} radius={64}>
					<PFSplitTxt
						ref={txt_gotafever}
						separator={""}
						text={"got a fever"}
						fontSize={32}
						subProps={{ fill: colours.c_fg, scale: [1.5, 1.5], opacity: 0 }}
						position={[-148, -128]}
					/>
					<PFSplitTxt
						ref={txt_100}
						separator={""}
						text={"100"}
						fontSize={48}
						position={[-85, 32]}
						subProps={{ fill: colours.c_00, scale: [1.5, 1.5], opacity: 0 }}
					/>
				</Rect>
				<Rect ref={pillbottle_cap} bottom={300} size={[200, 0]} fill={colours.c_00} offsetY={1} />,
				<Rect fill={"#ffffff"} size={[400, 2048]} compositeOperation={"destination-in"} />
			</Rect>
		</Node>,
	);
	yield chain(
		waitFor(0.066667),
		loop(Infinity, () =>
			chain(pillbottle().scale([1.1, 1.1], 0), pillbottle().scale([1.0, 1.0], 0.3125)),
		),
	);
	yield* waitFor(0.246);
	yield sequence(
		0.0333,
		...txt_gotafever().subtext.map((text) =>
			any(text.opacity(1, 0.1), text.scale([1, 1], 0.3, easeOutBounce)),
		),
	);
	yield pillbottle().opacity(1, 0);
	yield alarm().position([99999, 99999], 0);
	yield alarm().opacity(0, 0);
	yield pillbottle_cap().bottom([0, -299], 0);
	yield pillbottle_cap().size.y(50, 0.155);
	yield pillbottle().radius(64, 0.155);
	yield* txt_feelinalright().opacity(0, 0);
	yield txt_feelinalright().opacity(1);

	yield* waitUntil("fever - 100");
	yield sequence(
		0.13,
		...txt_100().subtext.map((text) =>
			any(text.opacity(1, 0.1), text.scale([1, 1], 0.267, easeOutBounce)),
		),
	);

	yield* waitUntil("feel - feeling move up");
	yield all(
		pillbottle().rotation(-90, 0.3125, easeInOutBack),
		pillbottle_cap().bottom([-152, -600], 0.3125, easeInQuad),
		chain(
			pillbottle_cap().rotation(-45, 0.156, easeInQuad),
			pillbottle_cap().rotation(-90, 0.156, easeOutBounce),
		),
	);
	const feelingalright_trans: TimingFunction = easeInOutExpo;
	yield chain(
		waitUntil("feel - and"),
		txt_feelinalright().position.x(130, 0.1, feelingalright_trans),
		waitUntil("feel - I'm"),
		txt_feelinalright().position.x(-50, 0.1, feelingalright_trans),
		waitUntil("feel - feeling"),
		txt_feelinalright().position.x(-570, 0.3, feelingalright_trans),
		waitUntil("feel - alright"),
		txt_feelinalright().position.x(-1100, 0.3, feelingalright_trans),
		waitUntil("feel - out"),
		any(pillbottle().position.y(1300, 0.25), waitFor(0)),
		txt_feelinalright().position.x(-1800, 0.2, feelingalright_trans),
	);
	//TODO: Animate the label using the advanced split TXT used in part 1
}
