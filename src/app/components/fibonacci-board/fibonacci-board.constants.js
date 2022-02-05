'use strict';
export const DOM_ELEMENT_CLASS = {
    grid: 'grid',
    restartBtn: 'restart-btn',
    pointsHolder: 'points'
};

export const TEMPLATE = `
    <div class='board-options'>
        <div class='points-container'>Points: <span class='${DOM_ELEMENT_CLASS.pointsHolder}'>0</span></div>
        <button class='${DOM_ELEMENT_CLASS.restartBtn}' aria-disabled="true">restart</button>
    </div>
    <app-fibonacci-grid class='${DOM_ELEMENT_CLASS.grid}'></app-fibonacci-grid>
`;
