# Himprover-Nextjs-Starter

<div align='center'>

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=FFFFFF"/>

<br>

<img src="https://img.shields.io/badge/styled_components-DB7093?style=flat-square&logo=styled-components&logoColor=FFFFFF"/>

<br>

<img src="https://img.shields.io/badge/Conventional_commits-1.0.0-yellow?style=flat-square"/>

<img src="https://img.shields.io/badge/code%20style-google-blueviolet?style=flat-square"/>

</div>

## Update (22-05-31)

- 이제 React 18 버전을 지원합니다.

```
    "next": "^12.1.6",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
```

## Installation

npm를 사용하여 패키지를 관리합니다.

```bash
npm install
```

## Usage

### development

```bash
npm run dev
```

### product

```bash
npm run deploy
```

### Auto Jira ticket Commit

![image](https://user-images.githubusercontent.com/65651835/171074512-e94d2a5a-ab08-4f6f-a2d9-663c0949ab4d.png)

`PROJECT_ID = PROJECT_ID`

자동으로 커밋에 Jira ID를 삽입해줍니다.

프로젝트 ID를 Jira ID로 변경해서 설정합니다.

commit `-m` 옵션 사용 시 작동하지 않을 수 있습니다.

## Directory Structure

```bash
├─public
└─src
    ├─components
    │  ├─common
    │  │  └─[Name]
    │  │     └─index.tsx
    │  │     └─index.test.tsx
    │  └─[Name]
    │     └─index.tsx
    │     └─index.test.tsx
    ├─core
    │  └─utils
    │     └─index.ts
    ├─pages
    │  └─index.tsx
    └─styles
       └─global-styles.ts
       └─theme.ts
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
