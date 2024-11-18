import { Circle, Line, Rect, Shape, ShapeProps } from "@motion-canvas/2d";
import { colour_fg } from "../defs/theme";
import {
	createRef,
	createRefArray,
	easeInCubic,
	easeOutCubic,
	easeOutQuint,
	sequence,
	Vector2,
} from "@motion-canvas/core";

export class WaterDrop extends Shape {
	private readonly drop = createRef<Circle>();
	private readonly concentric = createRefArray<Circle>();

	public constructor(props?: ShapeProps) {
		if (!props.fill) {
			props.fill = colour_fg;
		}
		super({ ...props });
		this.add(<Circle ref={this.drop} />);
	}

	public *dropAt(position: Vector2) {
		this.drop().position([position.x, -640]);
		yield* this.drop().position(position, 0.167, easeInCubic);
		this.drop().opacity(0);
		sequence(
			0.0667,
			...this.concentric.map(function* (con) {
				con.position(position);
				con.size([0, 0]);
				yield con.size([128, 128], 0.25, easeOutCubic);
				yield con.opacity(0, 0.25, easeOutQuint);
			}),
		);
	}
}
