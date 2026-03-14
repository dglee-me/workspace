# WORKSPACE


## 기획 의도
- 내 업무를 효율적으로 관리하기 위한 웹 애플리케이션


## 기능
- workspace
  - 회사 혹은 특정 그룹을 위한 공간
  - workspace는 여러 개의 프로젝트를 포함할 수 있다.
  - workspace는 여러 개의 멤버를 포함할 수 있다.
  - workspace는 사용자 프로필에서 변경할 수 있다.
- project
  - workspace에 속한 프로젝트
  - 프로젝트는 여러 개의 task를 포함할 수 있다.
- task
  - 프로젝트에 속한 task
  - task는 여러 개의 subtask를 포함할 수 있다.
- subtask
  - task에 속한 subtask
  - subtask는 여러 개의 subtask를 포함할 수 있다.


## Tech Stack
- **Language:** Vue 3, Typescript
- **Styling:** Tailwind CSS, Shadcn/vue
- **State Management:** Pinia
- **Routing:** Vue Router
- **Package Manager:** pnpm
- **Build Tool:** Vite

## 지침
- 컴포넌트 구현 시 shadcn/vue를 사용한다.
- shadcn의 속성을 적극활용하며 불필요한 디자인을 새로 그리면 안된다.