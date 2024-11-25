import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { PFTxt } from "../components/PFTxt";
import { change_palette, colours, pal_blk_aqu4 } from "../defs/theme";

export default makeScene2D(function* (view) {
	const text = createRef<Txt>();
	const text2 = createRef<Txt>();
	view.add(<Rect size={[1920, 1080]} fill={colours.c_bg} />);
	view.add(
		<PFTxt
			ref={text}
			fill={colours.c_fg}
			position={[0, -256]}
			offset={[0, 0]}
			textAlign={"center"}
			fontSize={48}
		/>,
	);
	view.add(
		<PFTxt
			ref={text2}
			fill={colours.c_01}
			position={[0, 256]}
			offset={[0, 0]}
			textAlign={"center"}
			fontSize={32}
			lineHeight={64}
		/>,
	);

	/*	view.add(
		<PFTxt ref={text} fill={colours.c_01}>
			{
				"Oh, it's easy, I lost to time\n\
Got a fever of a hundred and I'm feeling alright\n\
Made it outta life in prison without even a fine\n\
Made it out with no convictions, I like to be bright\n\n\
I-I-I-I-I will find you in the nightlife\n\
I-I-I will kill you in my next life\n\
I-I sell the all new nine to five -i-i-i-ive\n\
You stole just what I need\n\
Attacking vertical 1234567890"
			}
		</PFTxt>,
	);*/
	/*
	yield* waitUntil("made it out with no");
	yield text().text("Made it out with no convictions\nI like to be bright", 0.125);
	yield text2().text(
		"Prison bars leave screen, heavy bloom on\n'BRIGHT' washing out screen to next transition",
		0.125,
	);
	yield* waitUntil("Verse 2");
	yield text().text("Oh, it's easy, I lost to time", 0.125);
	yield text2().text("Words displayed on a digital clock\nusing 7-segment display font", 0.125);

	*/
	yield* waitUntil("v2 - got a fever");
	yield text().text("Got a fever of 100 and\nI'm feeling alright", 0.125);
	yield text2().text(
		"Digital thermometer, using screen of\ndigital clock to transition between the two",
		0.125,
	);

	yield* waitUntil("v2 - made it outta life");
	yield text().text("Made it outta life in prison\nwithout even a fine", 0.125);
	yield text2().text(
		"characters w/ vertical bars (I, l, t,...)\nexpand to become prison bars\n\n'o' in outta is part of handcuffs hanging",
		0.125,
	);
	yield* waitUntil("v2 - made it out w no");
	yield text().text("Made it out with no convictions,\nI like to be bright", 0.125);
	yield text2().text("camera pan down, bottom handcuff opens", 0.125);

	yield* waitUntil("nightlife");
	yield change_palette(pal_blk_aqu4, 0.25);
	yield text().text("I-I-I-I-I will find you in the nightlife", 0.125);
	yield text2().text(
		"Streetlamps turn on in time with\nwords to reveal the words in the dark",
		0.125,
	);

	yield* waitUntil("kill");
	yield text().text("I-I-I will kill you in my next life", 0.125);
	yield text2().text("pan to dark alley, reveal knife in dark", 0.125);

	yield* waitUntil("sell");
	yield text().text("I-I sell the all new\nnine to five -i-i-i-ive", 0.125);
	yield text2().text("zoom out to skyline, day/night cycle rotates", 0.125);

	yield* waitUntil("stole");
	yield text().text("You stole just what I need", 0.125);
	yield text2().text("use sun or moon as 'o' in stole", 0.125);

	yield* waitUntil("chorus- attacking");
	yield text().text("Attacking vertical", 0.125);
	yield text2().text("screen rotates 90 degrees, show text vertically", 0.125);

	yield* waitUntil("permission");
	yield text().text("I give permission for the right price", 0.125);
	yield text2().text("Price is right font gag", 0.125);

	yield* waitUntil("mission");
	yield text().text("I'm on a mission,\ngonna act right -right -right", 0.125);
	yield text2().text("'right' repeats itself stacking downwards", 0.125);

	yield* waitUntil("decision");
	yield text().text("Make no decision per the deadline", 0.125);
	yield text2().text("calendar, events written on for words", 0.125);

	yield* waitUntil("valid fight");
	yield text().text("You've got a valid fight\nattacking vertical", 0.125);
	yield text2().text(
		"text changes to 'attacking vertical'\nwhile rotating so the text blockis vertical",
	);
	yield* waitFor(4);
});
