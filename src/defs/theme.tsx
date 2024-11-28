import {
	Color,
	SimpleSignal,
	createSignal,
	TimingFunction,
	tween,
	waitFor,
	easeInOutCubic,
	PossibleColor,
	createEaseInBack,
} from "@motion-canvas/core";

interface ColourPalette {
	c_fg: SimpleSignal<PossibleColor>;
	c_bg: SimpleSignal<PossibleColor>;
	c_00: SimpleSignal<PossibleColor>;
	c_01: SimpleSignal<PossibleColor>;
	c_02?: SimpleSignal<PossibleColor>;
	c_03?: SimpleSignal<PossibleColor>;
	c_04?: SimpleSignal<PossibleColor>;
	c_05?: SimpleSignal<PossibleColor>;
	c_06?: SimpleSignal<PossibleColor>;
	c_07?: SimpleSignal<PossibleColor>;
	c_08?: SimpleSignal<PossibleColor>;
	c_09?: SimpleSignal<PossibleColor>;
}

// Fuzzyfour by P-Tux7 : https://lospec.com/palette-list/fuzzyfour
export const pal_fuzzyfour: ColourPalette = {
	c_fg: createSignal(new Color("#fffdaf")),
	c_bg: createSignal(new Color("#302387")),
	c_00: createSignal(new Color("#ff3796")),
	c_01: createSignal(new Color("#00faac")),
};

export const pal_fuzzyfour_dupe: ColourPalette = {
	c_fg: createSignal(new Color("#fffdaf")),
	c_bg: createSignal(new Color("#302387")),
	c_00: createSignal(new Color("#ff3796")),
	c_01: createSignal(new Color("#00faac")),
};

// Lava-GB by Aero : https://lospec.com/palette-list/lava-gb
export const pal_lavagb: ColourPalette = {
	c_fg: createSignal(new Color("#ff8e80")),
	c_bg: createSignal(new Color("#051f39")),
	c_00: createSignal(new Color("#4a2480")),
	c_01: createSignal(new Color("#c53a9d")),
};

// Kankei4 by un_deady : https://lospec.com/palette-list/kankei4
export const pal_kaneki: ColourPalette = {
	c_fg: createSignal(new Color("#ffffff")),
	c_bg: createSignal(new Color("#060608")),
	c_00: createSignal(new Color("#f42e1f")),
	c_01: createSignal(new Color("#2f256b")),
};

// BLK Aqu4 by BurakoIRL : https://lospec.com/palette-list/blk-aqu4
export const pal_blk_aqu4: ColourPalette = {
	c_fg: createSignal(new Color("#9ff4e5")),
	c_bg: createSignal(new Color("#002b59")),
	c_00: createSignal(new Color("#00b9be")),
	c_01: createSignal(new Color("#005f8c")),
};

// Spacehaze by WildLeoKnight : https://lospec.com/palette-list/spacehaze
export const pal_spacehaze: ColourPalette = {
	c_fg: createSignal(new Color("#f8e3c4")),
	c_bg: createSignal(new Color("#0b0630")),
	c_00: createSignal(new Color("#cc3495")),
	c_01: createSignal(new Color("#6b1fb1")),
};

// Bittersweet by Porcirelius : https://lospec.com/palette-list/bittersweet
export const pal_bittersweet: ColourPalette = {
	c_fg: createSignal(new Color("#a3a29a")),
	c_bg: createSignal(new Color("#282328")),
	c_00: createSignal(new Color("#c56981")),
	c_01: createSignal(new Color("#545c7e")),
};

// Crimson by WildLeoKnight : https://lospec.com/palette-list/crimson
export const pal_crimson: ColourPalette = {
	c_fg: createSignal(new Color("#eff9d6")),
	c_bg: createSignal(new Color("#1b0326")),
	c_00: createSignal(new Color("#7a1c4b")),
	c_01: createSignal(new Color("#ba5044")),
};

// AYY4 by Polyducks : https://lospec.com/palette-list/ayy4
export const pal_ayy4: ColourPalette = {
	c_fg: createSignal(new Color("#f1f2da")),
	c_bg: createSignal(new Color("#00303b")),
	c_00: createSignal(new Color("#ff7777")),
	c_01: createSignal(new Color("#ffce96")),
};

// Ice Cream GB by Kerrie Lake : https://lospec.com/palette-list/ice-cream-gb
export const pal_icecream_gb: ColourPalette = {
	c_fg: createSignal(new Color("#fff6d3")),
	c_bg: createSignal(new Color("#7c3f58")),
	c_00: createSignal(new Color("#eb6b6f")),
	c_01: createSignal(new Color("#f9a875")),
};

