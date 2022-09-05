import { css } from "@emotion/css";

export default css`
  .default-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &-container {
      border-color: var(--sk-color-n30);

      &-body {
        @apply h-full;
      }

      &-footer {
        @apply mt-48px text-center;
      }
    }
  }
`;
