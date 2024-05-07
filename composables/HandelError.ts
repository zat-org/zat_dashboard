import type { NuxtError } from "#app";

export const useHandelError = () => {
  const handelError = (error: NuxtError) => {
    switch (error.statusCode) {
      case 404: {
        break;
      }
      case 401: {
        break;
      }
      case 403: {
        break;
      }
      case 500: {
      }
    }
  };
};
