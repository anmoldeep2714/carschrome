<template>
  <nav class="pagination products-list-paginations">
    <ul>
      <li class="prev" @click="changePage(currentPage - 1)" :disabled="currentPage === 1" > 
          <svg class="qodef-svg--pagination-arrow-right" xmlns="http://www.w3.org/2000/svg" width="7.071" height="11.313"
            viewBox="0 0 7.071 11.313">
            <rect width="8" height="2" transform="translate(7.071 5.657) rotate(135)">
            </rect>
            <rect width="8" height="2" transform="translate(5.657 7.071) rotate(-135)">
            </rect>
          </svg> 
      </li>

      <li v-if="startPage > 1"><a><span >...</span></a></li>

      <li v-for="page in pages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">
          {{ page }}
      </li>

      <li v-if="endPage < totalPages"><a><span>...</span></a></li>

      <li class="next" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"> 
          <svg class="qodef-svg--pagination-arrow-right" xmlns="http://www.w3.org/2000/svg" width="7.071" height="11.313"
            viewBox="0 0 7.071 11.313">
            <rect width="8" height="2" transform="translate(7.071 5.657) rotate(135)">
            </rect>
            <rect width="8" height="2" transform="translate(5.657 7.071) rotate(-135)">
            </rect>
          </svg> 
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["page-change"]);

const startPage = computed(() => Math.max(props.currentPage - 2, 1));
const endPage = computed(() => Math.min(props.currentPage + 2, props.totalPages));

const pages = computed(() => {
  let pagesArray = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};
</script>

<<!-- style scoped>
.pagination {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

button.active {
  background-image: linear-gradient(to left, transparent 50%, #ce2f17 50%);
  color: white;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style> -->