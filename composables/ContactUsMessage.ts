import type { NuxtError } from "#app";
import { mapWritableState } from "pinia";
import { MessageColor, MessageType, type IMessage } from "~/models/message";

export const useContactUsMessage = () => {
  const { $api } = useNuxtApp();

  const getAllMessages = async (
    handel: Ref<boolean> = ref(true),
    archived: Ref<boolean> = ref(false),
    pageNumber: Ref<number>
  ) => {
    const { data, pending, error, refresh, status } = await useLazyAsyncData<
      { data: IMessage[]; message: string },
      NuxtError
    >(
      "getAllMessages",
      () =>
        $api("/contact-us/message", {
          method: "GET",
          query: {
            pageNumber: pageNumber.value,
            pageSize: 10,
            ishandled: handel.value,
            isarchived: archived.value,
          },
        }),
      {
        watch: [pageNumber, handel, archived],
        transform: (response) => {
          const new_response: IMessage[] = response.data.map((message) => {
            // message.class = message.isHandled ? "bg-cyan-500/50" : "bg-gray-500/50"
            return message;
          });
          response.data = new_response;
          return response;
        },
      }
    );
    return { data, pending, error, refresh, status };
  };

  const getSingleMessage = async (message_id: string) => {
    const { data, pending, error, refresh } = await useAsyncData<
      { data: IMessage; message: string },
      NuxtError
    >("getSinglemessage", () =>
      $api(`/contact-us/message/${message_id}`, { method: "GET" })
    );
    return { data, pending, error, refresh };
  };

  const updateSingleMessage = async (message: IMessage) => {
    const { data, pending, error, refresh } = await useAsyncData(() =>
      $api(`/contact-us/message/${message.id}`, {
        method: "PUT",
        body: {
          isHandled: message.isHandled,
          isArchived: message.isArchived,
        },
      })
    );
    return { data, pending, error, refresh };
  };
  // TODO UPDATE add note and show it  in update

  const handelMessage = async (
    MData: Ref<{ message: string; data: IMessage } | null>
  ) => {
    const { data, pending, error, refresh, execute } = await useAsyncData(
      () =>
        $api(`/contact-us/message/${MData.value?.data.id}`, {
          method: "PUT",
          body: {
            isHandled: !MData.value?.data.isHandled,
            isArchived: MData.value?.data.isArchived,
            notes: MData.value?.data.notes,

          },
        }),
      {
        immediate: false,
        transform: () => {
          refreshNuxtData(["getSinglemessage", "getAllMessages"]);
        },
      }
    );
    return { data, pending, error, refresh, execute };
  };

  const archiveMessage = async (
    MData: Ref<{ message: string; data: IMessage } | null>
  ) => {
    // console.log(message.isArchived)
    const { data, pending, error, refresh, execute } = await useAsyncData(
      () =>
        $api(`/contact-us/message/${MData.value?.data.id}`, {
          method: "PUT",
          body: {
            isHandled: MData.value?.data.isHandled,
            isArchived: !MData.value?.data.isArchived,
            notes: MData.value?.data.notes,
          },
        }),
      {
        immediate: false,
        transform: () => {
          refreshNuxtData(["getSinglemessage", "getAllMessages"]);
        },
      }
    );
    return { data, pending, error, refresh, execute };
  };
  const updateNotes = async (
    MData: Ref<{ message: string; data: IMessage } | null>
  ) => {
    const { data, pending, error, refresh, execute ,status} = await useAsyncData(
      () =>
        $api(`/contact-us/message/${MData.value?.data.id}`, {
          method: "PUT",
          body: {
            isHandled: MData.value?.data.isHandled,
            isArchived: MData.value?.data.isArchived,
            notes: MData.value?.data.notes,
          },
        }),
      {
        immediate: false,
        transform: () => {
          refreshNuxtData(["getSinglemessage", "getAllMessages"]);
        },
      }
    );
    return { data, pending, error, refresh, execute,status };
  };

  return {
    getAllMessages,
    getSingleMessage,
    updateSingleMessage,
    handelMessage,
    archiveMessage,
    updateNotes,
  };
};
