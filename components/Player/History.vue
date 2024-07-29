<template>
  <div
    class="flex flex-col  gap-3 h-[50vh] grow w-full overflow-y-auto p-3">
    <!-- <div  v-for="(move,index) in playerHist.data.value?.data">
       
      {{ playerHist.data.value?.data[index].team? playerHist.data.value?.data[index].team.name:'freeplayer'}}
      {{ playerHist.data.value?.data[index].role}}

    </div> -->
    <PlayerHistoryRecord
      v-for="move in moves"
      :move="move" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id: string }>();
const toast = useToast();

const playerApi = usePlayer();
const playerHist = await playerApi.getPlayerHistory(props.id);
if (playerHist.status.value == "error") {
  toast.add({ title: "حدث خطا في عملية استرجاع اللاعب" });
  navigateTo("/player");
}
const moves = computed(() => {
  let moves_array  = playerHist.data.value?.data.moves!
  moves_array.reverse()
  return moves_array;
});
</script>

<style></style>
