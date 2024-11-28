import {
	colorSignal,
	CubicBezier,
	initial,
	Layout,
	LayoutProps,
	Node,
	Polygon,
	Rect,
	signal,
	Txt,
} from "@motion-canvas/2d";
import {
	ColorSignal,
	createRef,
	PossibleColor,
	SignalValue,
	SimpleSignal,
} from "@motion-canvas/core";
import { colours } from "../defs/theme";
import { PFTxt } from "./PFTxt";

export interface StreeLightProps extends LayoutProps {
	text?: SignalValue<String>;
	lightColour?: SignalValue<PossibleColor>;
	textColour?: SignalValue<PossibleColor>;
	lampColour?: SignalValue<PossibleColor>;
	lightWidth?: SignalValue<number>;
}

export class StreetLight extends Layout {
	@initial("")
	@signal()
	public declare readonly text: SimpleSignal<string, this>;

	@initial(colours.c_03)
	@colorSignal()
	public declare readonly lightColour: ColorSignal<this>;

	@initial(colours.c_02)
	@colorSignal()
	public declare readonly textColour: ColorSignal<this>;

	@initial(colours.c_01)
	@colorSignal()
	public declare readonly lampColour: ColorSignal<this>;

	@initial(256)
	@signal()
	public declare readonly lightWidth: SimpleSignal<number, this>;

	private readonly textDisplay = createRef<Txt>();
	private readonly textMask = createRef<Polygon>();
	private readonly light = createRef<Polygon>();
	private readonly lightBottom = createRef<CubicBezier>();
	private readonly lampTop = createRef<CubicBezier>();
	private readonly lampBot = createRef<CubicBezier>();

	private readonly lightHeight = 880;

	public constructor(props?: StreeLightProps) {
		super({ ...props });

		this.add(
			<Polygon
				lineCap={"square"}
				ref={this.light}
				width={this.lightWidth}
				height={this.lightHeight}
				sides={3}
				fill={() => this.lightColour().alpha(0.95)}
				position={[0, -100]}
			/>,
		);
		this.add(
			<CubicBezier
				ref={this.lightBottom}
				fill={() => this.lightColour().alpha(0.95)}
				p0={() => this.light().vertex(2).sub([0, 1])}
				p1X={() => this.light().vertex(2).x}
				p1Y={() => this.light().vertex(2).y + 10}
				p2X={() => this.light().vertex(1).x}
				p2Y={() => this.light().vertex(1).y + 10}
				p3={() => this.light().vertex(1).sub([0, 1])}
				position={this.light().position}
			/>,
		);
		this.add(
			<Layout position={[0, 0]} cache offset={[1, 1]} cachePadding={1000}>
				<Polygon
					ref={this.textMask}
					fill={"white"}
					width={this.light().width}
					height={this.light().height}
					position={this.light().position}
					sides={3}
				/>
				<PFTxt
					ref={this.textDisplay}
					fill={this.textColour}
					text={this.text}
					compositeOperation={"source-in"}
					offset={[0, 0]}
					fontSize={96}
				/>
			</Layout>,
		);
	}
}
