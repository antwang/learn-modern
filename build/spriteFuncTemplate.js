// 雪碧图模板函数
const templateFunction = function(data) {
  var shared = ".ico { background-image: url(I); background-size:Wpx Hpx;}"
    .replace("I", data.spritesheet.image)
    .replace("W", data.spritesheet.width / 2)
    .replace("H", data.spritesheet.height / 2);

  var perSprite = data.sprites
    .map(sprite => {
      return ".ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }"
        .replace("N", sprite.name)
        .replace("W", sprite.width / 2)
        .replace("H", sprite.height / 2)
        .replace("X", sprite.offset_x / 2)
        .replace("Y", sprite.offset_y / 2);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};
module.exports = templateFunction;
