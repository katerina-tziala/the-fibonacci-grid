'use strict';
import * as Canvas from 'CANVAS';
import { GRID_TILE_CONFIG } from './grid-tile.config';

const SHADOWS = {
    active: {
        offsetX: 0,
        offsetY: 0,
        blur: 16,
    }
};

const CONTENT = {
    font: `'Nunito', sans-serif`,
    padding: 2,
    fontSmall: 14,
    fontDefault: 16
};

export function drawTile(ctx, tile, background, color) {
    clearTile(ctx, tile);
    ctx.fillStyle = background;
    ctx.fill(tile.path);
    if (tile.value) {
        drawTileContent(ctx, tile.center, tile.value, color);
    }
}

export function drawHighlightedTile(ctx, tile, shadowColor) {
    const shadow = { ...SHADOWS.active, shadowColor };
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 2;
    Canvas.setShadow(ctx, shadow);
    drawTileClip(ctx, tile, () => ctx.stroke(tile.path));
    Canvas.clearShadow(ctx);
}

function drawTileContent(ctx, center, value, color) {
    const { x, y } = center || {};
    const fontSize = value > 99 ? CONTENT.fontSmall : CONTENT.fontDefault;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.font = `${fontSize}px ${CONTENT.font}`;
    Canvas.drawCenteredText(ctx, x, y + CONTENT.padding, value, 0, true);
}

function clearTile(ctx, tile) {
    const size = GRID_TILE_CONFIG.size;
    const { area: xStart, yStart } = tile;
    ctx.clearRect(xStart, yStart, size, size);
}

function drawTileClip(ctx, tile, callBack) {
    ctx.save();
    ctx.clip(tile.path);
    callBack();
    ctx.restore();
}
