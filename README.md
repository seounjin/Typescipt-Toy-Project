# Typescript-Toy-Project

# Typescript

### 타입스크립트란?

타입스크립트는 자바스크립트에 타입을 부여한 언어.

### 장점?

정적 타입을 지원한다.

정적 타입을 지원하므로 컴파일 단계에서 오류를 잡을 수 있다.

명시적인 정적 타입지정은 개발자의 의도를 명확하게 기술 할 수 있다.

코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 한다.

```jsx
function sum(a, b) {
  return a + b;
}
sum('10', '20');
```

위 코드는 자바스크립트 문법상 문제가 없으므로 자바스크립트 엔진은 실행함.

위 상황이 발생하는 이유는 변수나 반환값의 타입을 사전에 지정하지 않는 자바스크립트의 `동적 타이핑(Dynamic Typing)`에 의한 것.

```tsx
function sum(a: number, b: number) {
  return a + b;
}

sum('10', '20');
```

위 코드의 경우, TypeScript는 정적 타입을 지원하므로 컴파일 단계에서 오류를 잡을 수 있다.

참고

[https://velog.io/@taeg92/TypeScript-시작하기](https://velog.io/@taeg92/TypeScript-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)

### 인터페이스

```tsx
interface 인터페이스_이름 {
  속성?: 타입; // ?를 사용하면 꼭 안써도 됨
}

interface CraftBeer {
  name: string;
  hop?: number;  
}
```

함수의 구조에 인터페이스 활용

```tsx
interface login {
  (username: string, password: string): boolean;
}

let loginUser: login;
loginUser = function(id: string, pw: string) {
  console.log('로그인 했습니다');
  return true;
}
```

딕셔너리 패턴 (실무에 많이 사용 된다고 함)

```tsx
// 딕셔너리 패턴 (인덱싱과 유사한)
interface StringRegexDictionary {
    [key: string ]: RegExp;
}

let obj: StringRegexDictionary = {
    cssFile: /\.css$/,
    jsFile: /\.js$/,
}

obj['cssFile'] = 'a';
Object.keys(obj).forEach(function(value){
})
```

### 타입별칭

정의한 타입에 대해 나중에 쉽게 참고할 수 있게 이름을 부여하는 것.

확장 불가능 하기 때문에 인터페이스 사용하는것이 좋음.

```tsx
// string 타입을 사용할 때
const name: string = 'capt';

// 타입 별칭을 사용할 때
type MyName = string;
const name: MyName = 'capt';
```

### 제네릭

재사용성이 높은 컴포넌트를 만들 때 자주 활용되는 특징입니다. 특히, 한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용

**제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것**을 의미

```tsx
function logText<T>(text: T): T {
  return text;
}

// #1
const text = logText<string>("Hello Generic");
// #2
const text = logText("Hello Generic");
```

# Next.js

### Next.js 란?

React의 SSR(Server Side Rendering)을 쉽게 구현할 수 있게 도와주는 프레임워크

CSR(Client Side Rendering)의 단점인 SEO를 보완하고자 나옴

### Next.js 동작

Next.js는 SSR을 기반으로 하지만, 페이지가 로드된 이후엔 React에서 CSR을 이용합니다.

1. 페이지는 서버가 그립니다. pages/안에 폴더를 만들면, 해당 라우팅의 페이지들은 서버측에서 먼저 로드해줍니다.
2. 페이지가 그려진 이후에 페이지 내부에서 동적인 데이터를 패치하는 과정은 CSR의 방식을 따릅니다. 이때의 데이터들은 일단 페이지가 로드된 이후에 클라이언트 측에서 다시 렌더되며 불러와집니다. 그렇기 때문에 SEO에 걸리지 않습니다.

그렇기 때문에 만약 페이지가 로드될 때 함께 데이터가 패칭되어야 하는 상황이라면(pre-rendering) next.js의 데이터 패칭 방식 (getInitialProps, getStaticProps, getStaticPath, getServerSideProps)을 이용해 첫 렌더에 데이터가 패칭될 수 있도록 처리를 해주어야 합니다.

### ServerSide Cycle

1. Next Server가 GET 요청을 받는다.
2. 요청에 맞는 Page를 찾는다.
3. _app.tsx의 getInitialProps가 있다면 실행한다.
4. Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
5. document.tsx의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
6. 모든 props들을 구성하고, _app.js > page Component 순서로 rendering.
7. 모든 Content를 구성하고 _document.js를 실행하여 html 형태로 출력한다.

이 흐름을 보았을 때, **모든 페이지에 공통적인 데이터 패칭이 필요하다면 _app.tsx에서 미리 데이터 패칭**을 해주면 되고, **페이지마다 다른 데이터가 필요하다면 페이지마다 데이터 패칭**을 해주면 된다.

### Data-Prerendering

서버사이드에서 실행하는 next에서는 `getInitialProps`를 이용하여 data fetching 작업을 함

next v9 이상에서는 `getInitialProps` 대신 `getStaticProps`, `getStaticPaths`, `getServerSideProps`을 사용하도록 권장됨

Data Fetching을 서버에서 하게 되면 속도가 빨라진다.

브라우저에서의 연산을 서버와 함께 하면서 미리 데이터를 받아오고 브라우저는 렌더링만 할 수 있기 때문이다

**getInitialProps**

getInitialProps 내부 로직은 서버에서 실행된다. 따라서 Client에서만 가능한 로직은 피해야 한다. (Window, document 등)
한 페이지를 로드할 때, 하나의 getInitialProps 로직만 실행된다. 예를 들어 _app.js에 getInitialProps를 달아서 사용한다면 그 하부 페이지의 getInitialProps는 실행되지 않는다.

getInitialProps는 각 페이지에 static method로 구현된다.

예시)

