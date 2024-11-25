import { Layout, makeScene2D, Rect, Txt, withDefaults } from "@motion-canvas/2d";
import { chain, createRef, loop, sequence, waitFor, waitUntil } from "@motion-canvas/core";
import { colours } from "../defs/theme";

const STxt = withDefaults(Txt, {
	fill: colours.c_00,
	fontFamily: "'16 Segments'",
	fontSize: 256,
});

export default makeScene2D(function* (view) {
	const bg = createRef<Rect>();
	const alarm = createRef<Layout>();
	const txt_alarm = createRef<Txt>();

	view.add(<Rect ref={bg} fill={colours.c_fg} size={[1920, 1080]} />);
	view.add(
		<Layout ref={alarm} position={[0, -800]}>
			<Rect fill={colours.c_bg} size={[1000, 400]} radius={32}>
				<Rect stroke={colours.c_fg} lineWidth={4} size={[900, 333]} radius={32}>
					<STxt ref={txt_alarm} fill={colours.c_bg} text={"oh:​ ​ ​"} textAlign={"right"} />
				</Rect>
			</Rect>
		</Layout>,
	);

	yield* waitFor(0.167);
	yield loop(Infinity, () =>
		chain(alarm().scale([1.0, 1.0], 0), alarm().scale([1.1, 1.1], 0.3125)),
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
		//waitUntil("oie - end"),
		//txt_alarm().text("​ ​ : ​ ​", 0),
	);

	yield* waitUntil("v2 end");
});
