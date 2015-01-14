// This module takes the JSON ouput from Node-Sprite
// It's a data map of what's in the image file
// npm install node-sprite
// https://github.com/naltatis/node-sprite

export function mapUVs (items) {

  var spriteW = d3.max(items, function (d) {
    return d.width + d.positionX;
  });

  var spriteH = d3.max(items, function (d) {
    return d.height + d.positionY;
  });

  var getImageCoords = function (obj) {
    return [
      [obj.px1, obj.py1],
      [obj.px2, obj.py1],
      [obj.px2, obj.py2],
      [obj.px1, obj.py2]
    ];
  };

  return function (item, i) {

    var arr32 = new Float32Array(12);

    var coords = getImageCoords({
      px1: (item.positionX + item.width) / spriteW,
      py1: 1 - ((item.positionY + item.height) / spriteH),
      px2: item.positionX / spriteW,
      py2: 1 - (item.positionY / spriteH)
    });

    d3.merge([
      d3.merge(d3.permute(coords, [2, 3, 1])),
      d3.merge(d3.permute(coords, [0, 1, 2]))
    ])
    .forEach(function (value, i) {
      arr32[i] = value;
    });

    return arr32;
  };
}