import { Camera, CubicBezier, makeScene2D, Polygon, Rect } from "@motion-canvas/2d";
import { PFTxt } from "../components/PFTxt";
import {
	createRef,
	createRefArray,
	createRefMap,
	createSignal,
	easeInOutSine,
	easeOutBack,
	loopUntil,
	PossibleVector2,
	waitUntil,
} from "@motion-canvas/core";
import {
	change_palette,
	colours,
	pal_arq4,
	pal_bicycle_gb,
	pal_bittersweet,
	pal_crimson,
	pal_deuteraruzi,
	pal_heart4,
	pal_twilight5,
} from "../defs/theme";
import { StreetLight } from "../components/Lamp";

const bg = createRef<Rect>();
const camera = createRef<Camera>();
const streetlights = createRefMap<StreetLight>();
const txt_offset = createSignal<number>();

export default makeScene2D(function* (view) {
	yield txt_offset(1416, 0);
	yield change_palette(pal_deuteraruzi, 0.1);
	view.add(<Rect ref={bg} size={[1920, 1080]} fill={colours.c_bg} />);
	/*	view.add(
		<Camera ref={camera}>
			<Rect size={[64, 64]} position={[-600, 128]} fill={colours.c_00} />
			<Rect size={[64, 64]} position={[-600, 192]} fill={colours.c_01} />
			<Rect size={[64, 64]} position={[-600, 256]} fill={colours.c_02} />
			<Rect size={[64, 64]} position={[-600, 320]} fill={colours.c_03} />
			<Rect size={[64, 64]} position={[-600, 384]} fill={colours.c_04} />
			<Rect size={[64, 64]} position={[-600, 448]} fill={colours.c_05} />
		</Camera>,
	);*/
	view.add(
		<StreetLight
			ref={streetlights.i}
			lightColour={colours.c_03}
			text={"I"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() - 1416}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.will}
			lightColour={colours.c_03}
			text={"will"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() - 1116}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.find}
			lightColour={colours.c_03}
			text={"find"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() - 672}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.you}
			lightColour={colours.c_03}
			text={"you"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() - 252}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.in}
			lightColour={colours.c_03}
			text={"in"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() + 60}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.the}
			lightColour={colours.c_03}
			text={"the"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() + 357}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.night}
			lightColour={colours.c_03}
			text={"night"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() + 816}
		/>,
	);
	view.add(
		<StreetLight
			ref={streetlights.life}
			lightColour={colours.c_03}
			text={"life"}
			textColour={colours.c_02}
			lightWidth={0}
			x={() => txt_offset() + 1299}
		/>,
	);
	/*view.add(
		<PFTxt
			x={txt_offset}
			opacity={0.5}
			fontSize={96}
			fill={"red"}
			text={"I will find you in the night life"}
		/>,
	);*/
	yield* waitUntil("i");
	yield* loopUntil("i end", () => streetlights.i().lightWidth(100, 0.15).to(0, 0));
	yield streetlights.i().lightWidth(300, 0.15);
	yield* waitUntil("will");
	yield streetlights.will().lightWidth(580, 0.25, easeOutBack);
	yield txt_offset(1116, 0.15, easeInOutSine);
	yield* waitUntil("find");
	yield streetlights.find().lightWidth(650, 0.2, easeOutBack);
	yield txt_offset(672, 0.1, easeInOutSine);
	yield* waitUntil("you");
	yield streetlights.you().lightWidth(500, 0.25, easeOutBack);
	yield txt_offset(252, 0.1, easeInOutSine);
	yield* waitUntil("in");
	yield streetlights.in().lightWidth(400, 0.15, easeOutBack);
	yield txt_offset(60, 0.1, easeInOutSine);
	yield* waitUntil("the");
	yield streetlights.the().lightWidth(500, 0.25, easeOutBack);
	yield txt_offset(-357, 0.1, easeInOutSine);
	yield* waitUntil("night");
	yield streetlights.night().lightWidth(750, 0.3, easeOutBack);
	yield txt_offset(-816, 0.15, easeInOutSine);
	yield* waitUntil("life");
	yield streetlights.life().lightWidth(640, 0.3, easeOutBack);
	yield txt_offset(-1299, 0.2, easeInOutSine);
	//yield camera().position([256, 256], 0.5);
	yield* waitUntil("willfind end");
});
