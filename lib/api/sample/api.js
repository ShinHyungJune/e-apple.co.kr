import axios from "axios";


const URL = process.env.NEXT_PUBLIC_API_URL;

// 학생 회원가입
export const users_api = (ids, password, confirmPassword, name, contact, birth) => {
  const fullUrl = `${URL}/api/users`;

  return axios.post(fullUrl, {
    ids: ids,
    password: password,
    password_confirmation: confirmPassword,
    name: name,
    contact: contact,
    birth: birth,
  }, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${accessToken}`,
    },
  });
};


// 학생 로그인
export const Login_api = (ids, password) => {
  const fullUrl = `${URL}/api/login`;

  return axios.post(fullUrl, {
    ids: ids,
    password: password,
  }, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${accessToken}`,
    },
  });
};


// =======================================================================================================

// profram
export const getPrograms = (accessToken) => {
  const fullUrl = `${URL}/api/programs`;

  return axios.get(fullUrl, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${accessToken}`,
    },
  });
};


// qr 가져오기
export const getPrograms_dt = (id) => {
  const fullUrl = `${URL}/api/programs/${id}`;

  return axios.get(fullUrl, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${accessToken}`, // 액세스 토큰이 필요한 경우
    },
  });
};



// qr 인증완료
export const certifications_api = (accessToken, program_id) => {
  const fullUrl = `${URL}/api/certifications`;

  return axios.post(fullUrl, {
    program_id: program_id,
  }, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${accessToken}`,
    },
  });
};



//  [부모] 조회
export const getCertifications = (name, contact) => {
  const fullUrl = `${URL}/api/certifications`;

  return axios.get(fullUrl, {
    params: {
      name: name,
      contact: contact,
    },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${accessToken}`, // 액세스 토큰이 필요한 경우
    },
  });
};