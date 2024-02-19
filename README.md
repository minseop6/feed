# 프로젝트 환경 설정

1. 프로젝트의 의존성을 설치하세요.

   ```bash
   npm ci
   ```

2. .env 파일을 생성하세요

   ```
   PORT = 8080
   DATABASE_HOST = 'localhost'
   DATABASE_PORT = 3307
   DATABASE_USERNAME = 'root'
   DATABASE_PASSWORD = '1234'
   DATABASE_DATABASE = 'feed'
   ```

3. 애플리케이션이 빌드 되는지 확인하세요.

   ```bash
   npm run build
   ```

4. 데이터베이스 스키마를 생성하세요.
   데이터베이스로 mysql 8을 사용중입니다.
   로컬 데이터베이스를 사용하거나 해당 프로젝트의 `docker-compose.yaml`을 사용해 데이터베이스 구성이 선행돼야합니다.

   스키마 DDL은 `ddl` 디렉토리에 포함되어있습니다.

5. 애플리케이션이 동작 하는지 확인하세요.

   ```bash
   npm run start
   ```

# 프로젝트 구성 요소

## 아키텍쳐

해당 프로젝트는 클린 아키텍처를 지향하고 있습니다.

#### common

서비스 전체에서 공통적으로 적용되는 컴포넌트입니다
(ex. filter, interceptor ...)

#### config

외부 의존성 또는 라이브러리의 설정을 적용하는 디렉토리입니다.

#### domain

애플리케이션의 핵심 도메인을 구현하는 레이어로 애플리케이션이 가져야 하는 핵심 요소만 갖기 때문에 다른 레이어에 의존하지 않습니다.

#### use-case

비지니스 로직이 구현되는 레이어입니다.

#### infrastructure

리소스 의존성 또는 외부 API들의 아웃바운드 인터페이스를 담당하는 레이어입니다.

#### web

서비스 API 또는 이벤트 컨슘과 같은 인바운드 인터페이스를 담당하는 레이어입니다.

## 사용된 기술

- Node 20
- TypeScript
- NestJS
- mysql 8
- typeORM

# 링크

### 애플리케이션

- 로컬 환경 <http://localhost:8080>

### 문서

- [API 문서](http://localhost:8080/docs) (Swagger)
