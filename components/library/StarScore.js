import React from "react";

export default function StarScore({ score }) {
  const numericScore = parseFloat(score); // 문자열을 숫자로 변환
  const roundedScore = !isNaN(numericScore) ? Math.round(numericScore * 10) / 10 : 0; // 숫자가 아니면 기본값 0
  const fullStars = Math.floor(roundedScore); // 꽉 찬 별의 개수
  const halfStar = roundedScore % 1 >= 0.5 ? 1 : 0; // 반별 여부
  const emptyStars = 5 - fullStars - halfStar; // 빈 별의 개수

  return (
    <div className="star-score" role="img" aria-label={`5점 만점에 ${roundedScore}점`}>
      {/* 꽉 찬 별 */}
      {Array.from({ length: fullStars }, (_, index) => (
        <i key={`full-${index}`} className="xi-star" aria-hidden="true"></i>
      ))}

      {/* 반 별 */}
      {halfStar === 1 && <i className="xi-star-half" aria-hidden="true"></i>}

      {/* 빈 별 */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <i key={`empty-${index}`} className="xi-star-o" aria-hidden="true"></i>
      ))}
      <span className="sr-only">{roundedScore}점</span>
    </div>
  );
}