// Bicycle GB by Beaquen : https://lospec.com/palette-list/bicycle
export const pal_bicycle_gb: ColourPalette = {
	c_fg: createSignal(new Color("#f0f0f0")),
	c_bg: createSignal(new Color("#161616")),
	c_00: createSignal(new Color("#ab4646")),
	c_01: createSignal(new Color("#8f9bf6")),
};

// Twilight 5 by Star : https://lospec.com/palette-list/twilight-5
export const pal_twilight5: ColourPalette = {
	c_fg: createSignal(new Color("#fbbbad")),
	c_bg: createSignal(new Color("#292831")),
	c_00: createSignal(new Color("#ee8695")),
	c_01: createSignal(new Color("#4a7a96")),
	c_02: createSignal(new Color("#33ff58")),
};

// Blessing by まるき : https://lospec.com/palette-list/blessing
export const pal_blessing: ColourPalette = {
	c_fg: createSignal(new Color("#f7ffae")),
	c_bg: createSignal(new Color("#74569b")),
	c_00: createSignal(new Color("#ffb3cb")),
	c_01: createSignal(new Color("#96fbc7")),
	c_02: createSignal(new Color("#d8bfd8")),
};

// Hollow by Poltergasm : https://lospec.com/palette-list/hollow
export const pal_hollow: ColourPalette = {
	c_fg: createSignal(new Color("#fafbf6")),
	c_bg: createSignal(new Color("#0f0f1b")),
	c_00: createSignal(new Color("#565a75")),
	c_01: createSignal(new Color("#c6b7be")),
};

// Arq4 by ENDESGA: https://lospec.com/palette-list/arq4
export const pal_arq4: ColourPalette = {
	c_fg: createSignal(new Color("#ffffff")),
	c_bg: createSignal(new Color("#000000")),
	c_00: createSignal(new Color("#3a3277")),
	c_01: createSignal(new Color("#6772a9")),
};

// Heart4 by Lavenfurr: https://lospec.com/palette-list/heart4
export const pal_heart4: ColourPalette = {
	c_fg: createSignal(new Color("#ebe5ce")),
	c_bg: createSignal(new Color("#3e2653")),
	c_00: createSignal(new Color("#ff4589")),
	c_01: createSignal(new Color("#a64777")),
};

// PurpleDawn by WildLeoKnight: https://lospec.com/palette-list/purpledawn
export const pal_purpledawn: ColourPalette = {
	c_fg: createSignal(new Color("#eefded")),
	c_bg: createSignal(new Color("#001b2e")),
	c_00: createSignal(new Color("#9a7bbc")),
	c_01: createSignal(new Color("#2d757e")),
};

// CGA High
export const pal_cga_hi: ColourPalette = {
	c_fg: createSignal(new Color("#ffffff")),
	c_bg: createSignal(new Color("#000000")),
	c_00: createSignal(new Color("#ff55ff")),
	c_01: createSignal(new Color("#55ffff")),
};

// Neon Night Sky by SoundsDotZip : https://lospec.com/palette-list/neon-night-sky
export const pal_neonnightsky: ColourPalette = {
	c_bg: createSignal("#131626"),
	c_fg: createSignal("#ffe6ea"),
	c_00: createSignal("#e6a1cf"),
	c_01: createSignal("#4d4d80"),
};

// FLORESCENCE by Miguel Lucero : https://lospec.com/palette-list/florescence
export const pal_florescence: ColourPalette = {
	c_bg: createSignal("#311f5f"),
	c_fg: createSignal("#edffb1"),
	c_00: createSignal("#1687a7"),
	c_01: createSignal("#1fd5bc"),
};

// [Digital Fractal] by Cabezinu : https://lospec.com/palette-list/digital-fractal
export const pal_digitalfractal: ColourPalette = {
	c_fg: createSignal("#ffffff"),
	c_bg: createSignal("#090a12"),
	c_00: createSignal("#f0bbc2"),
	c_01: createSignal("#87717d"),
	c_02: createSignal("#22203c"),
};

// Bluuberry Donut GB by ZenithEdge : https://lospec.com/palette-list/bluuberry-donut-gb
export const pal_bluuberry_donut_gb: ColourPalette = {
	c_bg: createSignal("#080b12"),
	c_fg: createSignal("#f8f5ff"),
	c_00: createSignal("#26213e"),
	c_01: createSignal("#635c84"),
};

// Oxenfreenite by JMPH : https://lospec.com/palette-list/oxenfreenite
export const pal_oxenfreenite: ColourPalette = {
	c_bg: createSignal("#111a24"),
	c_fg: createSignal("#83b5b5"),
	c_00: createSignal("#a02342"),
	c_01: createSignal("#102e58"),
	c_02: createSignal("#11767f"),
};

