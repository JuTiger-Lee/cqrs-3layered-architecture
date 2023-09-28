# CQRS-LAYRED-Architecture

## Skill

1. NestJS
2. CQRS
3. Mysql
4. Jest

## What is CQRS?

1. "Command 와 Query를 분리한다" 즉 데이터베이스에 데이터 상태 변화 와 데이터를 조회를 독립적으로 나누는 패턴

- https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
- 굳이 데이터베이스를 모델로 안둬도되고 Rest API 처럼 상태변경(POST, DELETE, PUT)과 조회(GET)를 나누는게 가능한 모델이면 가능합니다.
- Rest API Example: https://codeopinion.com/is-a-rest-api-with-cqrs-possible/

2. 분리해서 얻을수있는 효과는 아래와 같습니다.

- 추후에 조회 부분이 부하가 많이 갈 경우 Read 전용 데이터베이스가 생성되도 이미 조회 전용 모듈이 분리 되었기에 쉽게 코드 변경이 가능합니다.
- 모듈의 응집도 증가

## 추상화

1. 모듈을 2군데 모듈에서 사용을 할시에는 추상화를 하여 코드 증복을 줄이거나 규약을 만듭니다.
2. 예제로 Repository를 보시면 됩니다.

## 인터페이스

1. 각 레이어 마다 interface를 만드는거는 불 필요 합니다.

- 예로 Service에 interface 와 Repostiory interface를 무조건 만드는 행위는 Useless interface 입니다.
- interface를 만드는 이유는 다형성 때문인데 그저 한곳만 사용하는거라면 불필요한 인터페이스입니다.
- interface를 사용하는 이유가 DIP 즉 의존성 역전을 통해 모듈의 의존성을 낮추기 위해서라도 그거 또한 여러 모듈에서 사용할 때 효과를 발휘합니다.
- 즉 다형성을 위해 interface를 만드는데 한곳만 사용하는 모듈에 interface는 단형성으로 되기 때문에 불필요한 인터페이스입니다.
- 참조: https://ane.iki.fi/2017/03/23/useless-interfaces.html

## How to run?

1. yarn install or yarn
2. yarn run start:dev

## How to run Test Code?

1. yarn run test

- E2E 테스트는 따로 작성하지 않았으며 Unit Test만 작성했습니다.

## Api-Document

- host: http://localhost:3000/docs

## Architecture

1. 해당 아키텍처는 기본적으로 https://github.com/Sairyss/domain-driven-hexagon 를 참고하여 만들었습니다.

- 위 아키텍처는 Hexagon + DDD이지만 DDD를 없애고 Controller - Service - Repository 3 Layer로 만들었습니다.

### DDD를 뺀 이유

1. 러닝 커브

- DDD를 잘 활용하려면 Aggregate, Bounded context, Entity, VO 등 러닝커브가 있습니다.
- 우와 같은 러닝커브는 실무에 바로 적용하기 힘들므로 빠르게 적용 가능한 3 Layer + CQRS를 활용해서 빠른 개발과 모듈의 응집도를 생각했습니다.
