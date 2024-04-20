import type { NuxtError } from "#app";
import { mapWritableState } from "pinia";
import { MessageColor, MessageType, type IMessage } from "~/models/message";

export const useContactUsMessage = () => {
  const { $api } = useNuxtApp()

  const getAllMessages = async () => {
    const { data, pending, error, refresh, status } = await useLazyAsyncData<{ data: IMessage[], message: string }, NuxtError>(
      "getAllMessages",() => $api('/contact-us/message', {
        method: "GET",
        query: { pageNumber: 1, pageSize: 1, isArchived: true, isHandled: true }
      }), {
        transform: (response) => {
          const new_response:IMessage[]=  response.data.map(message => {
            message.class = message.isHandled ? "bg-cyan-500/50" : "bg-gray-500/50"
            return message
          })
          response.data=new_response
          return response
        }
    }
    );
    return { data, pending, error, refresh, status }
  }

  const getSingleMessage = async (message_id: string) => {
    const { data, pending, error, refresh } = await useAsyncData<{ data: IMessage, message: string }, NuxtError>(
      "getSinglemessage",
      () => $api(`/contact-us/message/${message_id}`, { method: "GET" })
    );
    return { data, pending, error, refresh }
  }

  const updateSingleMessage = async (message: IMessage) => {
    const { data, pending, error, refresh } = await useAsyncData(

      () => $api(`/contact-us/message/${message.id}`, {
        method: "PUT",
        body: {
          isHandled: message.isHandled,
          isArchived: message.isArchived
        }
      })
    );
    return { data, pending, error, refresh }
  }


  const handelMessage = async (message: IMessage, status: Ref<boolean>) => {
    console.log(status)
    const { data, pending, error, refresh, execute } = await useAsyncData(

      () => $api(`/contact-us/message/${message.id}`, {
        method: "PUT",
        body: {
          isHandled: status.value,
          isArchived: message.isArchived
        }
      }), { immediate: false, transform: () => { refreshNuxtData(["getSinglemessage","getAllMessages"]) } }
    );
    return { data, pending, error, refresh, execute }
  }


  const archiveMessage = async (message: IMessage, status: Ref<boolean>) => {
    const { data, pending, error, refresh, execute } = await useAsyncData(

      () => $api(`/contact-us/message/${message.id}`, {
        method: "PUT",
        body: {
          isHandled: message.isHandled,
          isArchived: status.value
        }
      }), { immediate: false, transform: () => { refreshNuxtData(["getSinglemessage","getAllMessages"]) } }
    );
    return { data, pending, error, refresh, execute }
  }


  return { getAllMessages, getSingleMessage, updateSingleMessage, handelMessage, archiveMessage }


}