// Noelle's Room by Yousurname : https://lospec.com/palette-list/noelles-room
export const pal_noellesroom: ColourPalette = {
	c_bg: createSignal("#000000"),
	c_fg: createSignal("#9fe8ff"),
	c_00: createSignal("#74bff8"),
	c_01: createSignal("#6aa3cc"),
	c_02: createSignal("#517184"),
	c_03: createSignal("#364e5e"),
};

// Bronze Star by ATB Man : https://lospec.com/palette-list/bronze-star
export const pal_bronzestar: ColourPalette = {
	c_bg: createSignal("#14305f"),
	c_fg: createSignal("#cfaf5f"),
	c_00: createSignal("#305f7b"),
	c_01: createSignal("#bf9f00"),
};

// The Dark by ATB Man : https://lospec.com/palette-list/the-dark
export const pal_thedark: ColourPalette = {
	c_bg: createSignal("#0c0421"),
	c_fg: createSignal("#ecfffb"),
	c_00: createSignal("#858f97"),
	c_01: createSignal("#323859"),
	c_02: createSignal("#576373"),
};

// The Rain by ATB Man : https://lospec.com/palette-list/the-rain
export const pal_therain: ColourPalette = {
	c_bg: createSignal("#040821"),
	c_00: createSignal("#2d4261"),
	c_01: createSignal("#4b6677"),
	c_02: createSignal("#738b9e"),
	c_fg: createSignal("#c7f8f7"),
};

// sexy04 by green guy : https://lospec.com/palette-list/sexy04
export const pal_sexy04: ColourPalette = {
	c_bg: createSignal("#141852"),
	c_fg: createSignal("#dac4b9"),
	c_00: createSignal("#9e2e9d"),
	c_01: createSignal("#e779a0"),
};

// Deuteraruzi by therkb : https://lospec.com/palette-list/deuteraruzi
export const pal_deuteraruzi: ColourPalette = {
	c_bg: createSignal("#010027"),
	c_fg: createSignal("#f1f2e1"),
	c_00: createSignal("#2f057d"),
	c_01: createSignal("#0d1be6"),
	c_02: createSignal("#7b9af3"),
	c_03: createSignal("#edf37b"),
	c_04: createSignal("#e6bc0d"),
	c_05: createSignal("#a06b1f"),
};

export var colours: ColourPalette = {
	...pal_fuzzyfour_dupe,
	c_02: createSignal(new Color("#ffffff")),
	c_03: createSignal(new Color("#ffffff")),
	c_04: createSignal(new Color("#ffffff")),
	c_05: createSignal(new Color("#ffffff")),
	c_06: createSignal(new Color("#ffffff")),
	c_07: createSignal(new Color("#ffffff")),
	c_08: createSignal(new Color("#ffffff")),
	c_09: createSignal(new Color("#ffffff")),
};

export function* change_palette(to: ColourPalette, time: number, easing = easeInOutCubic) {
	if (colours.c_fg != to.c_fg) {
		yield colours.c_fg(to.c_fg, time, easing);
	}
	if (colours.c_bg != to.c_bg) {
		yield colours.c_bg(to.c_bg, time, easing);
	}
	if (colours.c_00 != to.c_00) {
		yield colours.c_00(to.c_00, time, easing);
	}
	if (colours.c_01 != to.c_01) {
		yield colours.c_01(to.c_01, time, easing);
	}
	if (to.c_02) {
		yield colours.c_02(to.c_02, time, easing);
	}
	if (to.c_03) {
		yield colours.c_03(to.c_03, time, easing);
	}
	if (to.c_04) {
		yield colours.c_04(to.c_04, time, easing);
	}
	if (to.c_05) {
		yield colours.c_05(to.c_05, time, easing);
	}
	if (to.c_06) {
		yield colours.c_06(to.c_06, time, easing);
	}
	if (to.c_07) {
		yield colours.c_07(to.c_07, time, easing);
	}
	if (to.c_08) {
		yield colours.c_08(to.c_08, time, easing);
	}
	if (to.c_09) {
		yield colours.c_09(to.c_09, time, easing);
	}

	yield* waitFor(time);
}

export function* reset_palette() {
	yield colours.c_00(pal_fuzzyfour.c_00, 0.625);
	yield colours.c_01(pal_fuzzyfour.c_01, 0.625);
	yield colours.c_bg(pal_fuzzyfour.c_bg, 0.625);
	yield colours.c_fg(pal_fuzzyfour.c_fg, 0.625);

	yield colours.c_02(new Color("#ffffff"));
	yield colours.c_03(new Color("#ffffff"));
	yield colours.c_04(new Color("#ffffff"));
	yield colours.c_05(new Color("#ffffff"));
	yield colours.c_06(new Color("#ffffff"));
	yield colours.c_07(new Color("#ffffff"));
	yield colours.c_08(new Color("#ffffff"));
	yield colours.c_09(new Color("#ffffff"));
}
