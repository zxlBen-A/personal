<template>
  <!--  pc端-->
  <div v-if="!isShow" class="d-flex">
    <div class="flex-1 mr-16">
      <SpecialModular :total="total" />
    </div>
    <div class="theColumnSection">
      <SpecialDescr :details="columnGeneralDescription" />
    </div>
  </div>
  <!--  移动端-->
  <div v-else class="mobile-special">
    <SpecialModular />
  </div>
</template>

<script lang="ts" setup>
import SpecialModular from "@/components/SpecialModular/index.vue";
import SpecialDescr from "@/components/SpecialDescr/index.vue";
import isShow from "../utils/judgeTheClient";
import { getScrollHeight, getScrollTop, getWindowHeight } from "../utils/screen";
import { specialColumn, generalColumn } from "../api/index";
import { useCalculatedAltitude } from "../utils/useCalculatedAltitude";
import type { Ref } from "vue";

interface paginationParameters {
  pageSize: number;
  pageNum: number;
}

const total = ref<Array<object>>([]);
let isItPossibleToRequest = ref<boolean>(true);
const columnGeneralDescription = ref<object>({});
let adsorb: Ref<string | number> = ref("0");
const pagination = reactive<paginationParameters>({
  pageSize: 5,
  pageNum: 1
});

//进页面就开始监听
onMounted(() => {
  window.addEventListener("scroll", load);
});

const load = () => {
  //判断是否到页面的底部
  if (Math.ceil(getScrollTop() + getWindowHeight()) >= getScrollHeight()) {
    if (!isItPossibleToRequest.value) {
      return;
    }
    pagination.pageNum += 1;
    setTimeout(() => {
      allColumns();
    }, 1000);
  }
};

const allColumns = async () => {
  let { data } = await specialColumn(pagination);

  total.value.push(...data.data);
  isItPossibleToRequest.value = data.turnOver;
};
const columnDescription = async () => {
  let { data } = await generalColumn();
  columnGeneralDescription.value = data.data[0];
  adsorb.value = useCalculatedAltitude(0, 0, 578);
};

allColumns();
columnDescription();
</script>

<style lang="scss">
.mobile-special {
  margin: 20px;
}

.theColumnSection {
  position: sticky;
  top: v-bind('adsorb');
  height: 350px;
}
</style>
