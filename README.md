# Liberty SNS - Community Platform

완전한 커뮤니티 기반의 SNS 플랫폼입니다.

## 🚀 기술 스택

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios
- React Router

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Bcrypt (암호 암호화)
- Cors

## ✨ 주요 기능

- 👤 사용자 인증 (자체 회원가입/로그인)
- 📝 게시물 작성/수정/삭제
- 💬 댓글 시스템
- ❤️ 좋아요 기능
- 👥 팔로우/언팔로우
- 🏛️ 커뮤니티/카테고리
- 🔍 검색 기능
- 🔔 알림 시스템
- 📱 반응형 디자인

## 📁 프로젝트 구조

```
liberty_sns/
├── server/                    # Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── client/                    # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── .gitignore
```

## 🏃 시작하기

### 1. 환경 설정

#### Backend 설정
```bash
cd server
npm install
cp .env.example .env
# .env 파일에서 데이터베이스 정보 설정
npm run dev
```

#### Frontend 설정
```bash
cd client
npm install
npm start
```

### 2. Docker를 사용한 실행
```bash
docker-compose up
```

## 📚 API 문서

자세한 API 문서는 `server/API.md` 참조

## 🔐 보안

- JWT를 이용한 토큰 기반 인증
- 비밀번호는 Bcrypt로 암호화
- CORS 정책 적용
- SQL Injection 방지

## 🤝 기여

Pull Request를 환영합니다!

## 📄 라이센스

MIT
