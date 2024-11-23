import { Circle, Line, Rect, Shape, ShapeProps } from "@motion-canvas/2d";
import { colours } from "../defs/theme";
import {
	any,
	createRef,
	createRefArray,
	easeInCubic,
	easeOutCubic,
	easeOutQuint,
	linear,
	makeRef,
	map,
	range,
	sequence,
	useLogger,
	usePlayback,
	Vector2,
	waitFor,
} from "@motion-canvas/core";

export class WaterDrop extends Shape {
	private readonly drop = createRef<Circle>();
	private readonly concentric = createRefArray<Circle>();

	public constructor(props?: ShapeProps) {
		if (!props.fill) {
			props.fill = colours.c_fg;
		}
		super({ ...props });
		this.add(<Circle ref={this.drop} fill={this.fill} size={[64, 64]} y={-640} />);
		range(3).map(() => this.add(<Circle ref={this.concentric} stroke={this.fill} lineWidth={8} />));
	}

	public *dropAt(position: Vector2, timeFromNow: number, targetSize: number = 1024) {
		const logger = useLogger();
		const playback = usePlayback();
		logger.debug(`Dropping to position (${position.x}, ${position.y}) in ${timeFromNow}s`);
		this.drop().position([position.x, -640]);
		if (timeFromNow - 0.25 > 0) {
			yield* waitFor(timeFromNow - 0.25);
		}
		this.drop().opacity(1);
		this.drop().size([128, 128]);
		let waitTime = timeFromNow - 0.25 < 0 ? timeFromNow : 0.25;
		yield* this.drop().position(position, waitTime, easeInCubic);
		yield this.drop().size([0, 0], 0.1);
		this.drop().opacity(0);
		if (targetSize != 1340) {
			yield* sequence(
				0.1,
				...this.concentric.map(function* (con) {
					logger.debug(`circle of ${con}`);
					con.position(position);
					con.size([16, 16]);
					con.opacity(1);
					con.lineWidth(8);

					yield* any(
						con.size([targetSize, targetSize], 1.0, easeOutCubic),
						con.opacity(0, 0.9, easeOutCubic),
						con.lineWidth(1, 0.9, easeOutCubic),
					);
				}),
			);
		} else {
			let con = this.concentric[0];
			con.position(position);
			con.size([16, 16]);
			con.opacity(1);
			con.lineWidth(8);
			yield con.size([targetSize, targetSize], 0.4, easeOutCubic);
			yield con.lineWidth(16, 0.4, easeOutCubic);
			yield* waitFor(0.9);
		}
	}
}
