<template>
  <div id="app" class="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center font-sans p-4">
    <div class="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
      <h1 class="text-center text-3xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Base Converter
      </h1>
      <p class="text-gray-300 text-center text-sm mb-6">Convert between different number bases instantly</p>
      <div v-if="showInfo" class="text-center mb-4 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm animate-fade-in">
        ✅ Successfully Copied to Clipboard!
      </div>
      <div class="space-y-6">
        <ConverterInput
          v-for="converter in converters"
          :key="converter.getName()"
          :converter="converter"
          @input="onInput"
          @copy="onCopy"
        />
      </div>
      <div class="mt-8 text-center text-gray-400 text-xs">
        Click on the base name to copy the value
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ConverterInput from "./components/ConverterInput.vue";
import BinaryConverter from "./converters/BinaryConverter";
import DecimalConverter from "./converters/DecimalConverter";
import HexadecimalConverter from "./converters/HexadecimalConverter";
import OctalConverter from "./converters/OctalConverter";

const converters = ref<any[]>([
  new BinaryConverter(),
  new DecimalConverter(),
  new HexadecimalConverter(),
  new OctalConverter(),
]);

const showInfo = ref(false);

const onInput = (value: string, converter: any) => {
  converter.setValue(value);
  // Update other converters
  for (const c of converters.value) {
    if (c !== converter) {
      c.setValue(converter.convertTo(c));
    }
  }
};

const onCopy = () => {
  showInfo.value = true;
  setTimeout(() => (showInfo.value = false), 3000);
};
</script>