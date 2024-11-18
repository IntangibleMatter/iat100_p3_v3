import { Circle, Line, Rect, Shape, ShapeProps } from "@motion-canvas/2d";
import { colour_fg } from "../defs/theme";
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
			props.fill = colour_fg;
		}
		super({ ...props });
		this.add(<Circle ref={this.drop} fill={this.fill} size={[64, 64]} y={-640} />);
		range(3).map(() => this.add(<Circle ref={this.concentric} stroke={this.fill} lineWidth={8} />));
	}

	public *dropAt(position: Vector2, timeFromNow: number) {
		const logger = useLogger();
		const playback = usePlayback();
		logger.debug(`Dropping to position (${position.x}, ${position.y}) in ${timeFromNow}s`);
		this.drop().position([position.x, -640]);
		if (timeFromNow - 0.25 > 0) {
			yield* waitFor(timeFromNow - 0.25);
		}
		this.drop().opacity(1);
		this.drop().size([64, 64]);
		let waitTime = timeFromNow - 0.25 < 0 ? timeFromNow : 0.25;
		yield* this.drop().position(position, waitTime, easeInCubic);
		yield this.drop().size([0, 0], 0.1);
		this.drop().opacity(0);
		yield* sequence(
			0.1,
			...this.concentric.map(function* (con) {
				logger.debug(`circle of ${con}`);
				con.position(position);
				con.size([16, 16]);
				con.opacity(1);
				con.lineWidth(8);
				yield* any(
					con.size([256, 256], 0.7, easeOutCubic),
					con.opacity(0, 0.6, linear),
					con.lineWidth(1, 0.6, linear),
				);
			}),
		);
	}
}
