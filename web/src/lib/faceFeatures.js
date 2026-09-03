// web/src/lib/faceFeatures.js
// 不需要 import 任何东西 —— landmarks 进来的时候已经是纯数字数组了
// (数组下标本身没有意义，MediaPipe Face Mesh 规定了每个下标对应脸上哪个固定的点)

// MediaPipe Face Mesh 关键点索引参考表（这些数字是 MediaPipe 规定的，不能改）
//
// | 索引  | 位置              | 用途                       |
// |------|-------------------|----------------------------|
// | 10   | 额头 / 发际线中点   | 算脸高的上边界               |
// | 33   | 左眼外眼角         | 算左眼倾角                   |
// | 133  | 左眼内眼角         | 算左眼倾角 / 算眼距           |
// | 152  | 下巴底             | 算脸高的下边界 / 算下颌角度     |
// | 172  | 左下颌拐点         | 算下颌角度                   |
// | 234  | 左脸颊最宽处       | 算脸宽                       |
// | 262  | 右下颌拐点         | 算下颌角度（右侧，备用）        |
// | 263  | 右眼外眼角         | 算右眼倾角（备用）             |
// | 362  | 右眼内眼角         | 算眼距 / 算右眼倾角（备用）      |
// | 454  | 右脸颊最宽处       | 算脸宽                       |

const LEFT_EYE_OUTER = 33;
const LEFT_EYE_INNER = 133;
const HAIRLINE_TOP = 10;
const CHIN_BOTTOM = 152;
const LEFT_JAW = 172;
const LEFT_WIDEST = 234;
const RIGHT_JAW = 262;
const RIGHT_EYE_OUTER = 263;
const RIGHT_EYE_INNER = 362;
const RIGHT_WIDEST = 454;

function getFaceType(landmarks) {
  const width = Math.abs(landmarks[RIGHT_WIDEST].x - landmarks[LEFT_WIDEST].x);
  const length = Math.abs(landmarks[CHIN_BOTTOM].y - landmarks[HAIRLINE_TOP].y);
  return length / width;
}

function getJawAngle(landmarks) {
  const vertex = landmarks[LEFT_JAW];
  const pointA = landmarks[LEFT_WIDEST];
  const pointB = landmarks[CHIN_BOTTOM];

  const vecA = { x: pointA.x - vertex.x, y: pointA.y - vertex.y };
  const vecB = { x: pointB.x - vertex.x, y: pointB.y - vertex.y };

  const dot = vecA.x * vecB.x + vecA.y * vecB.y;
  const magA = Math.sqrt(vecA.x ** 2 + vecA.y ** 2);
  const magB = Math.sqrt(vecB.x ** 2 + vecB.y ** 2);
  return Math.acos(dot / (magA * magB));
}

function getEyeAngle(landmarks) {
  const outer = landmarks[LEFT_EYE_OUTER];
  const inner = landmarks[LEFT_EYE_INNER];
  return Math.atan2(outer.y - inner.y, outer.x - inner.x);
}

function getEyeSpacing(landmarks) {
  const width = Math.abs(
    landmarks[RIGHT_EYE_INNER].x - landmarks[LEFT_EYE_INNER].x,
  );
  const eyeWidth = Math.abs(
    landmarks[RIGHT_WIDEST].x - landmarks[LEFT_WIDEST].x,
  );
  return eyeWidth / width;
}

export function extractFaceFeatures(landmarks) {
  return {
    eyeAngle: getEyeAngle(landmarks),
    jawLineAngle: getJawAngle(landmarks),
    faceRatio: getFaceType(landmarks),
    eyeSpacing: getEyeSpacing(landmarks),
  };
}