```tsx
const App = ({ Component, pageProps }) => <Component {...pageProps} />

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx)
  return { pageProps }
}

export default App
```

**getStaticProps**

"빌드 시에 딱 한 번"만 호출되고, 바로 static file로 빌드된다.

따라서, 이후 수정이 불가능합니다.

빌드 후에 웬만하면 바뀌지 않는 내용 (고정된 내용)이 있는 page가 있는 경우에만 사용하는 것이 좋다.

예시)

```tsx
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    }
  };
}

export default Blog;
```

 props의 데이터가 변경하고 싶을때에는 props에 "revalidate"의 Property를 추가하고 변경하고 싶은 시간 값(초)를 입력해서 변경할 수도 있다.

```tsx
export const getStaticProps = async () => {
	return {props: {number: Math.random() } , revalidate: 3 }
}
```

**getServerSideProps**

페이지를 렌더링하기전에 반드시 fetch해야할 데이터가 있을 때 사용

페이지 요청시마다 호출되므로 getStaticProps보다 느리지만, 빌드 이후에도 페이지 요청마다 실행된다는 특징이 있습니다.

- getServerSideProps는 서버사이드에서만 실행되고, 절대로 브라우저에서 실행되지 않는다.
- getServerSideProps는 매 요청시 마다 실행되고, 그 결과에 따른 값을 props로 넘겨준 뒤 렌더링을 한다.

예시)

```tsx
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps  = async () => {
  const smsgs = await fetcher(METHOD.GET, '/messages')
  const users = await fetcher(METHOD.GET, '/users')
  return {
    props: { smsgs, users },
  }
}
```

참고

[https://velog.io/@devstone/Next.js-100-활용하기-feat.-initialProps-webpack-storybook#-prologue](https://velog.io/@devstone/Next.js-100-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-feat.-initialProps-webpack-storybook#-prologue)

### Next.js + Typescript

1. Next.js 프로젝트 생성  `yarn create next-app`
2. tsconfig.json 생성
3. 패키지 설치  `yarn add --dev typescript @types/react @types/node`
4. pages 폴더 안에 _app.tsx라는 파일을 생성해 준 후, 아래 코드를 삽입

```tsx
// pages/_app.tsx

import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```

1. 프로젝트 실행 `yarn dev`
2. tsconfig.json을 자동으로 생성해 주고, 자동으로 setting됨

### 주의사항

pages 폴더에 라우팅 url 과 동일한 이름의 컴포넌트를 생성해야함
pages 컴포넌트가 next 라우팅과 동일하게 mapping 되기 때문
