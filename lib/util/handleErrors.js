export function handleErrors(errors) {
  const errorList = [];

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      errors[key].forEach((message) => {
        errorList.push(message);
      });
    }
  }

  // 여러 오류 메시지를 사용자에게 알림
  if (errorList.length > 0) {
    alert(errorList.join("\n")); // 오류 메시지를 줄바꿈으로 연결하여 표시
  }
}