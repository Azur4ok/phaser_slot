// function onAssetsLoaded() {
//     // Create different slot symbols.
//     const slotTextures = [
//         PIXI.Texture.from('examples/assets/eggHead.png'),
//         PIXI.Texture.from('examples/assets/flowerTop.png'),
//         PIXI.Texture.from('examples/assets/helmlok.png'),
//         PIXI.Texture.from('examples/assets/skully.png'),
//     ];

//     // Build the reels
//     const reels = [];
//     const reelContainer = new PIXI.Container();
//     for (let i = 0; i < 5; i++) {
//         const rc = new PIXI.Container();
//         rc.x = i * REEL_WIDTH;
//         reelContainer.addChild(rc);

//         const reel = {
//             container: rc,
//             symbols: [],
//             position: 0,
//             previousPosition: 0,
//             blur: new PIXI.filters.BlurFilter(),
//         };
//         reel.blur.blurX = 0;
//         reel.blur.blurY = 0;
//         rc.filters = [reel.blur];

//         // Build the symbols
//         for (let j = 0; j < 4; j++) {
//             const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
//             // Scale the symbol to fit symbol area.
//             symbol.y = j * SYMBOL_SIZE;
//             symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
//             symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
//             reel.symbols.push(symbol);
//             rc.addChild(symbol);
//         }
//         reels.push(reel);
//     }
//     app.stage.addChild(reelContainer);

//     // Build top & bottom covers and position reelContainer
//     const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
//     reelContainer.y = margin;
//     reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);
//     bottom.addListener('pointerdown', () => {
//         startPlay();
//     });

//     let running = false;

//     // Function to start playing.
//     function startPlay() {
//         if (running) return;
//         running = true;

//         for (let i = 0; i < reels.length; i++) {
//             const r = reels[i];
//             const extra = Math.floor(Math.random() * 3);
//             const target = r.position + 10 + i * 5 + extra;
//             const time = 2500 + i * 600 + extra * 600;
//             tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
//         }
//     }

//     // Reels done handler.
    // function reelsComplete() {
    //     running = false;
    // }
// // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
// const tweening = [];
// function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
//     const tween = {
//         object,
//         property,
//         propertyBeginValue: object[property],
//         target,
//         easing,
//         time,
//         change: onchange,
//         complete: oncomplete,
//         start: Date.now(),
//     };

//     tweening.push(tween);
//     return tween;
// }
// // Listen for animate update.
// app.ticker.add((delta) => {
//     const now = Date.now();
//     const remove = [];
//     for (let i = 0; i < tweening.length; i++) {
//         const t = tweening[i];
//         const phase = Math.min(1, (now - t.start) / t.time);

//         t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
//         if (t.change) t.change(t);
//         if (phase === 1) {
//             t.object[t.property] = t.target;
//             if (t.complete) t.complete(t);
//             remove.push(t);
//         }
//     }
//     for (let i = 0; i < remove.length; i++) {
//         tweening.splice(tweening.indexOf(remove[i]), 1);
//     }
// });

// // Basic lerp funtion.
// function lerp(a1, a2, t) {
//     return a1 * (1 - t) + a2 * t;
// }

// // Backout function from tweenjs.
// // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
// function backout(amount) {
//     return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
// }
