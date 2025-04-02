<template>
    <nav class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        Prev
      </button>
  
      <span v-if="startPage > 1">...</span>
  
      <button
        v-for="page in pages"
        :key="page"
        @click="changePage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
  
      <span v-if="endPage < totalPages">...</span>
  
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
        Next
      </button>
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
  
  <style>
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
    background-color: blue;
    color: white;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>