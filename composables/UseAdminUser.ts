import type { AdminForm, AdminUser } from "~/models/adminUser";
import { useAdminUsersStore } from "~/store/AdminUsers";

export const useAdminUser = () => {

  const AdminUserStore = useAdminUsersStore()
  const { $api } = useNuxtApp()
  const getAllAdmins = async () => {

    const { data, error, pending, refresh, status, execute } =
      await useLazyAsyncData<{ message: string, data: AdminUser[] }>("getAlladmins", () =>
        $api("/admin", { method: "GET" }), { }
      );

    return { data, error, pending, refresh, status, execute }
  }


  const addAdmin = async (newAdmin: AdminForm) => {
    
    const { data, pending, error, refresh,execute,status } = await useAsyncData<{}, { mesage: string, errors: { [key: string]: string[] } }>(
      'addnew admin',
      () => $api('/admin', { method: "POST", body: { ...newAdmin } }), { lazy: true,immediate:false }
    );

    return { data, pending, error, refresh ,execute,status}
  }


  const deleteAdmin = async (admin_id: string) => {
    const { data, pending, error, refresh } = await useAsyncData(
      () => $api(`/admin/${admin_id}`, { method: "delete" })
    );
    // AdminUserStore.intializeAdmins()
   refreshNuxtData("getAlladmins")


    return { data, pending, error, refresh }

  }


  const changePassword = async (admin_id: string, state:{password:string} ) => {
    const { data, pending, error, status,refresh ,execute} = await useAsyncData<{}, { mesage: string, errors: { [key: string]: string[] } }>(
      () => $api(`/admin/${admin_id}`, { method: "PATCH", body: { password: state.password } }),{immediate:false}
    );
    return { data, pending, error,status, refresh ,execute}

  }

  const updateAdmin = async (admin_id: string, state:{userName:string ,role:number}) => {
    const { data, pending, error, refresh ,execute,status} = await useAsyncData<{}, { mesage: string, errors: { [key: string]: string[] } }>(
      () => $api(`/admin/${admin_id}`, { method: "PATCH", body: { userName: state.userName, role: state.role } }),{immediate:false,transform:(response)=>{ refreshNuxtData("getAlladmins"); return response}}
    );
    // AdminUserStore.intializeAdmins()
   

    return { data, pending, error, refresh ,execute,status}

  }



  return {
    getAllAdmins, addAdmin, deleteAdmin, changePassword, updateAdmin

  }

}
