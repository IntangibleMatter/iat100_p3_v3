import {
	computed,
	initial,
	Layout,
	makeScene2D,
	Node,
	Shape,
	ShapeProps,
	signal,
	Txt,
} from "@motion-canvas/2d";
import {
	createRef,
	createSignal,
	sequence,
	SimpleSignal,
	ThreadGenerator,
	useLogger,
	waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
	const text = createRef<SplitText>();
	const otherText = createRef<Txt>();

	view.fontSize(64);

	view.add(
		<>
			<Txt text={"Hello World"} y={100} ref={otherText} />
			<SplitText text={"Hello World"} separator="" ref={text} />
		</>,
	);

	// Some bug here; the proxy text layout doesn't work until the node is rerendered;
	// probably some issue with the proxy holder.
	// yield;
	text().opacity(0);
	yield* text().opacity(1, 1);

	yield* text().doAnimation(function* (txts: Txt[]) {
		yield* sequence(0.2, ...txts.map((txt) => txt.y(-32, 1).to(32, 2).back(1)));
	});

	yield* waitUntil("test");
});

export interface SplitTextProps extends ShapeProps {
	text?: string;
	separator?: string;
}

export class SplitText extends Shape {
	@signal()
	public declare readonly text: SimpleSignal<string>;

	@signal()
	public declare readonly separator: SimpleSignal<string>;

	protected proxyHolder: Layout;
	protected proxies: SimpleSignal<Layout[]>;

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

	@computed()
	getTextNodePairs(): { node: Node; text: Txt }[] {
		this.proxies([]);
		return this.text()
			.split(this.separator())
			.map((word) => {
				const text = new Txt({ text: `​${word}${this.separator()}​` });

				this.requestFontUpdate();
				this.applyStyle(this.canvas);
				this.applyText(this.canvas);

				this.canvas.font = `${this.lastSetFontSize()}px ${this.fontFamily()}`;
				this.canvas.textBaseline = "bottom";
				if ("letterSpacing" in this.canvas) {
					this.canvas.letterSpacing = `${this.letterSpacing()}px`;
				}

				const size = this.canvas.measureText(`${word}${this.separator()}`);

				const positionProxy = new Layout({
					size: size.width,
					key: `${text.key} proxy`,
				});
				this.proxies(this.proxies().concat(positionProxy));

				const node = new Node({
					children: [text],
					position: () => [positionProxy.position.x(), 0],
				});
				return { node, text };
			});
	}

	constructor(props: SplitTextProps) {
		super({
			...props,
		});

		this.canvas = document.createElement("canvas").getContext("2d");
		this.proxies = createSignal<Layout[]>([]);

		this.proxyHolder = new Layout({
			key: this.key + " proxy holder",
			children: this.proxies,
			layout: true,
		});

		this.getTextNodePairs();
		this.children(() => this.getTextNodePairs().map(({ node }) => node) ?? []);
	}

	public draw(context: CanvasRenderingContext2D): void {
		this.proxyHolder.render(context);
		super.draw(context);
	}

	public *doAnimation(fn: (txts: Txt[]) => ThreadGenerator) {
		yield* fn(
			this.getTextNodePairs().map(({ text, node }) => {
				const proxy = new Proxy(text, {
					get(target, prop, receiver) {
						if (prop === "position") {
							return node.position;
						}
						return Reflect.get(target, prop, receiver);
					},
				});
				return proxy;
			}),
		);
	}
}
