const METRIKA_ID = 105529037;

export function isMetrikaAvailable() {
    return import.meta.env.PROD && typeof window !== 'undefined' && typeof window.ym === 'function';
}

/**
 * @param {string} url
 * @param {Object} [options]
 */
export function ymHit(url, options = {}) {
    if (!isMetrikaAvailable()) return;

    try {
        window.ym(METRIKA_ID, 'hit', url, options);
        console.log(`📊 [YM] hit: ${url}`);
    } catch (err) {
        console.warn('[Yandex.Metrika hit error]', err);
    }
}

/**
 * @param {string} goal
 * @param {Object} [params]
 */
export function ymGoal(goal, params = {}) {
    if (!isMetrikaAvailable()) return;

    try {
        window.ym(METRIKA_ID, 'reachGoal', goal, params);
        console.log(`📊 [YM] goal: ${goal}`, params);
    } catch (err) {
        console.warn('[Yandex.Metrika goal error]', err);
    }
}