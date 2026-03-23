<template>
  <div class="group">
    <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
      <div class="flex items-center space-x-2 min-w-0 shrink-0">
        <span class="text-2xl">{{ getIcon() }}</span>
        <label
          :for="converter.getName()"
          class="text-white font-medium cursor-pointer select-none hover:text-blue-300 transition-colors"
          @click="copyToClipboard"
        >
          {{ converter.getName() }}
        </label>
      </div>
      <input
        :id="converter.getName()"
        v-model="localValue"
        type="text"
        placeholder="0"
        class="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 border-none outline-none text-right font-mono text-lg focus:ring-2 focus:ring-blue-500/50 rounded-md transition-all"
        @keydown="handleKeydown"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { isImplHasInputValidation } from "../validators/input";

interface Props {
  converter: any;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  input: [value: string, converter: any];
  copy: [];
}>();

const localValue = ref(props.converter.getValue());

watch(
  () => props.converter.getValue(),
  (newValue) => {
    localValue.value = newValue;
  },
);

const handleKeydown = (e: KeyboardEvent) => {
  if (isImplHasInputValidation(props.converter)) {
    props.converter.validateInput(e);
  }
};

const handleInput = () => {
  emit("input", localValue.value || "", props.converter as any);
};

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(localValue.value || "0");
  emit("copy");
};

const getIcon = () => {
  const name = props.converter.getName().toLowerCase();
  switch (name) {
    case "binary":
      return "🔢";
    case "decimal":
      return "🔟";
    case "hexadecimal":
      return "🔠";
    case "octal":
      return "🟡";
    default:
      return "🔢";
  }
};
</script>