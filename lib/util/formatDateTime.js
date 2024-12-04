// 날짜 형식을 "YYYY-MM-DD"로 변환하는 함수
export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return "";
  
  // "2024-10-06 00:00" 형식에서 "2024-10-06"만 추출
  const datePart = dateTimeString.split(" ")[0];
  return datePart;
}