import {
	computed,
	initial,
	Layout,
	Node,
	NodeProps,
	Rect,
	Shape,
	ShapeProps,
	signal,
	Txt,
	TxtProps,
} from "@motion-canvas/2d";
import {
	createRefArray,
	ReferenceArray,
	SignalValue,
	SimpleSignal,
	ThreadGenerator,
	useLogger,
} from "@motion-canvas/core";

export interface SplitTxtProps extends ShapeProps {
	text?: SignalValue<string>;
	separator?: SignalValue<string>;
	subProps?: TxtProps;
}

export class ShapeContainer extends Shape {
	public constructor(props?: ShapeProps) {
		super({ ...props });
	}
}

export class SplitTxt extends Shape {
	@initial("")
	@signal()
	public declare readonly separator: SimpleSignal<string, this>;
	@initial("")
	@signal()
	public declare readonly text: SimpleSignal<string, this>;
	public declare readonly subtext: ReferenceArray<Txt>;
	protected canvas: CanvasRenderingContext2D;

	@computed()
	lastSetFontSize() {
		let curr: Layout = this;
		while (curr.fontSize.isInitial()) {
			const parent = curr.parent();
			if (parent instanceof Layout) {
				curr = parent;
			} else {
				break;
			}
		}
		return curr.fontSize();
	}

	public constructor(props?: SplitTxtProps) {
		const logger = useLogger();
		super({
			layout: true,
			...props,
		});
		this.subtext = createRefArray<Txt>();
		this.canvas = document.createElement("canvas").getContext("2d");
		this.requestFontUpdate();
		this.applyStyle(this.canvas);
		this.applyText(this.canvas);
		this.canvas.font = `${this.lastSetFontSize()}px ${this.fontFamily}`;

		const size = this.canvas.measureText(`${props.text.toString()}`);

		this.setWidth(size.width);

		logger.debug(`Props.text: ${props.text.toString()}`);
		logger.debug(`Props.separator: "${props.separator.toString()}"`);
		props.text
			.toString()
			.split(props.separator.toString())
			.map((word) => {
				let nnode = new Node({});

				this.requestFontUpdate();
				this.applyStyle(this.canvas);
				this.applyText(this.canvas);
				this.canvas.font = `${this.lastSetFontSize()}px ${this.fontFamily}`;

				const size = this.canvas.measureText(`${word}${props.separator.toString()}`);
				logger.debug(`The text ${word}${props.separator.toString()} is ${size.width}px wide`);

				let ntxt = new Txt({
					...props.subProps,
					//minWidth: size.width,
					text: `​${word}${props.separator.toString()}​`,
				});
				//nnode.add(ntxt);
				this.subtext.push(ntxt);
				this.add(ntxt);
				logger.debug(`adding ${word}, ${this.subtext.length}`);
				logger.debug(`ntxt position: (${ntxt.position.x()}, ${ntxt.position.y()})`);
			});
		logger.debug(`Subtext size: ${this.subtext.length}`);
	}
}
