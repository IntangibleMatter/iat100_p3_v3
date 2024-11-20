import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";
import { PFTxt } from "../components/PFTxt";
import { colour_00, colour_01, colour_bg, colour_fg } from "../defs/theme";

export default makeScene2D(function* (view) {
	const text = createRef<Txt>();
	view.add(<Rect size={[1920, 1080]} fill={colour_bg} />);
	view.add(
		<PFTxt ref={text} fill={colour_01}>
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
	);

	yield* waitFor(40);
});
